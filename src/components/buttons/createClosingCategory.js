const { ChannelType, messageLink, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const setup = require("../../schemas/setup");

module.exports = {
  data: {
    name: "create-closing-category",
  },
  async execute(interaction, client) {
    const guild = interaction.guild;
    const category = await guild.channels.create({
      type: ChannelType.GuildCategory,
      name: "Closed Tickets",
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
      ],
    });

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

    setupProfile.ticketClosingCategory = category.id;
    setupProfile.save();

    const infoEmbed = interaction.message.embeds[0];
    infoEmbed.fields[6] = {
      name: "7. Closing Category",
      value: `${category.name}`,
      inline: true,
    };

    const ticketEmbed = new EmbedBuilder()
        .setTitle(setupProfile.embedTitle)
        .setDescription(setupProfile.embedText);
    const ticketButton = new ButtonBuilder()
        .setLabel("Open a ticket!")
        .setCustomId("open-ticket")
        .setStyle(ButtonStyle.Success)
        .setEmoji("🎟️");
    const embedChannel = interaction.guild.channels.cache.find(channel => channel.id === setupProfile.embedChannel);
    embedChannel.send({
        embeds: [ ticketEmbed ],
        components: [ new ActionRowBuilder().addComponents(ticketButton) ]
    });

    interaction.update({
      content: "Congratulations, you've made it through the setup process!",
      embeds: [infoEmbed],
      components: [],
    });
  },
};
