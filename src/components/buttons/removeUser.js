module.exports = {
    data: {
        name: 'remove-user'
    },
    async execute(interaction, client) {
        client.pickUserToRemoveFromTicket(interaction, client);
    }
}