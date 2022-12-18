const Ticket = require("../../schemas/ticket");
const {
  UserSelectMenuBuilder,
  EmbedBuilder,
  ActionRowBuilder,
} = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord.js");

module.exports = (client) => {
  client.pickUserToRemoveFromTicket = async (interaction, client) => {
    let channel = interaction.channel;
    let ticket = await Ticket.findOne({
      guildId: channel.guild.id,
      channelId: channel.id,
    });
    if (!ticket)
      return interaction.reply({
        content: "You must do this in a ticket!",
        ephemeral: true,
      });
    if (ticket.closed)
      return interaction.reply({
        content: "This ticket is closed!",
        ephemeral: true,
      });

    const menu = new UserSelectMenuBuilder()
      .setCustomId("remove-user-selection")
      .setMinValues(1)
      .setMaxValues(1);

    const embed = new EmbedBuilder()
      .setTitle("Who do you want to remove?")
      .setDescription(
        "Pick the user you would like to remove from the list below."
      );

    await interaction.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(menu),
        new ActionRowBuilder().addComponents(client.cancelButton),
      ],
      ephemeral: true,
    });
  };

  client.removeUserFromTicket = async (interaction, client) => {
    const user = interaction.values[0];
    let channel = interaction.channel;
    let ticket = await Ticket.findOne({
      guildId: channel.guild.id,
      channelId: channel.id,
    });
    if (!ticket) return interaction.reply("You must do this in a ticket!");
    if (ticket.closed)
      return interaction.reply({
        content: "This ticket is closed!",
        ephemeral: true,
      });
    if (user === ticket.owner)
      return interaction.update({
        embeds: [
          new EmbedBuilder()
            .setTitle("Cannot Remove That User")
            .setDescription("I cannot remove the ticket's owner!"),
        ],
        components: [],
        content: "",
      });

    if (ticket.addedUsers.find((id) => id === user) == null)
      return interaction.update({
        content: "That user is not in this ticket!",
        embeds: [],
        components: [],
        ephemeral: true,
      });

    for (x in ticket.addedUsers) {
      if (ticket.addedUsers[x] == user)
        ticket.addedUsers = ticket.addedUsers.filter(
          (e) => e !== ticket.addedUsers[x]
        );
    }
    ticket.save();

    let member = channel.guild.members.cache.find(
      (member) => member.id === user
    );

    channel = await channel.permissionOverwrites.create(member, {
      ViewChannel: false,
    });

    const addedUserEmbed = new EmbedBuilder()
      .setTitle("Success!")
      .setDescription(`Successfully removed user <@${user}> from the ticket!`);

    interaction.update({
      content: "",
      components: [],
      embeds: [addedUserEmbed],
    });
  };
};
