const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autocomplete")
    .setDescription("Returns autocompletion.")
    .addStringOption((option) =>
      option
        .setName(`color`)
        .setDescription("A color based on autocomplete!")
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["red", "blue", "yellow", "green"];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({
        name: choice,
        value: choice,
      }))
    );
  },
  async execute(interaction, client) {
    const option = interaction.options.getString("color");
    await interaction.reply({
      content: `Your color is: ${option}`,
    });
  },
};
