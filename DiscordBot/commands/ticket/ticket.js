// commands/ticket/ticket.js
const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

/**
 * Executes the /ticket command.
 * @param {CommandInteraction} interaction 
 */
async function execute(interaction) {
    const ticketOverviewChannelName = 'ticket-overview';
    const ticketOverviewChannel = interaction.guild.channels.cache.find(
        channel => channel.name === ticketOverviewChannelName && channel.type === 0 // GuildText
    );

    if (!ticketOverviewChannel) {
        return await interaction.reply({ content: `Ticket overview channel (${ticketOverviewChannelName}) does not exist. Please contact an administrator.`, ephemeral: true });
    }

    await interaction.reply({ content: `Please go to <#${ticketOverviewChannel.id}> to create a support ticket.`, ephemeral: true });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Create a support ticket.'),
    execute
};

