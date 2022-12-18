const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const ticketGroup = require("../../schemas/ticketgroup");
const Ticket = require("../../schemas/ticket");
const { default: mongoose } = require("mongoose");

module.exports = (client) => {
  client.createTicket = async (interaction, client) => {
    let guildTickets = await ticketGroup.findOne({
      guildId: interaction.guild.id,
      channelId: interaction.channel.id,
    });

    if (!guildTickets)
      return interaction.reply({
        content: "Something went wrong!",
        ephemeral: true,
      });

    let guild = interaction.guild;
    let ticketCategory = guildTickets.ticketCategory;
    let channel = await guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      parent: ticketCategory,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: guildTickets.supportRole,
          allow: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [PermissionFlagsBits.ViewChannel],
        },
      ],
    });

    interaction.reply({
      content: `Successfully created new ticket: <#${channel.id}>`,
      ephemeral: true,
    });

    let addUserButton = new ButtonBuilder()
      .setCustomId("add-user")
      .setLabel("Add User")
      .setStyle(ButtonStyle.Success);
    let removeUserButton = new ButtonBuilder()
      .setCustomId("remove-user")
      .setLabel("Remove User")
      .setStyle(ButtonStyle.Danger);
    let closeTicketButton = new ButtonBuilder()
      .setCustomId("close-ticket")
      .setLabel("Close Ticket")
      .setStyle(ButtonStyle.Danger);

    guildTickets.openTickets.push(channel.id);
    let newTicketEmbed = new EmbedBuilder()
      .setTitle("New Ticket")
      .setDescription(`Welcome <@${interaction.user.id}>!`);
    channel.send({
      embeds: [newTicketEmbed],
      components: [
        new ActionRowBuilder().addComponents(
          addUserButton,
          removeUserButton,
          closeTicketButton
        ),
      ],
    });
    channel
      .send({
        content: `<@&${guildTickets.supportRole}>`,
      })
      .then((message) => setTimeout(() => message.delete(), 500));

    let ticket = new Ticket({
      _id: mongoose.Types.ObjectId(),
      channelId: channel.id,
      closed: false,
      guildId: channel.guild.id,
      owner: interaction.user.id,
      ticketGroup: guildTickets._id,
    });

    ticket.save();
  };
};
