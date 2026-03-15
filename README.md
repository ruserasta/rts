# Football Match Probability Analysis Application

A dark-theme football analytics web app that:

- Pulls live football data from Football-Data.org
- Includes all teams from the selected league
- Runs Poisson-based probabilistic forecasting
- Estimates expected goals with attack/defense, form, and home advantage
- Produces 1X2 probabilities and ranked exact score outcomes
- Supports user accounts and prediction history

## Features

- **Data Integration**
  - Recent form (last 10 matches)
  - Goals scored/conceded
  - Home vs away splits
  - Head-to-head data
  - League standings via league team retrieval
- **Prediction Model**
  - Poisson goal distribution
  - xG approximation from weighted features
  - Attack vs defense strength interactions
  - Home advantage and weighted recent form
- **Output**
  - Home win / draw / away win probabilities
  - Ranked exact score probabilities
  - Interactive charts for outcomes and xG
- **Authentication & History**
  - Email/password register and login
  - Saved predictions per user
  - Personal analysis history table

## Supported leagues

The app targets major European competitions available through Football-Data.org codes used in the app (`PL`, `BL1`, `SA`, `PD`, `FL1`, `DED`, `PPL`, `ELC`, `BSA`, `CL`).

## Setup

1. Install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Configure environment:

```bash
cp .env.example .env
# Edit .env and set FOOTBALL_DATA_API_KEY
```

3. Run:

```bash
python app.py
```

Open: `http://localhost:5000`

## Notes

- Football-Data.org plan limits may affect requests/rate limits.
- Database is SQLite (`instance/football_predictor.db`).
