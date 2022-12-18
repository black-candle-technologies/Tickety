module.exports = {
    data: {
        name: 'remove-user'
    },
    async execute(interaction, client) {
        client.functions.tickets.selectUserToRemove(interaction, client);
    }
}