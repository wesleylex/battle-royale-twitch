import tmi from "tmi.js";
import { addPlayer } from "./gameState.js";
import { getTwitchUser } from "./getUser.js";

let client;

export async function connectTwitch(token) {
  if (client) return;

  const user = await getTwitchUser(token);

  client = new tmi.Client({
    identity: {
      username: user.login,
      password: `oauth:${token}`
    },
    channels: [user.login]
  });

  await client.connect();

  client.on("message", (channel, tags, message, self) => {
    if (self) return;

    if (message.toLowerCase() === "!play") {
      addPlayer(tags.username);
    }
  });
}
