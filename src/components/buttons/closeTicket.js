module.exports = {
    data: {
        name: 'close-ticket'
    },
    async execute(interaction, client) {
        client.functions.tickets.closeTicket(interaction, client);
    }
}