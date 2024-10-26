// events/interactionCreate.js
const { Events } = require('discord.js');
const { handleTicketSelectMenu } = require('./selectMenuHandler');
const { handleClaimTicket, handleArchiveTicket } = require('./buttonHandlers');

/**
 * Handles interactions based on their type (command, button, or select menu).
 * @param {Interaction} interaction - The interaction that was created.
 * @param {Object} config - Configuration data (e.g., role IDs).
 * @param {Collection} commands - The bot's command collection.
 */
async function execute(interaction, config, commands) {
    try {
        // Handle Slash Commands
        if (interaction.isChatInputCommand()) {
            const command = commands.get(interaction.commandName);
            if (!command) return;

            await command.execute(interaction, config);
        } 
        
        // Handle Button Interactions
        else if (interaction.isButton()) {
            const { customId } = interaction;

            switch (customId) {
                case 'claim_ticket':
                    await handleClaimTicket(interaction, config);
                    break;
                case 'archive_ticket':
                    await handleArchiveTicket(interaction, config);
                    break;
                default:
                    console.warn(`Unhandled button interaction: ${customId}`);
            }
        } 
        
        // Handle Select Menu Interactions
        else if (interaction.isStringSelectMenu()) {
            const { customId } = interaction;
            if (customId === 'ticket_select_menu') {
                await handleTicketSelectMenu(interaction, config);
            } else {
                console.warn(`Unhandled select menu interaction: ${customId}`);
            }
        }
    } catch (error) {
        console.error('Error handling interaction:', error);

        // Respond with an error message if the interaction hasn't been responded to
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: 'An unexpected error occurred. Please try again later.', ephemeral: true });
        }
    }
}

module.exports = {
    name: Events.InteractionCreate,
    execute
};
