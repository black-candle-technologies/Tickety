const chalk = require('chalk');
const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    setInterval(client.pickPresence, 10 * 1000);
    console.log(chalk.green(`[Bot Status] Ready with user: ${client.user.tag}`));
  },
};
