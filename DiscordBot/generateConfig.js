const fs = require('fs');
const path = require('path');
const { PermissionsBitField, ChannelType } = require('discord.js');
const configPath = path.join(__dirname, 'config.json');

/**
 * Generates or updates a config.json file with necessary role IDs and client information.
 * @param {Guild} guild - The guild where roles will be fetched or created.
 */
async function generateConfig(guild) {
    // Load existing config or initialize a new one
    let config = {};

    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    // Role names
    const adminRoleName = 'ticketAdmin';
    const modRoleName = 'ticketMod';

    // Check for or create the admin and mod roles
    let adminRole = guild.roles.cache.find(role => role.name === adminRoleName);
    let modRole = guild.roles.cache.find(role => role.name === modRoleName);

    // Create the admin role if it does not exist
    if (!adminRole) {
        adminRole = await guild.roles.create({
            name: adminRoleName,
            permissions: [
                PermissionsBitField.Flags.ManageChannels,
                PermissionsBitField.Flags.ManageRoles,
                PermissionsBitField.Flags.ManageMessages
            ],
            reason: 'Created for ticketing system'
        });
        console.log(`Created role: ${adminRoleName}`);
    } else {
        console.log(`Role already exists: ${adminRoleName}`);
    }

    // Create the mod role if it does not exist
    if (!modRole) {
        modRole = await guild.roles.create({
            name: modRoleName,
            permissions: [
                PermissionsBitField.Flags.ManageChannels,
                PermissionsBitField.Flags.ManageMessages
            ],
            reason: 'Created for ticketing system'
        });
        console.log(`Created role: ${modRoleName}`);
    } else {
        console.log(`Role already exists: ${modRoleName}`);
    }

    // Update config with role IDs
    config.ADMIN_ROLE_ID = adminRole.id;
    config.MOD_ROLE_ID = modRole.id;

    // Create the archive channel if it doesn't exist
    let archiveChannel = guild.channels.cache.find(channel => channel.name === 'ticket-archives' && channel.type === ChannelType.GuildText);

    if (!archiveChannel) {
        archiveChannel = await guild.channels.create({
            name: 'ticket-archives',
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: [PermissionsBitField.Flags.ViewChannel] // Deny access for everyone else
                },
                {
                    id: adminRole.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
                },
                {
                    id: modRole.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
                }
            ],
            reason: 'Created archive channel for ticket logs'
        });
        console.log('Created archive channel with permissions for ticketAdmin and ticketMod.');
    } else {
        console.log('Archive channel already exists.');
    }

    // Write updated config to file
    fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
    console.log('Config file has been generated/updated.');
}

module.exports = generateConfig;
