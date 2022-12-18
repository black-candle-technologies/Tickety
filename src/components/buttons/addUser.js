module.exports = {
    data: {
        name: 'add-user'
    },
    async execute(interaction, client) {
        client.functions.tickets.selectUserToAdd(interaction, client);
    }
}