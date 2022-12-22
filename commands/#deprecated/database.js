const Guild = require('../../schemas/guild');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('database')
        .setDescription('Returns information from the database!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if(!guildProfile) guildProfile = await new Guild({
            _id: mongoose.Types.ObjectId(),
            guildId: interaction.guild.id,
            guildName: interaction.guild.name,
            guildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : null 
        });
        await guildProfile.save();
        
        let embed = new EmbedBuilder()
            .setTitle("Guild Info")
            .addFields(
                { name: "Name", value: guildProfile.guildName },
                { name: "ID", value: guildProfile.guildId }
            )
            .setImage(guildProfile.guildIcon);
        interaction.editReply({
            embeds: [embed]
        })
    }
}