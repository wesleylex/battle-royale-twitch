import axios from "axios";

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    const authUrl =
      "https://id.twitch.tv/oauth2/authorize" +
      `?client_id=${process.env.TWITCH_CLIENT_ID}` +
      `&redirect_uri=${process.env.TWITCH_REDIRECT}` +
      "&response_type=code" +
      "&scope=chat:read chat:edit";

    return res.redirect(authUrl);
  }

  const tokenRes = await axios.post(
    "https://id.twitch.tv/oauth2/token",
    null,
    {
      params: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.TWITCH_REDIRECT
      }
    }
  );

  const { access_token } = tokenRes.data;

  res.setHeader(
    "Set-Cookie",
    `twitch_token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`
  );

  res.redirect("/");
}
