const { EmbedBuilder } = require("@discordjs/builders");
const Ticket = require("../../schemas/ticket");
const ticketGroup = require("../../schemas/ticketgroup");

module.exports = (client) => {
  client.functions.tickets.closeTicket = async (interaction, client) => {
    let channel = interaction.channel;
    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true
    });

    const ticket = await Ticket.findOne({
      guildId: channel.guild.id,
      channelId: channel.id,
    });
    if (!ticket)
      return interaction.editReply({
        content: "You must do this in a ticket!",
        ephemeral: true,
      });

    if (ticket.closed)
      return interaction.editReply({
        content: "This ticket is already closed!",
        ephemeral: true,
      });

    const guildTickets = await ticketGroup.findOne({
      _id: ticket.ticketGroup,
    });
    if (!guildTickets)
      return interaction.editReply({
        content: "Something went wrong!",
        ephemeral: true,
      });

    let closedTicketCategoryId = guildTickets.closingCategory;
    console.log(closedTicketCategoryId);
    channel = await channel.setParent(closedTicketCategoryId);
    channel = await channel.permissionOverwrites.create(ticket.owner, {
      ViewChannel: false,
    });

    ticket.closed = true;
    ticket.save();

    let ticketOwner = interaction.guild.members.cache.find(
      (member) => member.id === ticket.owner
    );
    let userDmEmbed = new EmbedBuilder()
      .setTitle("Ticket Closed!")
      .setDescription(
        `Your ticket in ${interaction.guild.name} has been closed by ${interaction.user.username}!`
      );
    ticketOwner.send({
      embeds: [userDmEmbed],
    });

    let addedUserDm = new EmbedBuilder()
      .setTitle("Ticked Closed!")
      .setDescription(
        `${ticketOwner.user.username}'s ticket that you were added to in ${interaction.guild.name} has been closed!`
      );
    ticket.addedUsers.forEach(async (id) => {
      let user = interaction.guild.members.cache.find(
        (member) => member.id === id
      );

      channel = await channel.permissionOverwrites.create(id, {
        ViewChannel: false,
      });

      user.send({
        embeds: [addedUserDm],
      });
    });

    let ticketChannelEmbed = new EmbedBuilder()
      .setTitle("Ticket Closed!")
      .setDescription(
        `This ticket has been successfully closed by ${interaction.user.username}.`
      );
    channel.send({
      embeds: [ticketChannelEmbed],
    });

    let replyEmbed = new EmbedBuilder()
      .setTitle("Success!")
      .setDescription(`Successfully closed ticket <#${ticket.channelId}>`);

    interaction.editReply({
      embeds: [replyEmbed],
      ephemeral: true,
    });
  };
};
