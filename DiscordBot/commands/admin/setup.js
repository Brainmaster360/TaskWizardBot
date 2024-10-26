// commands/admin/setup.js
const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const { createEmbed } = require('../../utils/embed');
const { getOrCreateRoles } = require('../../utils/roleManager'); // Assumes getOrCreateRoles only runs during /setup
const { getOrCreateCategory, getOrCreateArchiveChannel } = require('../../utils/channelManager');
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../../config.json');

/**
 * Executes the /setup command.
 * @param {CommandInteraction} interaction 
 * @param {Object} config 
 */
async function execute(interaction, config) {
    await interaction.deferReply({ ephemeral: true });

    try {
        const guild = interaction.guild;

        // Step 1: Create or verify roles only on setup
        const { adminRole, modRole } = await getOrCreateRoles(guild, 'ticketAdmin', 'ticketMod', config.ADMIN_ROLE_ID, config.MOD_ROLE_ID);

        // Step 2: Create or verify categories (e.g., Technical Support, Billing)
        const categories = ['Technical Support', 'Billing', 'General Inquiry'];
        for (const categoryName of categories) {
            await getOrCreateCategory(guild, categoryName);
        }

        // Step 3: Create or verify the archive channel (will not auto-create on startup)
        await getOrCreateArchiveChannel(guild, 'ticket-archives', adminRole, modRole);

        // Step 4: Create or verify the ticket overview channel
        const ticketOverviewChannelName = 'ticket-overview';
        let ticketOverviewChannel = guild.channels.cache.find(
            channel => channel.name === ticketOverviewChannelName && channel.type === ChannelType.GuildText
        );

        if (!ticketOverviewChannel) {
            ticketOverviewChannel = await guild.channels.create({
                name: ticketOverviewChannelName,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    }
                ],
                reason: 'Created ticket-overview channel for ticket interactions'
            });
            console.log(`Created channel: ${ticketOverviewChannelName}`);

            // Send an embed with a dropdown menu in the ticket overview channel
            const { createDetailedEmbedWithMenu } = require('../../utils/embedMenu');
            const fields = categories.map(category => ({
                name: category,
                value: `For issues related to ${category.toLowerCase()}.`,
                inline: false
            }));

            const menuOptions = categories.map(category => {
                let emoji;
                switch (category.toLowerCase()) {
                    case 'technical support': emoji = '🛠️'; break;
                    case 'billing': emoji = '💳'; break;
                    case 'general inquiry': emoji = '❓'; break;
                }
                return {
                    label: category,
                    description: `Select ${category} for assistance.`,
                    value: category.toLowerCase().replace(' ', '_'),
                    emoji
                };
            });

            const { embed, actionRow } = createDetailedEmbedWithMenu({
                title: 'Ticket Overview',
                description: 'Please select the type of support you need from the dropdown menu below:',
                fields,
                menuOptions,
                selectMenuCustomId: 'ticket_select_menu'
            });

            await ticketOverviewChannel.send({ embeds: [embed], components: [actionRow] });
            console.log(`Sent ticket overview embed to ${ticketOverviewChannelName}`);
        }

        // Step 5: Update config.json with Role IDs
        config.ADMIN_ROLE_ID = adminRole.id;
        config.MOD_ROLE_ID = modRole.id;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
        console.log('Updated config.json with role IDs.');

        // Step 6: Send Confirmation Message
        const setupEmbed = createEmbed({
            title: 'Setup Complete',
            description: 'The ticketing system has been successfully set up.',
            color: '#00ff00',
            fields: [
                { name: 'Roles Created', value: `✅ ${adminRole.name}, ${modRole.name}`, inline: false },
                { name: 'Channels Created/Verified', value: `✅ ticket-overview, ticket-archives`, inline: false },
                { name: 'Categories Created/Verified', value: `✅ Technical Support, Billing, General Inquiry`, inline: false }
            ]
        });

        await interaction.editReply({ embeds: [setupEmbed] });

    } catch (error) {
        console.error('Error during setup:', error);
        await interaction.editReply({ content: 'An error occurred during the setup process. Please check my permissions and try again.', ephemeral: true });
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Initialize the ticketing system.'),
    execute
};
