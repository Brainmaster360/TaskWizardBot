// commands/admin/close.js
const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');
const { hasRequiredRole } = require('../../utils/permissions');
const { getOrCreateArchiveChannel } = require('../../utils/channelManager'); // You'll need to create channelManager.js

/**
 * Executes the /close command.
 * @param {CommandInteraction} interaction 
 * @param {Object} config 
 */
async function execute(interaction, config) {
    // Ensure this command is run inside a ticket channel
    // You might have a naming convention or specific category to verify
    const channelName = interaction.channel.name;
    const isTicketChannel = categories.some(category => channelName.startsWith(category.toLowerCase().replace(' ', '-')));
    
    if (!isTicketChannel) {
        return await interaction.reply({ content: 'This command can only be used within a ticket channel.', ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    try {
        const archiveChannel = await getOrCreateArchiveChannel(interaction.guild);
        const ticketMessages = await interaction.channel.messages.fetch({ limit: 100 });
        const ticketLogs = ticketMessages.reverse().map(msg => `${msg.author.tag}: ${msg.content}`).join('\n');

        const ticketBuffer = Buffer.from(ticketLogs, 'utf-8');
        const attachment = new AttachmentBuilder(ticketBuffer, { name: `ticket-log-${interaction.channel.id}.txt` });

        await archiveChannel.send({
            content: `**Closed Ticket:** ${interaction.channel.name}`,
            files: [attachment]
        });

        await interaction.editReply({ content: 'Ticket has been closed and archived successfully.' });

        await interaction.channel.delete();
    } catch (error) {
        console.error('Error closing ticket:', error);
        await interaction.editReply({ content: 'An error occurred while closing the ticket.', ephemeral: true });
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Close your support ticket.'),
    execute
};
