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
   git clone https://github.com/Brainmaster360/TaskWizard.git
   cd TaskWizard
   ```
2. **Install Dependencies:**
```bash
npm install
```
3. **Setup Environment Variables:**
   Create a .env file in the root directory of the project and add your tokens and IDs:
```makefile
   DISCORD_TOKEN=your_discord_bot_token
   DISCORD_CLIENT_ID=your_discord_client_id
```
4. **Run the Bot:**
   Start the bot using the following command:
```bash
npm start
```
## Commands
**General Commands:**
/help: Displays the help menu with a list of available commands.
/ticket: Create a support ticket for user inquiries.
/ping: Checks the bot's latency.
/roll: Rolls a die with a specified number of sides (e.g., /roll 6).
/weather: Fetches the current weather for a specified location (ZIP code or address).

**Admin Commands:**
/setup: Initializes the ticketing system for user support.
/announce: Sends a custom announcement embed to the channel.
/close: Closes an active support ticket.
/setlogchannel: Designates a channel for bot logs and messages.
/warn: Issues a warning to a user for inappropriate behavior.

### Deployment
The original Task Wizard bot is deployed on an AWS instance, leveraging AWS services for reliability and scalability. If you wish to deploy the bot on AWS or any other cloud platform, consider the following:

AWS EC2: You can use an EC2 instance to run the bot continuously.
PM2 Process Manager: Utilize PM2 to manage the bot process, ensuring it stays online and restarts if it crashes.
Environment Variables: Securely store your .env file or configure environment variables through AWS Systems Manager Parameter Store or Secrets Manager.
Security Groups: Configure your AWS security groups to allow necessary outbound connections to Discord's API.

## Discord Support Server
Join our [Discord Support Server](https://discord.gg/vq6B9xWTgp) for assistance, feature requests, and to connect with other users!

### Contributing:
Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

**Fork the Project**
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request

**License**
This project is licensed under the MIT License. See the LICENSE file for details.

**Acknowledgments**
Special thanks to the Discord.js community for their support and contributions.
Inspired by various Discord bots and projects that enhance user experience.
