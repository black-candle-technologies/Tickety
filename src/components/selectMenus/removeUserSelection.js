module.exports = {
  data: {
    name: "remove-user-selection",
  },
  async execute(interaction, client) {
    client.functions.tickets.removeUser(interaction, client);
  },
};
