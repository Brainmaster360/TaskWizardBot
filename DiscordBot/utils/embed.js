// utils/embed.js
const { EmbedBuilder } = require('discord.js');

/**
 * Creates a standardized embed.
 * @param {Object} options - Embed options.
 * @param {string} options.title - Title of the embed.
 * @param {string} options.description - Description of the embed.
 * @param {string} options.color - Hex color code.
 * @param {Array} options.fields - Array of field objects.
 * @param {string} options.footer - Footer text.
 * @returns {EmbedBuilder} - Configured embed.
 */
function createEmbed({ title, description, color = '#0099ff', fields = [], footer = '' }) {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp();

    if (fields.length > 0) {
        embed.addFields(fields);
    }

    if (footer) {
        embed.setFooter({ text: footer });
    }

    return embed;
}

module.exports = { createEmbed };
