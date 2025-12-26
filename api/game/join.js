import { addPlayer } from "../../lib/gameState.js";

export default function handler(req, res) {
  const { user } = req.query;
  if (!user) return res.status(400).json({ error: "Usuário inválido" });
  addPlayer(user);
  res.json({ ok: true });
}
