// clearCommands.js
const { REST, Routes } = require('discord.js');
const config = require('./config.json');
require('dotenv').config();

async function clearCommands() {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    // Debugging log to confirm client ID and token
    if (!config.CLIENT_ID) {
        console.error("Error: CLIENT_ID is missing in config.json.");
        return;
    }
    if (!process.env.DISCORD_TOKEN) {
        console.error("Error: DISCORD_TOKEN is missing in .env.");
        return;
    }
    console.log("Client ID:", config.CLIENT_ID);
    console.log("Token starts with:", process.env.DISCORD_TOKEN.slice(0, 4)); // Only show partial token for security

    try {
        console.log('Started clearing global application (/) commands.');

        // Clear global commands
        await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: [] });

        console.log('Successfully cleared all global application (/) commands.');
    } catch (error) {
        if (error.code === 50001) { // Missing Access error
            console.error("Error: Missing permissions to delete global commands.");
        } else {
            console.error('Error clearing commands:', error);
        }
    }

    // Optional: Clear commands for a specific guild
    if (process.env.GUILD_ID) {
        try {
            console.log(`Started clearing guild-specific commands for guild ID: ${process.env.GUILD_ID}`);

            await rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, process.env.GUILD_ID), { body: [] });

            console.log(`Successfully cleared guild-specific commands for guild ID: ${process.env.GUILD_ID}`);
        } catch (error) {
            if (error.code === 50001) { // Missing Access error
                console.error("Error: Missing permissions to delete guild commands.");
            } else {
                console.error('Error clearing guild-specific commands:', error);
            }
        }
    }
}

clearCommands();
