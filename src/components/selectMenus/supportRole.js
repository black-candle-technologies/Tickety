const {
  EmbedBuilder,
  ChannelSelectMenuBuilder,
} = require("@discordjs/builders");
const {
  ChannelType,
  ActionRowBuilder,
  ActionRow,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const setup = require("../../schemas/setup");

module.exports = {
  data: {
    name: "support-role",
  },
  async execute(interaction, client) {
    console.log('test');
    const setupProfile = await setup.findOne({
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

    setupProfile.supportRoles = interaction.values[0];
    setupProfile.save();

    const role = interaction.guild.roles.cache.find(role => role.id === interaction.values[0]);
    const infoEmbed = interaction.message.embeds[0];
    infoEmbed.fields[4] = {
        name: "5. Support Roles",
        value: role.name,
        inline: true
    }

    const ticketCategoryEmbed = new EmbedBuilder()
      .setTitle("Which category should the tickets be placed in?")
      .setDescription("Lorem ipsum.");

    const ticketCategorySelector = new ChannelSelectMenuBuilder()
      .setCustomId("ticket-category")
      .setMinValues(0)
      .setMaxValues(1)
      .setPlaceholder("None")
      .setChannelTypes(ChannelType.GuildCategory);

    const ticketCategoryButton = new ButtonBuilder()
      .setCustomId("create-ticket-category")
      .setStyle(ButtonStyle.Success)
      .setLabel("Create one for me!");

    interaction.update({
      embeds: [infoEmbed, ticketCategoryEmbed],
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
