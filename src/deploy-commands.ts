import * as dotenv from 'dotenv';
import path from 'path';
import { REST, Routes } from 'discord.js';
import { Command, commands } from './commands/utility';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const the_commands = [];

for (let i = 0; i < commands.length; i++) {
  if ('data' in commands[i] && 'execute' in commands[i]) {
    the_commands.push(commands[i].data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at index ${i} is missing a required "data" or "execute" property.`
    );
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log(`Start refreshing ${the_commands.length} application (/) commands`);

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
      { body: the_commands }
    );
    //@ts-expect-error => unknown error
    console.log(`Successfully reloaded ${data.length} application (/) commands`);
  } catch (error) {
    console.error(error);
  }
})();
