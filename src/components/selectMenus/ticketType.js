const {
  EmbedBuilder,
  ChannelSelectMenuBuilder,
} = require("@discordjs/builders");
const { ChannelType, ActionRowBuilder, ActionRow } = require("discord.js");
const { default: mongoose } = require("mongoose");
const setup = require("../../schemas/setup");

let schem;

module.exports = {
  data: {
    name: "ticket-type",
  },
  async execute(interaction, client) {
    let ticketType = interaction.values[0];
    let infoEmbed = new EmbedBuilder()
      .setTitle("Setup Info")
      .setDescription(
        "The information you have provided to the bot will be saved here for your viewing. If this looks intimidating, don't worry, I'll walk you through everything."
      )
      .addFields(
        { name: "1. Ticket Type", value: ticketType, inline: true },
        { name: "2. Embed Channel", value: "None", inline: true },
        { name: "3. Ticket Title", value: "None", inline: true },
        { name: "4. Ticket Text", value: "None", inline: true },
        { name: "6. Ticket Category", value: "None", inline: true },
        { name: "7. Closing Category", value: "None", inline: true }
      );

    let channelEmbed = new EmbedBuilder()
      .setTitle("What channel should this embed be sent to?")
      .setDescription("Lorem ipsum!");

    const channelMenu = new ChannelSelectMenuBuilder()
      .setCustomId("channels")
      .setMinValues(1)
      .setMaxValues(1)
      .setChannelTypes(ChannelType.GuildText);

    let setupProfile = await setup.findOne({
      guildId: interaction.guild.id,
      userId: interaction.user.id,
    });
    if(!setupProfile) setupProfile = await new setup({
      _id: mongoose.Types.ObjectId(),
      guildId: interaction.guild.id,
      userId: interaction.user.id
    });
    setupProfile.ticketType = ticketType;
    setupProfile.save();

    interaction.update({
      embeds: [infoEmbed, channelEmbed],
      components: [
        new ActionRowBuilder().addComponents(channelMenu),
        new ActionRowBuilder().addComponents(client.cancelButton),
      ],
    });
  },
};
