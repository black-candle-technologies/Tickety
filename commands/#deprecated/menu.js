const {
    SlashCommandBuilder,
    ActionRowBuilder,
    SelectMenuOptionBuilder,
    StringSelectMenuBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("menu")
      .setDescription("Returns a select menu!"),
    async execute(interaction, client) {
      const menu = new StringSelectMenuBuilder()
        .setCustomId('example')
        .setMinValues(1)
        .setMaxValues(1)
        .setOptions(new SelectMenuOptionBuilder({
            label: "Option #1",
            value: `This is Option 1`
        }), new SelectMenuOptionBuilder({
            label: "Option #2",
            value: `This is Option 2`
        }));
  
      await interaction.reply({
          components: [ new ActionRowBuilder().addComponents(menu) ]
      });
    },
  };
  