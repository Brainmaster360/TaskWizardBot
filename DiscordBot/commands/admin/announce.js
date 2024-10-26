// commands/admin/announce.js
const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

/**
 * Executes the /announce command.
 * @param {CommandInteraction} interaction 
 */
async function execute(interaction) {
    // Extract command options
    const targetChannel = interaction.options.getChannel('channel');
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const colorInput = interaction.options.getString('color') || '#0099ff'; // Default color

    // Validate color input
    const colorRegex = /^#?[0-9A-Fa-f]{6}$/;
    const color = colorRegex.test(colorInput) ? (colorInput.startsWith('#') ? colorInput : `#${colorInput}`) : '#0099ff';

    // Create the embed
    const announcementEmbed = createEmbed({
        title,
        description,
        color,
        fields: [],
        footer: '',
    });

    // Send the embed to the target channel
    try {
        await targetChannel.send({ embeds: [announcementEmbed] });
        await interaction.reply({ content: `Announcement sent to ${targetChannel}.`, ephemeral: true });
    } catch (error) {
        console.error('Error sending announcement embed:', error);
        await interaction.reply({ content: 'Failed to send the announcement. Please check my permissions and try again.', ephemeral: true });
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Send a custom announcement embed.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the announcement in.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The title of the announcement.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The description of the announcement.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Hex color code for the embed (e.g., #FF0000).')
                .setRequired(false)
        ),
    execute
};
