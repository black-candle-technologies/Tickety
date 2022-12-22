const { Client, RoleSelectMenuInteraction } = require('discord.js');

module.exports = {
  name: "support-role-selector",
  async execute(interaction: RoleSelectMenuInteraction, client: Client) {
    let supportRoleId = interaction.values[0];
    let type = await client.functions.tickets.findTicketType(interaction);
    if (type == null) return interaction.reply("Something went wrong!");
    client.SetupManager.saveSupportRole(interaction, supportRoleId, type);
  },
};