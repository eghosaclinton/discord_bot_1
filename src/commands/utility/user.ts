import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';

interface UserCommand {
  data: SlashCommandBuilder;
  execute: (Interaction: ChatInputCommandInteraction) => Promise<void>;
}

const userCommand: UserCommand = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
  async execute(interaction) {
    const member = interaction.member as GuildMember;
    const joinDate = member.joinedAt?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${joinDate}.`
    );
  },
};

export default userCommand;
