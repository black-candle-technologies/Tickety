const {
  ActionRowBuilder,
  EmbedBuilder,
  ChannelSelectMenuBuilder,
  ButtonBuilder,
} = require("@discordjs/builders");
const {
  ChannelType,
  ActionRow,
  ButtonStyle,
  RoleSelectMenuBuilder,
} = require("discord.js");
const setup = require("../../schemas/setup");

module.exports = {
  data: {
    name: "embed-info",
  },
  async execute(interaction, client) {
    const embedTitle = interaction.fields.getTextInputValue("embed-text");
    const embedText = interaction.fields.getTextInputValue("embed-title");

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
    setupProfile.embedTitle = embedTitle;
    setupProfile.embedText = embedText;
    setupProfile.save();

    const infoEmbed = interaction.message.embeds[0];

    infoEmbed.fields[1] = {
      name: "2. Embed Channel",
      value: `<#${setupProfile.embedChannel}>`,
      inline: true,
    };

    infoEmbed.fields[2] = {
      name: "3. Embed Title",
      value: embedTitle,
      inline: true,
    };

    infoEmbed.fields[3] = {
      name: "4. Embed Text",
      value: embedText,
      inline: true,
    };

    const supportRoleEmbed = new EmbedBuilder()
      .setTitle("What should the Support Role be?")
      .setDescription("Lorem ipsum.");
    const supportRoleSelector = new RoleSelectMenuBuilder()
      .setCustomId("support-role")
      .setMinValues(1)
      .setMaxValues(1);

    interaction.update({
      embeds: [infoEmbed, supportRoleEmbed],
      components: [
        new ActionRowBuilder().addComponents(supportRoleSelector),
        new ActionRowBuilder().addComponents(client.cancelButton),
      ],
    });
  },
};
