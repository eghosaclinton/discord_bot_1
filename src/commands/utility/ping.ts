import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

interface PingCommand {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

const pingCommand: PingCommand = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};

export default pingCommand;
