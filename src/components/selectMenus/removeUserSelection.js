module.exports = {
  data: {
    name: "remove-user-selection",
  },
  async execute(interaction, client) {
    client.removeUserFromTicket(interaction, client);
  },
};
