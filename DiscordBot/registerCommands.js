// registerCommands.js
const { REST, Routes, PermissionFlagsBits } = require('discord.js');
const config = require('./config.json'); // Load client ID from config
require('dotenv').config(); // Load token from .env file

/**
 * Registers slash commands with specific permissions.
 * @param {Collection} commands - The bot's command collection.
 */
async function registerCommands(commands) {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    // Ensure the necessary configurations are set
    if (!config.CLIENT_ID || !process.env.DISCORD_TOKEN) {
        console.error("Error: CLIENT_ID or DISCORD_TOKEN is missing. Check config.json and .env files.");
        return;
    }

    const commandsData = commands.map(command => {
        const commandData = command.data.toJSON();

        // Set specific permissions for commands
        switch (commandData.name) {
            case 'setup':
                commandData.default_member_permissions = PermissionFlagsBits.Administrator.toString();
                break;
            case 'announce':
                commandData.default_member_permissions = (PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageChannels).toString();
                break;
            case 'close':
                commandData.default_member_permissions = PermissionFlagsBits.ManageChannels.toString();
                break;
            case 'claim':
            case 'archive':
                commandData.default_member_permissions = PermissionFlagsBits.ManageChannels.toString();
                break;
            case 'setlogchannel':
            case 'warn':
                commandData.default_member_permissions = (PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageChannels).toString();
                break;
            case 'roll':
                commandData.default_member_permissions = null; // Allows all users to access
                break;
            case 'weather':
                commandData.default_member_permissions = null; // Allows all users to access
                break;
            case 'remind':
                commandData.default_member_permissions = null; // Allows all users to access
                break;
            case 'notifystreamer':
            case 'removestreamer':
                commandData.default_member_permissions = PermissionFlagsBits.Administrator.toString(); // Restricted to Admins
                break;
            case 'liststreamers':
                commandData.default_member_permissions = null; // Allows all users to access
                break;
            default:
                commandData.default_member_permissions = null; // Allows all users to access
        }

        console.log(`Preparing to register command: ${commandData.name} with permissions: ${commandData.default_member_permissions || 'None'}`);
        return commandData;
    });

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(config.CLIENT_ID),
            { body: commandsData }
        );
        console.log('Successfully reloaded application (/) commands with updated permissions.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}

module.exports = registerCommands;
