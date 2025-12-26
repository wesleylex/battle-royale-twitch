import axios from "axios";

export async function getTwitchUser(token) {
  const res = await axios.get("https://api.twitch.tv/helix/users", {
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      "Authorization": `Bearer ${token}`
    }
  });
  return res.data.data[0];
}