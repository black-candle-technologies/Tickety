const chalk = require('chalk');
const fs = require("fs");
const { connection } = require("mongoose");

module.exports = (client) => {
  client.functions.handleEvents = async () => {
    const eventFolders = fs.readdirSync(`./src/events`);
    eventFolders.forEach((folder) => {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "client":
          eventFiles.forEach((file) => {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          });
          break;
        case "mongo":
          eventFiles.forEach((file) => {
            const event = require(`../../events/${folder}/${file}`);
            console.log(chalk.green(`[Bot] Event: ${event.name} has been registered!`))
            if (event.once)
              connection.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              connection.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          });
          break;
        default:
          break;
      }
    });
  };
};
