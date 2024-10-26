// commands/utility/remind.js
const { SlashCommandBuilder } = require('discord.js');

/**
 * Executes the /remind command.
 * @param {CommandInteraction} interaction 
 */
async function execute(interaction) {
    const time = interaction.options.getString('time');
    const message = interaction.options.getString('message');

    // Logic to set a reminder (e.g., use setTimeout, or a scheduling library)
    await interaction.reply({ content: `Reminder set for ${time}: ${message}`, ephemeral: true });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription('Sets a reminder with a specified time.')
        .addStringOption(option => 
            option.setName('time')
                .setDescription('Time for the reminder (e.g., 10m for 10 minutes)')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('message')
                .setDescription('Reminder message')
                .setRequired(true)),
    execute
};
