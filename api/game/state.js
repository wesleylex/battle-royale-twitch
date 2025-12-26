import { getGameState } from "../../lib/gameState.js";

export default function handler(req, res) {
  res.json(getGameState());
}
