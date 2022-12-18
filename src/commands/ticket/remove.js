const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove a user from the ticket!'),
    async execute(interaction, client) {
        client.pickUserToRemoveFromTicket(interaction, client);
    }
}