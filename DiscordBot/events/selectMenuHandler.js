// events/selectMenuHandler.js
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const { getOrCreateCategory } = require('../utils/channelManager');
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../config.json');

/**
 * Handles the 'ticket_select_menu' interaction.
 * @param {StringSelectMenuInteraction} interaction 
 * @param {Object} config 
 */
async function handleTicketSelectMenu(interaction, config) {
    await interaction.deferReply({ ephemeral: true });

    const selectedValue = interaction.values[0];
    const problemType = selectedValue.replace('_', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase());
    
    // Load or initialize ticket counters in config
    if (!config.ticketCounters) {
        config.ticketCounters = {};
    }
    if (!config.ticketCounters[problemType]) {
        config.ticketCounters[problemType] = 1; // Initialize if it doesn't exist
    }

    // Use the counter and increment for the next ticket
    const ticketNumber = config.ticketCounters[problemType]++;
    const categoryAbbreviation = problemType.split(' ').map(word => word[0]).join('').toUpperCase();
    const channelName = `ticket-${ticketNumber}-${categoryAbbreviation}-${interaction.user.username}`;

    // Get or create the appropriate category
    const category = await getOrCreateCategory(interaction.guild, problemType);
    if (!category) {
        return await interaction.editReply({ content: `Failed to find or create the category for ${problemType}. Please contact an administrator.`, ephemeral: true });
    }

    // Save updated counter to config
    fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

    // Create the ticket channel with the unique name
    const ticketChannel = await interaction.guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: category.id,
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
            },
            {
                id: config.ADMIN_ROLE_ID,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.SendMessages]
            },
            {
                id: config.MOD_ROLE_ID,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.SendMessages]
            }
        ],
        reason: `Ticket created by ${interaction.user.tag} for ${problemType}`
    });

    // Embed message for ticket creation confirmation
    const ticketEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`${problemType} Ticket`)
        .setDescription(`Hello ${interaction.user}, thank you for creating a ${problemType.toLowerCase()} ticket. Please provide all relevant information regarding your issue.`)
        .setTimestamp();

    // Action row with claiming and archiving buttons
    const actionRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('claim_ticket')
                .setLabel('Claim Ticket')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('archive_ticket')
                .setLabel('Archive Ticket')
                .setStyle(ButtonStyle.Danger)
        );

    // Send embed and buttons in the ticket channel
    await ticketChannel.send({ embeds: [ticketEmbed], components: [actionRow] });
    await interaction.editReply({ content: `Your ticket has been created: <#${ticketChannel.id}>`, ephemeral: true });
}

module.exports = { handleTicketSelectMenu };
