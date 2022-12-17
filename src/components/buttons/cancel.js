module.exports = {
    data: {
        name: 'cancel'
    },
    async execute(interaction, client) {
        await interaction.update({
            content: 'This interaction has been cancelled!',
            embeds: [],
            components: [],
            ephemeral: true
        })
    }
}