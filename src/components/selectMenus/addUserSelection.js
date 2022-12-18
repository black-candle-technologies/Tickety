module.exports = {
  data: {
    name: "add-user-selection",
  },
  async execute(interaction, client) {
    client.functions.tickets.addUser(interaction, client);
  },
};
