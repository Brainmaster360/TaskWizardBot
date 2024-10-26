// utils/channelManager.js
const { ChannelType, PermissionsBitField } = require('discord.js');

/**
 * Ensures that the specified category exists in the guild.
 * @param {Guild} guild - The guild where the category is to be ensured.
 * @param {string} categoryName - The name of the category.
 * @returns {CategoryChannel} - The existing or newly created category channel.
 */
async function getOrCreateCategory(guild, categoryName) {
    try {
        let category = guild.channels.cache.find(
            channel => channel.name === categoryName && channel.type === ChannelType.GuildCategory
        );
        if (!category) {
            category = await guild.channels.create({
                name: categoryName,
                type: ChannelType.GuildCategory,
                reason: `Created category: ${categoryName}`
            });
            console.log(`Created category: ${categoryName}`);
        }
        return category;
    } catch (error) {
        console.error(`Error creating category "${categoryName}":`, error);
        throw error;
    }
}

/**
 * Ensures that the archive channel exists in the guild.
 * @param {Guild} guild - The guild where the archive channel is to be ensured.
 * @param {string} archiveChannelName - The name of the archive channel.
 * @returns {TextChannel} - The existing or newly created archive text channel.
 */
async function getOrCreateArchiveChannel(guild, archiveChannelName) {
    try {
        let archiveChannel = guild.channels.cache.find(
            channel => channel.name === archiveChannelName && channel.type === ChannelType.GuildText
        );
        if (!archiveChannel) {
            archiveChannel = await guild.channels.create({
                name: archiveChannelName,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    }
                ],
                reason: 'Created archive channel for ticket logs'
            });
            console.log(`Created archive channel: ${archiveChannelName}`);
        }
        return archiveChannel;
    } catch (error) {
        console.error(`Error creating archive channel "${archiveChannelName}":`, error);
        throw error;
    }
}

// utils/channelManager.js
async function getOrCreateRoles(guild, adminRoleName, modRoleName, adminRoleId, modRoleId) {
    try {
        // Find or create the admin role
        let adminRole = guild.roles.cache.find(role => role.name === adminRoleName || role.id === adminRoleId);
        if (!adminRole) {
            adminRole = await guild.roles.create({
                name: adminRoleName,
                permissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
                reason: 'Role created for ticketing system'
            });
            console.log(`Created role: ${adminRoleName}`);
        }

        // Find or create the mod role
        let modRole = guild.roles.cache.find(role => role.name === modRoleName || role.id === modRoleId);
        if (!modRole) {
            modRole = await guild.roles.create({
                name: modRoleName,
                permissions: ['MANAGE_MESSAGES'],
                reason: 'Role created for ticketing system'
            });
            console.log(`Created role: ${modRoleName}`);
        }

        return { adminRole, modRole };
    } catch (error) {
        console.error('Error creating roles:', error);
    }
}
module.exports = { getOrCreateCategory, getOrCreateArchiveChannel, getOrCreateRoles };
