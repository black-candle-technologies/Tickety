const {
  ChannelType,
  messageLink,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelSelectMenuBuilder,
  ActionRow,
  ActionRowBuilder,
} = require("discord.js");
const setup = require("../../schemas/setup");

module.exports = {
  data: {
    name: "create-ticket-category",
  },
  async execute(interaction, client) {
    const guild = interaction.guild;

    let setupProfile = await setup.findOne({
      guildId: interaction.guild.id,
      userId: interaction.user.id,
    });

    if (!setupProfile)
      return interaction.update({
        embeds: [],
        components: [],
        content:
          "An error occured, please try again. If this error persists, please contact the bot developer.",
      });

    const category = await guild.channels.create({
      type: ChannelType.GuildCategory,
      name: "Tickets",
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: setupProfile.supportRole,
          allow: [PermissionFlagsBits.ViewChannel],
        },
      ],
    });

    setupProfile.ticketCategory = category.id;
    setupProfile.save();

    const infoEmbed = interaction.message.embeds[0];
    infoEmbed.fields[5] = {
      name: "6. Ticket Category",
      value: `${category.name}`,
      inline: true,
    };

    const closingCategoryEmbed = new EmbedBuilder()
      .setTitle(
        "Which category should tickets be placed in once they are closed?"
      )
      .setDescription("Lorem ipsum.");
    const ticketCategorySelector = new ChannelSelectMenuBuilder()
      .setCustomId("closing-category")
      .setMinValues(0)
      .setMaxValues(1)
      .setPlaceholder("None")
      .setChannelTypes(ChannelType.GuildCategory);
    const ticketCategoryButton = new ButtonBuilder()
      .setCustomId("create-closing-category")
      .setStyle(ButtonStyle.Success)
      .setLabel("Create one for me!");

    interaction.update({
      embeds: [infoEmbed, closingCategoryEmbed],
      components: [
        new ActionRowBuilder().addComponents(ticketCategorySelector),
        new ActionRowBuilder().addComponents(
          ticketCategoryButton,
          client.cancelButton
        ),
      ],
    });
  },
};
