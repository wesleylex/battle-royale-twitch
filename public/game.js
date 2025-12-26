setInterval(async () => {
  await fetch('/api/game/tick');
  const res = await fetch('/api/game/state');
  const data = await res.json();
  document.getElementById('game').innerHTML =
    Object.keys(data.players).map(p => `<div>${p}</div>`).join('');
}, 3000);
