import pingCommand from './ping';
import userCommand from './user';
import serverCommand from './server';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute: (Interaction: ChatInputCommandInteraction) => Promise<void>;
}

export const commands: Command[] = [pingCommand, userCommand, serverCommand];
