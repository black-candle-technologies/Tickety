const {
  EmbedBuilder,
  ChannelSelectMenuBuilder,
} = require("@discordjs/builders");
const {
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const setup = require("../../schemas/setup");

module.exports = {
  data: {
    name: "closing-category",
  },
  async execute(interaction, client) {
    const category = interaction.values[0];

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

    setupProfile.ticketCategory = category;
    setupProfile.save();

    const infoEmbed = interaction.message.embeds[0];
    const closingCategory = interaction.guild.channels.cache.find(
      (channel) => channel.id === category
    );
    infoEmbed.fields[6] = {
      name: "7. Closing Category",
      value: `${closingCategory.name}`,
      inline: true,
    };

    const ticketEmbed = new EmbedBuilder()
        .setTitle(setupProfile.embedTitle)
        .setDescription(setupProfile.embedText);
    const ticketButton = new ButtonBuilder()
        .setLabel("Open a ticket!")
        .setCustomId("open-ticket")
        .setEmoji("🎟️");
    const embedChannel = interaction.guild.channels.cache.find(channel => channel.id === setupProfile.embedChannel);

    let ticketSchema = await ticketGroup.findOne({
        guildId: interaction.guild.id,
        channelId: interaction.channel.id
    });

    if(!ticketSchema) ticketSchema = await new ticketGroup({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        channelId: interaction.channel.id
    });

    ticketSchema.supportRole = setupProfile.supportRole;
    ticketSchema.ticketCategory = setupProfile.ticketCategory;
    ticketSchema.closingCategory = setupProfile.ticketClosingCategory;
    ticketSchema.openTickets = [];
    ticketSchema.closedTickets = [];
    ticketSchema.save();

    embedChannel.send({
        embeds: [ ticketEmbed ],
        components: [ new ActionRowBuilder().addComponents(ticketButton) ]
    });

    interaction.update({
      content: "Congratulations, you've made it through the setup process!",
      embeds: [ infoEmbed ],
      components: [],
    });
  },
};
