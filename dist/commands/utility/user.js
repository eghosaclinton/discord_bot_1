"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const userCommand = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        const member = interaction.member;
        const joinDate = member.joinedAt?.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${joinDate}.`);
    },
};
exports.default = userCommand;
