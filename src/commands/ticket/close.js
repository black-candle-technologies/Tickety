const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Close a ticket!'),
    async execute(interaction, client) {
        client.closeTicket(interaction, client);
    }
}