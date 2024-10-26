// commands/moderation/warn.js
const { SlashCommandBuilder } = require('discord.js');

/**
 * Executes the /warn command.
 * @param {CommandInteraction} interaction 
 */
async function execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    // Logic to log the warning (e.g., save to a database or file)
    // This example just sends a reply
    await interaction.reply({ content: `User ${user.tag} has been warned for: ${reason}`, ephemeral: true });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a user for a specified reason.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to warn')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the warning')
                .setRequired(true)),
    execute
};
