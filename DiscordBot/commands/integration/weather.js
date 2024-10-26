// commands/integration/weather.js
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

/**
 * Executes the /weather command.
 * @param {CommandInteraction} interaction 
 */
async function execute(interaction) {
    const location = interaction.options.getString('location');

    try {
        const weatherData = await getWeather(location);
        await interaction.reply({ content: `The current weather in **${location}** is: ${weatherData}`, ephemeral: true });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        await interaction.reply({ content: 'Could not fetch weather data. Please ensure the location is correct and try again later.', ephemeral: true });
    }
}

/**
 * Fetches weather data from OpenWeatherMap API.
 * @param {string} location - The location for which to fetch weather data.
 * @returns {Promise<string>} - A formatted string with the weather information.
 */
async function getWeather(location) {
    const apiKey = process.env.WEATHER_API_KEY; // Ensure to set this in your .env file
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        
        if (response.status === 200) {
            const weather = response.data.weather[0].description;
            const temperature = response.data.main.temp;
            return `🌤️ ${weather} with a temperature of ${temperature}°C.`;
        } else {
            throw new Error('Failed to retrieve weather data');
        }
    } catch (error) {
        // Handle specific HTTP errors
        if (error.response) {
            throw new Error(`Weather API returned a ${error.response.status} error: ${error.response.data.message}`);
        } else if (error.request) {
            throw new Error('No response received from the Weather API. Please check your internet connection.');
        } else {
            throw new Error('An unexpected error occurred while fetching the weather data.');
        }
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Fetches the current weather for a specified location (ZIP code or address).')
        .addStringOption(option =>
            option.setName('location')
                .setDescription('The location to get the weather for (use either a ZIP code or a city name/address).')
                .setRequired(true)),
    execute
};
