module.exports = {
    data: {
        name: 'favorite-color'
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `You said your favorite color is: ${interaction.fields.getTextInputValue("favorite-color-input")}`
        });
    }
}