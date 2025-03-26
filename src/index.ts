import * as dotenv from 'dotenv';
import path from 'path';
import { Client, Events, GatewayIntentBits } from 'discord.js';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
