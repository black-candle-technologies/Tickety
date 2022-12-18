module.exports = {
  data: {
    name: "open-ticket",
  },
  async execute(interaction, client) {
    client.functions.tickets.openTicket(interaction, client);
  },
};
