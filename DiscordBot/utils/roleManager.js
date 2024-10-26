// utils/roleManager.js
const { PermissionsBitField } = require('discord.js');

/**
 * Ensures that the required roles exist in the guild.
 * @param {Guild} guild - The guild where roles are to be ensured.
 * @param {string} adminRoleName - Name for the Admin role.
 * @param {string} modRoleName - Name for the Mod role.
 * @param {string} adminRoleId - Current Admin role ID.
 * @param {string} modRoleId - Current Mod role ID.
 * @returns {Object} - An object containing the adminRole and modRole.
 */
async function getOrCreateRoles(guild, adminRoleName, modRoleName, adminRoleId, modRoleId) {
    try {
        // Check for Admin role
        let adminRole = guild.roles.cache.get(adminRoleId);
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
        }

        // Check for Mod role
        let modRole = guild.roles.cache.get(modRoleId);
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
        }

        return { adminRole, modRole };
    } catch (error) {
        console.error('Error creating roles:', error);
        throw error;
    }
}

module.exports = { getOrCreateRoles };
