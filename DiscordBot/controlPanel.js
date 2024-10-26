const { exec } = require('child_process');

function startBot() {
    exec('node DiscordBot.js', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error starting bot: ${stderr}`);
            return;
        }
        console.log(`Bot started: ${stdout}`);
    });
}

function stopBot() {
    exec('pkill -f DiscordBot.js', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error stopping bot: ${stderr}`);
            return;
        }
        console.log(`Bot stopped: ${stdout}`);
    });
}

// Example usage
startBot();
// You can call stopBot() when needed
