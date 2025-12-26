async function init() {
  // conecta o bot
  await fetch('/api/twitch/connect');

  // atualiza a lista de jogadores a cada 3 segundos
  setInterval(async () => {
    const res = await fetch('/api/game/state');
    const data = await res.json();
    document.getElementById('game').innerHTML =
      Object.keys(data.players).map(p => `<div>${p}</div>`).join('');
  }, 3000);
}

init();
