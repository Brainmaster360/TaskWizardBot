// events/ready.js
const registerCommands = require('../registerCommands'); // Import the separate registerCommands module

/**
 * Executes when the bot is ready.
 * @param {Client} client 
 */
async function execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // Register slash commands using the client's command collection
    const commands = Array.from(client.commands.values()); // Convert Collection to an array for registering
    await registerCommands(commands);
}

module.exports = {
    name: 'ready',
    once: true,
    execute
};
