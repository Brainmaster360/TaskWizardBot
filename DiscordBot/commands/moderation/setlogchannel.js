// commands/moderation/setlogchannel.js
const { SlashCommandBuilder } = require('discord.js');

/**
 * Executes the /setlogchannel command.
 * @param {CommandInteraction} interaction 
 */
async function execute(interaction) {
    const channel = interaction.options.getChannel('channel');

    // Logic to save the channel ID to your config or database
    await interaction.reply({ content: `Logging channel set to ${channel.name}`, ephemeral: true });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlogchannel')
        .setDescription('Sets the channel for logging moderation actions.')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to use for logging')
                .setRequired(true)),
    execute
};
