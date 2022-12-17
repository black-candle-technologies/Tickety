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
} = require("discord.js");
const setup = require("../../schemas/setup");

module.exports = {
  data: {
    name: "channels",
  },
  async execute(interaction, client) {
    const channel = interaction.values[0];

    const modal = new ModalBuilder()
      .setTitle("Embed Information")
      .setCustomId("embed-info");

    const embedTitle = new TextInputBuilder()
      .setCustomId("embed-title")
      .setLabel("What should the embed's title be?")
      .setPlaceholder("Embed title")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const embedText = new TextInputBuilder()
      .setCustomId("embed-text")
      .setLabel("What should the embed's text be?")
      .setPlaceholder("Embed text")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      new ActionRowBuilder().addComponents(embedTitle),
      new ActionRowBuilder().addComponents(embedText)
    );

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
      
    setupProfile.embedChannel = channel;
    setupProfile.save();

    interaction.showModal(modal);
  },
};
