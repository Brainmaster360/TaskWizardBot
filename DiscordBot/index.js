

// Add global error handling at the top
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

// Load environment variables from .env file
require('dotenv').config();

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const registerCommands = require('./registerCommands'); // Assumes you have a registerCommands module

// Load or initialize configuration
const configPath = path.join(__dirname, 'config.json');
let config = {};

// Load config if it exists, otherwise initialize an empty config
if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences
    ]
});

// Initialize a Collection for commands
client.commands = new Collection();

// Load command files from the commands directory
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);

        // Check if command is properly structured
        if (!command.data || !command.data.name) {
            console.error(`The command at ${filePath} is missing a 'data' property or 'name'`);
            continue; // Skip this command file if it's not structured correctly
        }

        client.commands.set(command.data.name, command);
    }
}

// Register event handlers from the events directory
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, config, client.commands));
    } else {
        client.on(event.name, (...args) => event.execute(...args, config, client.commands));
    }
}

// Register slash commands on bot ready (No automatic config generation here)
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Register commands
    await registerCommands(client.commands);

});

// Login to Discord with the token from .env
client.login(process.env.DISCORD_TOKEN);
