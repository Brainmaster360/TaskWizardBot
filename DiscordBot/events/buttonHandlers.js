const { EmbedBuilder, AttachmentBuilder, ChannelType } = require('discord.js');

/**
 * Handles the 'claim_ticket' button interaction.
 * @param {ButtonInteraction} interaction 
 * @param {Object} config 
 */
async function handleClaimTicket(interaction, config) {
    const requiredRoleIds = [config.ADMIN_ROLE_ID, config.MOD_ROLE_ID];

    // Check if the user has permission
    if (!interaction.member.roles.cache.some(role => requiredRoleIds.includes(role.id))) {
        return await interaction.reply({ content: 'You do not have permission to claim tickets.', ephemeral: true });
    }

    // Confirmation embed for claiming
    const claimEmbed = new EmbedBuilder()
        .setColor('#00ff00')
        .setDescription(`${interaction.user} has claimed this ticket!`)
        .setTimestamp();

    await interaction.channel.send({ embeds: [claimEmbed] });
    await interaction.reply({ content: 'Ticket has been claimed.', ephemeral: true });
}

/**
 * Archives a ticket by saving messages to a text file and sending it to the archive channel.
 * @param {ButtonInteraction} interaction 
 * @param {Object} config 
 */
async function handleArchiveTicket(interaction, config) {
    const requiredRoleIds = [config.ADMIN_ROLE_ID, config.MOD_ROLE_ID];

    // Check if the user has permission
    if (!interaction.member.roles.cache.some(role => requiredRoleIds.includes(role.id))) {
        return await interaction.reply({ content: 'You do not have permission to archive tickets.', ephemeral: true });
    }

    try {
        // Retrieve ticket channel messages and compile into a text log
        const ticketChannel = interaction.channel;
        const messages = await ticketChannel.messages.fetch({ limit: 100 });
        const archiveContent = messages.reverse().map(msg => `${msg.author.tag}: ${msg.content}`).join('\n');

        // Create attachment for archived messages
        const attachment = new AttachmentBuilder(Buffer.from(archiveContent, 'utf-8'), { name: `ticket-${ticketChannel.name}.txt` });

        // Find archive channel
        const archiveChannel = interaction.guild.channels.cache.find(channel => channel.name === 'ticket-archives' && channel.type === ChannelType.GuildText);

        if (!archiveChannel) {
            return interaction.reply({ content: 'Archive channel not found. Please contact an administrator.', ephemeral: true });
        }

        // Send log to archive channel and delete ticket channel
        await archiveChannel.send({ content: `Archived ticket from ${ticketChannel.name}:`, files: [attachment] });
        await interaction.reply({ content: 'Ticket has been archived successfully.', ephemeral: true });
        await ticketChannel.delete();
    } catch (error) {
        console.error('Error archiving ticket:', error);
        await interaction.reply({ content: 'There was an error archiving the ticket. Please try again or contact support.', ephemeral: true });
    }
}

module.exports = { handleClaimTicket, handleArchiveTicket };
