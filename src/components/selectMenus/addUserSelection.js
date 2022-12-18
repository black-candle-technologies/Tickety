module.exports = {
  data: {
    name: "add-user-selection",
  },
  async execute(interaction, client) {
    client.addUserToTicket(interaction, client);
  },
};
