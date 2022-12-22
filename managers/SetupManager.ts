
export class SetupManager {

    setups: typeof Map;

    constructor () {
        this.setups = new Map<string, Object>();
    }

    initialize = async (interaction, type) => {
        let ticketSchema;
        switch(type) {
            case "support":
                ticketSchema = await ticketSetup.findOne({
                    guildId: interaction.guild.id,
                    userId: interaction.user.id,
                    type: "support",
                    inProgress: true
                });
                if(!ticketSchema) ticketSchema = await new supportTicketSetup({
                    _id: mongoose.Types.ObjectId(),
                    guildId: interaction.guild.id,
                    userId: interaction.user.id,
                    type: "support"
                });
                ticketSchema.save();
                break;
            case "application":
                ticketSchema = await ticketSchema.findOne({
                    guildId: interaction.guild.id,
                    userId: interaction.user.id,
                    type: "application",
                    inProgress: true
                });
                if(!ticketSchema) ticketSchema = await new applicationSetup({
                    _id: mongoose.Types.ObjectId(),
                    guildId: interaction.guild.id,
                    userId: interaction.guild.id,
                    type: "application"
                });
                ticketSchema.save();
                break;
            default:
                break;
        }

        this.selectSupportRole(interaction);
    }

    sendSelectSupportRoleEmbed = (interaction) => {
        let selectRoleEmbed = new EmbedBuilder()
            .setTitle("Which role would you like to set as the Support Role?")
            .setDescription("Lorem ipsum!")
            .setColor(client.color);

        let roleSelector = new RoleSelectMenuBuilder()
            .setCustomId("support-role-selector")
            .setPlaceholder("No Role Selected")
            .setMinValues(1)
            .setMaxValues(1);
        
        let roleCreator = new ButtonBuilder()
            .setCustomId("support-role-creator")
            .setStyle(ButtonStyle.Success)
            .setLabel("Create one for me");
        
        interaction.update({
            content: '',
            embeds: [ selectRoleEmbed ],
            components: [
                new ActionRowBuilder().addComponents(roleSelector),
                new ActionRowBuilder().addComponents(roleCreator, client.cancelButton)
            ]
        });
    }

}