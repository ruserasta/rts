import math
import os
from collections import defaultdict
from datetime import datetime

import requests
from flask import Flask, flash, jsonify, redirect, render_template, request, url_for
from flask_login import LoginManager, UserMixin, current_user, login_required, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///football_predictor.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    predictions = db.relationship("Prediction", backref="user", lazy=True)


class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    league_code = db.Column(db.String(10), nullable=False)
    home_team = db.Column(db.String(100), nullable=False)
    away_team = db.Column(db.String(100), nullable=False)
    home_win_prob = db.Column(db.Float, nullable=False)
    draw_prob = db.Column(db.Float, nullable=False)
    away_win_prob = db.Column(db.Float, nullable=False)
    expected_home_goals = db.Column(db.Float, nullable=False)
    expected_away_goals = db.Column(db.Float, nullable=False)
    top_scores_json = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class FootballDataClient:
    BASE_URL = "https://api.football-data.org/v4"

    def __init__(self, api_key):
        self.api_key = api_key

    def _request(self, endpoint, params=None):
        if not self.api_key:
            raise ValueError("Missing FOOTBALL_DATA_API_KEY environment variable.")
        headers = {"X-Auth-Token": self.api_key}
        response = requests.get(f"{self.BASE_URL}{endpoint}", headers=headers, params=params, timeout=20)
        response.raise_for_status()
        return response.json()

    def get_competitions(self):
        data = self._request("/competitions")
        allowed = {"PL", "BL1", "SA", "PD", "FL1", "DED", "PPL", "ELC", "BSA", "CL", "ELC"}
        comps = [
            {
                "code": c["code"],
                "name": c["name"],
                "country": c["area"]["name"],
            }
            for c in data.get("competitions", [])
            if c.get("code") in allowed
        ]
        comps.sort(key=lambda c: c["name"])
        return comps

    def get_teams_by_league(self, league_code):
        data = self._request(f"/competitions/{league_code}/standings")
        teams = []
        for table in data.get("standings", []):
            for row in table.get("table", []):
                t = row.get("team", {})
                if t.get("name"):
                    teams.append({"id": t["id"], "name": t["name"]})
        uniq = {t["id"]: t for t in teams}
        return sorted(uniq.values(), key=lambda t: t["name"])

    def get_team_matches(self, team_id, limit=10):
        data = self._request(f"/teams/{team_id}/matches", params={"status": "FINISHED", "limit": limit})
        return data.get("matches", [])

    def get_head_to_head(self, home_id, away_id, limit=8):
        data = self._request(
            f"/teams/{home_id}/matches",
            params={"status": "FINISHED", "opponents": away_id, "limit": limit},
        )
        return data.get("matches", [])


def poisson_prob(lmbda, goals):
    return (math.exp(-lmbda) * (lmbda ** goals)) / math.factorial(goals)


def weighted_average(values):
    if not values:
        return 0
    weights = list(range(1, len(values) + 1))
    return sum(v * w for v, w in zip(values, weights)) / sum(weights)


def build_team_stats(matches, team_id):
    goals_for = []
    goals_against = []
    home_scored = []
    home_conceded = []
    away_scored = []
    away_conceded = []
    points = []

    for m in matches:
        ft = m.get("score", {}).get("fullTime", {})
        home_id = m.get("homeTeam", {}).get("id")
        away_id = m.get("awayTeam", {}).get("id")
        home_goals = ft.get("home")
        away_goals = ft.get("away")
        if home_goals is None or away_goals is None:
            continue

        is_home = home_id == team_id
        scored = home_goals if is_home else away_goals
        conceded = away_goals if is_home else home_goals

        goals_for.append(scored)
        goals_against.append(conceded)

        if is_home:
            home_scored.append(scored)
            home_conceded.append(conceded)
        else:
            away_scored.append(scored)
            away_conceded.append(conceded)

        if scored > conceded:
            points.append(3)
        elif scored == conceded:
            points.append(1)
        else:
            points.append(0)

    return {
        "avg_scored": weighted_average(goals_for),
        "avg_conceded": weighted_average(goals_against),
        "home_scored": weighted_average(home_scored) if home_scored else weighted_average(goals_for),
        "home_conceded": weighted_average(home_conceded) if home_conceded else weighted_average(goals_against),
        "away_scored": weighted_average(away_scored) if away_scored else weighted_average(goals_for),
        "away_conceded": weighted_average(away_conceded) if away_conceded else weighted_average(goals_against),
        "form_points": weighted_average(points),
        "matches": len(goals_for),
    }


