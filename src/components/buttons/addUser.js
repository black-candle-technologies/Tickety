module.exports = {
    data: {
        name: 'add-user'
    },
    async execute(interaction, client) {
        client.pickUserToAddToTicket(interaction, client);
    }
}