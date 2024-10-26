// interactionCreate.js
const { Events } = require('discord.js');
const claimTicket = require('../utils/claimTicket'); // Updated path to claimTicket
const config = require('../config.json'); // Load configuration

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Only proceed if it's a button interaction
        if (!interaction.isButton()) return;

        // Check if the button pressed is 'claim_ticket'
        if (interaction.customId === 'claim_ticket') {
            try {
                await claimTicket.execute(interaction, config); // Execute claimTicket handler
            } catch (error) {
                console.error('Error executing claim_ticket:', error);
                await interaction.reply({
                    content: 'There was an error claiming the ticket. Please try again later.',
                    ephemeral: true
                });
            }
        }
        // Handle other interactions if needed
    },
};
