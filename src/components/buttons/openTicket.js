module.exports = {
  data: {
    name: "open-ticket",
  },
  async execute(interaction, client) {
    client.createTicket(interaction, client);
  },
};
