module.exports = {
    data: {
        name: 'close-ticket'
    },
    async execute(interaction, client) {
        client.closeTicket(interaction, client);
    }
}