def expected_goals(home_stats, away_stats, h2h_matches):
    league_avg_goals = 1.35
    home_attack = home_stats["home_scored"] / league_avg_goals if league_avg_goals else 1
    away_attack = away_stats["away_scored"] / league_avg_goals if league_avg_goals else 1
    home_def = home_stats["home_conceded"] / league_avg_goals if league_avg_goals else 1
    away_def = away_stats["away_conceded"] / league_avg_goals if league_avg_goals else 1

    home_form_boost = 1 + ((home_stats["form_points"] - 1.2) * 0.08)
    away_form_boost = 1 + ((away_stats["form_points"] - 1.2) * 0.08)

    h2h_home_boost = 1.0
    h2h_away_boost = 1.0
    if h2h_matches:
        tally = defaultdict(int)
        for m in h2h_matches:
            ft = m.get("score", {}).get("fullTime", {})
            hg, ag = ft.get("home"), ft.get("away")
            if hg is None or ag is None:
                continue
            if hg > ag:
                tally[m.get("homeTeam", {}).get("id")] += 1
            elif ag > hg:
                tally[m.get("awayTeam", {}).get("id")] += 1
        if tally:
            h2h_home_boost += 0.03 * (max(tally.values()) / max(1, len(h2h_matches)))

    home_advantage = 1.1
    exp_home = max(0.2, league_avg_goals * home_attack * away_def * home_advantage * home_form_boost * h2h_home_boost)
    exp_away = max(0.2, league_avg_goals * away_attack * home_def * away_form_boost * h2h_away_boost)
    return exp_home, exp_away


def score_matrix(exp_home, exp_away, max_goals=6):
    matrix = []
    for h in range(max_goals + 1):
        for a in range(max_goals + 1):
            p = poisson_prob(exp_home, h) * poisson_prob(exp_away, a)
            matrix.append({"home": h, "away": a, "probability": p})
    return matrix


def aggregate_outcomes(matrix):
    home_win = sum(s["probability"] for s in matrix if s["home"] > s["away"])
    draw = sum(s["probability"] for s in matrix if s["home"] == s["away"])
    away_win = sum(s["probability"] for s in matrix if s["home"] < s["away"])
    total = home_win + draw + away_win
    return {
        "home_win": home_win / total,
        "draw": draw / total,
        "away_win": away_win / total,
    }


@app.route("/")
def index():
    return redirect(url_for("dashboard")) if current_user.is_authenticated else redirect(url_for("login"))


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        if not email or not password:
            flash("Email and password are required.", "error")
        elif User.query.filter_by(email=email).first():
            flash("Email already registered.", "error")
        else:
            user = User(email=email, password_hash=generate_password_hash(password))
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return redirect(url_for("dashboard"))
    return render_template("auth.html", mode="register")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            flash("Invalid credentials.", "error")
        else:
            login_user(user)
            return redirect(url_for("dashboard"))
    return render_template("auth.html", mode="login")


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))


@app.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html", user=current_user)


@app.route("/api/leagues")
@login_required
def leagues():
    client = FootballDataClient(os.getenv("FOOTBALL_DATA_API_KEY"))
    try:
        return jsonify(client.get_competitions())
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400


@app.route("/api/teams/<league_code>")
@login_required
def teams(league_code):
    client = FootballDataClient(os.getenv("FOOTBALL_DATA_API_KEY"))
    try:
        return jsonify(client.get_teams_by_league(league_code))
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400


@app.route("/api/predict", methods=["POST"])
@login_required
def predict():
    payload = request.json
    league = payload.get("league")
    home = payload.get("home")
    away = payload.get("away")
    client = FootballDataClient(os.getenv("FOOTBALL_DATA_API_KEY"))

    home_matches = client.get_team_matches(home["id"], limit=10)
    away_matches = client.get_team_matches(away["id"], limit=10)
    h2h = client.get_head_to_head(home["id"], away["id"], limit=8)

    home_stats = build_team_stats(home_matches, home["id"])
    away_stats = build_team_stats(away_matches, away["id"])
    exp_home, exp_away = expected_goals(home_stats, away_stats, h2h)

    matrix = score_matrix(exp_home, exp_away, max_goals=6)
    outcomes = aggregate_outcomes(matrix)
    top_scores = sorted(matrix, key=lambda x: x["probability"], reverse=True)[:12]

    prediction = Prediction(
        user_id=current_user.id,
        league_code=league,
        home_team=home["name"],
        away_team=away["name"],
        home_win_prob=outcomes["home_win"],
        draw_prob=outcomes["draw"],
        away_win_prob=outcomes["away_win"],
        expected_home_goals=exp_home,
        expected_away_goals=exp_away,
        top_scores_json=str(top_scores),
    )
    db.session.add(prediction)
    db.session.commit()

    return jsonify(
        {
            "expectedGoals": {"home": exp_home, "away": exp_away},
            "outcomes": outcomes,
            "topScores": top_scores,
            "goalDistribution": matrix,
            "stats": {"home": home_stats, "away": away_stats, "h2hMatches": len(h2h)},
        }
    )


@app.route("/api/history")
@login_required
def history():
    rows = Prediction.query.filter_by(user_id=current_user.id).order_by(Prediction.created_at.desc()).limit(50).all()
    return jsonify(
        [
            {
                "id": r.id,
                "league": r.league_code,
                "homeTeam": r.home_team,
                "awayTeam": r.away_team,
                "homeWin": r.home_win_prob,
                "draw": r.draw_prob,
                "awayWin": r.away_win_prob,
                "expectedGoals": {"home": r.expected_home_goals, "away": r.expected_away_goals},
                "topScores": r.top_scores_json,
                "createdAt": r.created_at.isoformat(),
            }
            for r in rows
        ]
    )


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)
