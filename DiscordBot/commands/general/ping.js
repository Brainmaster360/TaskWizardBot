// commands/general/ping.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction) {
        // Initial "Pinging..." message to get latency
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        // Create the embed with latency information
        const pingEmbed = new EmbedBuilder()
            .setTitle('Pong!')
            .setDescription('Bot latency check successful.') // Non-empty description
            .setColor('#00FF00')
            .addFields(
                { name: 'Latency', value: `${latency}ms`, inline: true },
                { name: 'API Latency', value: `${apiLatency}ms`, inline: true }
            );

        // Edit the initial reply with the embed
        await interaction.editReply({ content: null, embeds: [pingEmbed] });
    }
};
