const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup your server to use Tickety!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    let message = await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    const typeEmbed = new EmbedBuilder()
      .setTitle("What type of ticket would you like to setup?")
      .setDescription("Lorem ipsum!")
      .setColor(client.color);

    const menu = new StringSelectMenuBuilder()
      .setCustomId("ticket-type")
      .setMinValues(1)
      .setMaxValues(1)
      .setPlaceholder("None")
      .setOptions(
        new StringSelectMenuOptionBuilder({
          label: "🎟️ Support Tickets",
          value: `support`,
        }),
        new StringSelectMenuOptionBuilder({
          label: "📝 Applications",
          value: `application`,
        })
      );

    await interaction.editReply({
      embeds: [typeEmbed],
      components: [
        new ActionRowBuilder().addComponents(menu),
        new ActionRowBuilder().addComponents(client.cancelButton),
      ],
      ephemeral: true,
    });
  },
};
