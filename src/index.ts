import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { Command, commands } from './commands/utility';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}

const app = express();

app.post('/webhook', (_req, res) => {
  res.send('hello, world');
});

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

let client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (let i = 0; i < commands.length; i++) {
  if ('data' in commands[i] && 'execute' in commands[i]) {
    client.commands.set(commands[i].data.name, commands[i]);
  } else {
    console.log(
      `[WARNING] The command at index ${i} is missing a required "data" or "execute" property.`
    );
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
