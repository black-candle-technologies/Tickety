const { ActivityType } = require("discord.js");
const Ticket = require('../../schemas/ticket')

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: `over ${client.users.cache.size} users!`,
        status: "dnd",
      },
      {
        type: ActivityType.Watching,
        text: `over ${client.guilds.cache.size} guilds!`,
        status: "dnd",
      },
      {
        type: ActivityType.Watching,
        text: `over ${Ticket.length} tickets!`,
        status: "dnd"
      }
    ];

    const choice = Math.floor(Math.random() * options.length);
    const option = options[choice];
    try {
      await client.user.setPresence({
        activities: [
          {
            name: option.text,
            type: option.type,
          },
        ],
        status: option.status,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
