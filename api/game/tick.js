import { gameTick, startGame } from "../../lib/gameState.js";

export default function handler(req, res) {
  startGame();
  gameTick();
  res.json({ ok: true });
}
