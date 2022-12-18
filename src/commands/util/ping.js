const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns the ping of the bot!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        let pingEmbed= new EmbedBuilder()
            .setTitle('🏓  Ping')
            .setDescription(`API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`)
            .setColor(client.color);
        await interaction.editReply({
            embeds: [pingEmbed]
        });
    }
}