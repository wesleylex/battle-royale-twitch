import axios from "axios";

export default async function handler(req, res) {
  const { code } = req.query;
  const redirectBase =
    process.env.TWITCH_REDIRECT ||
    `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}/api/auth/twitch`;

  if (!code) {
    // É fundamental usar encodeURIComponent na redirect_uri para evitar erros de URL
    const redirectUri = encodeURIComponent(redirectBase);
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=chat:read%20chat:edit`;

    return res.redirect(authUrl);
  }

  try {
    // 2. Troca do código pelo Token (usando URLSearchParams para evitar erros de formato)
    const params = new URLSearchParams();
    params.append('client_id', process.env.TWITCH_CLIENT_ID);
    params.append('client_secret', process.env.TWITCH_CLIENT_SECRET);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirectBase);

    const tokenRes = await axios.post("https://id.twitch.tv/oauth2/token", params);

    const { access_token } = tokenRes.data;

    // 3. Salva o cookie e redireciona para a home
    res.setHeader(
      "Set-Cookie",
      `twitch_token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`
    );

    return res.redirect("/");
  } catch (error) {
    console.error("Erro na autenticação:", error.response?.data || error.message);
    return res.status(500).json({ error: "Falha ao obter token da Twitch" });
  }
}
