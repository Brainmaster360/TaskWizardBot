// commands/general/streaming.js
const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

/**
 * Executes the /streaming command.
 * @param {CommandInteraction} interaction 
 */
async function execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
        return await interaction.reply({ content: 'User not found in this guild.', ephemeral: true });
    }

    const presence = member.presence;

    if (!presence || !presence.activities || presence.activities.length === 0) {
        return await interaction.reply({ content: `${user.tag} is not streaming or does not have any activities set.`, ephemeral: true });
    }

    // Find a streaming activity
    const streamingActivity = presence.activities.find(activity => activity.type === 1); // 1 corresponds to STREAMING

    if (streamingActivity) {
        const streamingEmbed = createEmbed({
            title: `${user.tag} is Streaming`,
            description: `**Platform:** ${streamingActivity.details || 'N/A'}\n**Title:** ${streamingActivity.state || 'N/A'}`,
            color: '#ff0000',
            fields: [],
            footer: '',
            // Adding URL and thumbnail manually as createEmbed may not cover them
        })
            .setURL(streamingActivity.url)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

        await interaction.reply({ embeds: [streamingEmbed], ephemeral: true });
    } else {
        await interaction.reply({ content: `${user.tag} is not streaming.`, ephemeral: true });
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('streaming')
        .setDescription('Get streaming status of a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get streaming status for.')
                .setRequired(false)
        ),
    execute
};
