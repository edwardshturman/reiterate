const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Easily indicate to everyone in vc that you\'re out for a bit'),

    async execute (interaction) {
        // Dependencies
        const { Discord, Permissions } = require('discord.js');

        // Ignore if no Manage Nicknames perms or if server owner AFKs
        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES) || interaction.member.id === interaction.guild.ownerId) {
            await interaction.reply({content: 'Sorry, I don\'t have permissions to change your nickname! Please report this to a server mod.', ephemeral: true});
            return;
        }

        // Execute /afk
        try {
            await interaction.member.setNickname('[AFK] ' + interaction.member.displayName);
            await interaction.deferReply();
            await interaction.deleteReply();
        } catch (error) {
            await interaction.reply({content: 'Sorry, I don\'t have permissions to change your nickname! Please report this to a server mod.', ephemeral: true});
        }
    }
};
