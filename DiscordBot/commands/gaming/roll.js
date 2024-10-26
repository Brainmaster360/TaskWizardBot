// commands/gaming/roll.js
const { SlashCommandBuilder } = require('discord.js');

/**
 * Executes the /roll command.
 * @param {CommandInteraction} interaction 
 */
async function execute(interaction) {
    const dice = interaction.options.getString('dice');
    const [num, sides] = dice.split('d').map(Number);
    
    let result = 0;
    let rolls = [];

    for (let i = 0; i < num; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        result += roll;
    }

    await interaction.reply({ content: `You rolled: ${rolls.join(', ')}\nTotal: ${result}`, ephemeral: true });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a specified number of dice.')
        .addStringOption(option => 
            option.setName('dice')
                .setDescription('Format: NdM (e.g., 2d6 for two six-sided dice)')
                .setRequired(true)),
    execute
};
