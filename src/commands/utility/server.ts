import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

interface ServerCommand {
  data: SlashCommandBuilder;
  execute: (Interaction: ChatInputCommandInteraction) => Promise<void>;
}

const serverCommand: ServerCommand = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute(interaction) {
    await interaction.reply(
      `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
    );
  },
};

export default serverCommand;
