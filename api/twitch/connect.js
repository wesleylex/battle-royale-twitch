import { connectTwitch } from "../../lib/twitchClient.js";

export default async function handler(req, res) {
  const cookie = req.headers.cookie || "";
  const token = cookie
    .split("; ")
    .find(c => c.startsWith("twitch_token="))
    ?.split("=")[1];

  if (!token) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  await connectTwitch(token);
  res.json({ ok: true });
}
