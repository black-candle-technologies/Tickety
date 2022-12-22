const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup tickety for your server!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async (interaction, client) => {
    const message = await interaction.deferReply({
      fetchReply: true,
      ephemeral: true
    });

    client.functions.setup.shared.initialize(interaction);
  },
};
