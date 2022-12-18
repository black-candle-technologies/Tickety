const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add a user to the ticket!'),
    async execute(interaction, client) {
        client.functions.tickets.selectUserToAdd(interaction, client);
    }
}