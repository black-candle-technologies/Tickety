const Ticket = require('../../schemas/ticket')
const {
  UserSelectMenuBuilder,
  EmbedBuilder,
  ActionRowBuilder,
} = require("@discordjs/builders");
const { PermissionFlagsBits, ActionRow } = require('discord.js');

module.exports = (client) => {
  client.functions.tickets.selectUserToAdd = async (interaction, client) => {
    let channel = interaction.channel;
    let ticket = await Ticket.findOne({
      guildId: channel.guild.id,
      channelId: channel.id
    });
    if(!ticket) return interaction.reply({
      content: "You must do this in a ticket!",
      ephemeral: true
    });
    if(ticket.closed) return interaction.reply({
      content: "This ticket is closed!",
      ephemeral: true
    });
    

    const menu = new UserSelectMenuBuilder()
      .setCustomId("add-user-selection")
      .setMinValues(1)
      .setMaxValues(1);

    const embed = new EmbedBuilder()
      .setTitle("Who do you want to add?")
      .setDescription(
        "Pick the user you would like to add from the list below."
      );

    await interaction.reply({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(menu), new ActionRowBuilder().addComponents(client.cancelButton)],
      ephemeral: true
    });
  };

  client.functions.tickets.addUser = async (interaction, client) => {
    const user = interaction.values[0];
    let channel = interaction.channel;
    let ticket = await Ticket.findOne({
      guildId: channel.guild.id,
      channelId: channel.id
    });
    if(!ticket) return interaction.reply({
      content: "You must do this in a ticket!",
      ephemeral: true
    });
    if(ticket.closed) return interaction.reply({
      content: "This ticket is closed!",
      ephemeral: true
    });

    let ticketMember = ticket.addedUsers.find(id => id === user);
    if(ticketMember != null || user == ticket.owner) return interaction.update({
      content: "That user is already in this ticket!",
      embeds: [],
      components: [],
      ephemeral: true
    });

    if(!ticket.addedUsers) ticket.addedUsers = [String];
    ticket.addedUsers.push(user);
    ticket.save();

    let member = channel.guild.members.cache.find(member => member.id === user);
    await channel.permissionOverwrites.create(member, {
      ViewChannel: true
    });

    const addedUserEmbed = new EmbedBuilder()
      .setTitle("Success!")
      .setDescription(`Successfully added user <@${user}> to the ticket!`);

    interaction.update({
      content: "",
      components: [],
      embeds: [ addedUserEmbed ]
    });
};
};
