let game = { started: false, players: {} };

export function addPlayer(username) {
  if (game.started) return;
  if (!game.players[username]) {
    game.players[username] = { hp: 100, alive: true };
  }
}

export function getGameState() {
  return game;
}

export function startGame() {
  game.started = true;
}

export function gameTick() {
  const alive = Object.keys(game.players).filter(p => game.players[p].alive);
  if (alive.length <= 1) return;
}