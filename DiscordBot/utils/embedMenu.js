// utils/embedMenu.js
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

/**
 * Creates a detailed embed with a select menu.
 * @param {Object} options - Options to customize the embed and select menu.
 * @param {string} options.title - Title of the embed.
 * @param {string} options.description - Description text of the embed.
 * @param {Array} options.fields - Array of field objects { name, value, inline }.
 * @param {Array} options.menuOptions - Array of menu option objects { label, description, value, emoji }.
 * @param {string} options.selectMenuCustomId - Custom ID for the select menu.
 * @param {string} options.footer - Footer text for the embed.
 * @param {string} options.color - Hex color code for the embed.
 * @returns {Object} - An object containing the embed and the action row with the select menu.
 */
function createDetailedEmbedWithMenu({
    title,
    description,
    fields = [],
    menuOptions = [],
    selectMenuCustomId = 'default_select_menu',
    footer = '',
    color = '#0099ff'
}) {
    // Create the embed
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp();

    // Add fields if any
    if (fields.length > 0) {
        embed.addFields(fields);
    }

    // Add footer if provided
    if (footer) {
        embed.setFooter({ text: footer });
    }

    // Create the select menu options
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(selectMenuCustomId)
        .setPlaceholder('Select an option');

    menuOptions.forEach(option => {
        selectMenu.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(option.label)
                .setDescription(option.description)
                .setValue(option.value)
                .setEmoji(option.emoji || null)
        );
    });

    // Create the action row with the select menu
    const actionRow = new ActionRowBuilder().addComponents(selectMenu);

    return { embed, actionRow };
}

module.exports = { createDetailedEmbedWithMenu };
