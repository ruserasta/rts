let outcomeChart;
let xgChart;
let leagues = [];
let teams = [];

const leagueSelect = document.getElementById('leagueSelect');
const homeTeamSelect = document.getElementById('homeTeam');
const awayTeamSelect = document.getElementById('awayTeam');
const statusEl = document.getElementById('status');

async function loadLeagues() {
  const res = await fetch('/api/leagues');
  const data = await res.json();
  if (!res.ok) {
    statusEl.textContent = data.error;
    return;
  }
  leagues = data;
  leagueSelect.innerHTML = leagues.map(l => `<option value="${l.code}">${l.name} (${l.country})</option>`).join('');
  if (leagues.length) {
    await loadTeams(leagues[0].code);
  }
}

async function loadTeams(leagueCode) {
  statusEl.textContent = 'Loading teams...';
  const res = await fetch(`/api/teams/${leagueCode}`);
  const data = await res.json();
  if (!res.ok) {
    statusEl.textContent = data.error;
    return;
  }
  teams = data;
  const options = teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  homeTeamSelect.innerHTML = options;
  awayTeamSelect.innerHTML = options;
  if (teams.length > 1) awayTeamSelect.selectedIndex = 1;
  statusEl.textContent = `${teams.length} teams loaded from ${leagueCode}.`;
}

function renderCharts(payload) {
  const outcomes = payload.outcomes;
  const xg = payload.expectedGoals;

  if (outcomeChart) outcomeChart.destroy();
  outcomeChart = new Chart(document.getElementById('outcomeChart'), {
    type: 'bar',
    data: {
      labels: ['Home Win', 'Draw', 'Away Win'],
      datasets: [{
        label: 'Probability %',
        data: [outcomes.home_win * 100, outcomes.draw * 100, outcomes.away_win * 100],
        backgroundColor: ['#2563eb', '#6b7280', '#dc2626']
      }]
    }
  });

  if (xgChart) xgChart.destroy();
  xgChart = new Chart(document.getElementById('xgChart'), {
    type: 'bar',
    data: {
      labels: ['Home xG', 'Away xG'],
      datasets: [{
        data: [xg.home, xg.away],
        backgroundColor: ['#3b82f6', '#f97316']
      }]
    }
  });

  const table = document.getElementById('scoreTable');
  table.innerHTML = payload.topScores.map(s => `<tr><td>${s.home}-${s.away}</td><td>${(s.probability * 100).toFixed(2)}%</td></tr>`).join('');
}

async function analyze() {
  const league = leagueSelect.value;
  const homeId = Number(homeTeamSelect.value);
  const awayId = Number(awayTeamSelect.value);
  if (homeId === awayId) {
    statusEl.textContent = 'Please select two different teams.';
    return;
  }
  const home = teams.find(t => t.id === homeId);
  const away = teams.find(t => t.id === awayId);

  statusEl.textContent = 'Running statistical model...';
  const res = await fetch('/api/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ league, home, away })
  });
  const data = await res.json();
  if (!res.ok) {
    statusEl.textContent = data.error || 'Prediction failed.';
    return;
  }

  renderCharts(data);
  await loadHistory();
  statusEl.textContent = 'Prediction completed and saved.';
}

async function loadHistory() {
  const res = await fetch('/api/history');
  const data = await res.json();
  const table = document.getElementById('historyTable');
  table.innerHTML = data.map(r => `
    <tr>
      <td>${new Date(r.createdAt).toLocaleString()}</td>
      <td>${r.homeTeam} vs ${r.awayTeam}</td>
      <td>${(r.homeWin*100).toFixed(1)} / ${(r.draw*100).toFixed(1)} / ${(r.awayWin*100).toFixed(1)}</td>
      <td>${r.expectedGoals.home.toFixed(2)} - ${r.expectedGoals.away.toFixed(2)}</td>
    </tr>
  `).join('');
}

leagueSelect?.addEventListener('change', async (e) => {
  await loadTeams(e.target.value);
});

document.getElementById('analyzeBtn')?.addEventListener('click', analyze);

loadLeagues().then(loadHistory);
