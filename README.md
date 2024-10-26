# Task Wizard

## Overview

Task Wizard is a Discord bot designed to enhance community engagement and streamline task management. With a variety of commands for managing tasks, reminders, and utility functions, Task Wizard aims to provide a helpful and interactive experience for users on Discord.

## Features

- **Task Management**: Create and manage support tickets seamlessly.
- **Utility Commands**: Roll dice, fetch weather information, and set reminders easily.
- **Admin Controls**: Restricted commands for administrators to maintain order and facilitate community management.
- **Help Menu**: Users can access a comprehensive help menu that provides descriptions of all available commands.
- **Ticket System**: Extensive ticket system to allow admins and mods to communicate with other users securely. 

## Requirements

Before running the bot, ensure you have the following:

- [Node.js](https://nodejs.org/) (version 16 or later)
- A Discord account and a Discord server to test the bot.
- A bot account created via the [Discord Developer Portal](https://discord.com/developers/applications).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/TaskWizard.git
   cd TaskWizard
Install Dependencies:

bash
Copy code
npm install
Setup Environment Variables: Create a .env file in the root directory of the project and add your tokens and IDs:

makefile
Copy code
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_client_id
Run the Bot: Start the bot using the following command:

bash
Copy code
npm start
Commands
General Commands:
/help: Displays the help menu with a list of available commands.
/ticket: Create a support ticket for user inquiries.
/ping: Checks the bot's latency.
/roll: Rolls a die with a specified number of sides (e.g., /roll 6).
/weather: Fetches the current weather for a specified location (ZIP code or address).
Admin Commands:
/setup: Initializes the ticketing system for user support.
/announce: Sends a custom announcement embed to the channel.
/close: Closes an active support ticket.
/setlogchannel: Designates a channel for bot logs and messages.
/warn: Issues a warning to a user for inappropriate behavior.
Contributing:
Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Special thanks to the Discord.js community for their support and contributions.
Inspired by various Discord bots and projects that enhance user experience.
