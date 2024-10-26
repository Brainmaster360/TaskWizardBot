// commands/general/help.js
const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

/**
 * Executes the /help command.
 * @param {CommandInteraction} interaction 
 * @param {Object} config 
 */
async function execute(interaction, config) {
    // Define all commands with their descriptions and required roles
    const allCommands = [
        {
            name: '/help',
            description: 'Displays the help menu.',
            requiredRoles: [] // Accessible to all
        },
        {
            name: '/ticket',
            description: 'Create a support ticket.',
            requiredRoles: [] // Accessible to all
        },
        {
            name: '/ping',
            description: 'Check the bot\'s latency.',
            requiredRoles: [] // Accessible to all
        },
        {
            name: '/streaming',
            description: 'Get streaming status of a user.',
            requiredRoles: [] // Accessible to all
        },
        {
            name: '/close',
            description: 'Close your support ticket.',
            requiredRoles: [config.ADMIN_ROLE_ID, config.MOD_ROLE_ID] // Restricted
        },
        {
            name: '/announce',
            description: 'Send a custom announcement embed.',
            requiredRoles: [config.ADMIN_ROLE_ID, config.MOD_ROLE_ID] // Restricted
        },
        {
            name: '/setup',
            description: 'Initialize the ticketing system.',
            requiredRoles: [config.ADMIN_ROLE_ID] // Only Admins can run
        },
        {
            name: '/roll',
            description: 'Roll a die with a specified number of sides (e.g., /roll 6).',
            requiredRoles: [] // Accessible to all
        },
        {
            name: '/weather',
            description: 'Fetch the current weather for a specified location (ZIP code or address).',
            requiredRoles: [] // Accessible to all
        },
        {
            name: '/setlogchannel',
            description: 'Set the log channel for bot messages.',
            requiredRoles: [config.ADMIN_ROLE_ID, config.MOD_ROLE_ID] // Restricted
        },
        {
            name: '/warn',
            description: 'Warn a user for inappropriate behavior.',
            requiredRoles: [config.ADMIN_ROLE_ID, config.MOD_ROLE_ID] // Restricted
        },
        {
            name: '/remind',
            description: 'Set a reminder for yourself or someone else.',
            requiredRoles: [] // Accessible to all
        },
        {
            name: '/notifystreamer',
            description: 'Add a streamer to get notifications when they go live.',
            requiredRoles: [config.ADMIN_ROLE_ID] // Restricted to Admins
        },
        {
            name: '/removestreamer',
            description: 'Remove a streamer from the notification list.',
            requiredRoles: [config.ADMIN_ROLE_ID] // Restricted to Admins
        },
        {
            name: '/liststreamers',
            description: 'List all streamers you are tracking for live notifications.',
            requiredRoles: [] // Accessible to all
        },
    ];

    // Determine which commands the user has access to
    const userRoleIds = interaction.member.roles.cache.map(role => role.id);
    const isAdminOrMod = userRoleIds.some(roleId => 
        [config.ADMIN_ROLE_ID, config.MOD_ROLE_ID].includes(roleId)
    );

    const availableCommands = allCommands.filter(cmd => {
        return cmd.requiredRoles.length === 0 || 
            (isAdminOrMod && cmd.requiredRoles.some(roleId => 
                [config.ADMIN_ROLE_ID, config.MOD_ROLE_ID].includes(roleId)
            ));
    });

    // Create help embed
    const helpEmbed = createEmbed({
        title: 'Help Menu',
        description: 'Here are the commands you can use:',
        fields: availableCommands.map(cmd => ({
            name: cmd.name,
            value: cmd.description,
            inline: false
        })),
        color: '#0099ff'
    });

    await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays the help menu.'),
    execute
};
