// utils/permissions.js

/**
 * Checks if a member has at least one of the required roles.
 * @param {GuildMember} member - The guild member to check.
 * @param {Array<string>} requiredRoleIds - Array of role IDs to check against.
 * @returns {boolean} - Returns true if the member has at least one required role.
 */
function hasRequiredRole(member, requiredRoleIds) {
    return member.roles.cache.some(role => requiredRoleIds.includes(role.id));
}

module.exports = { hasRequiredRole };
