const chalk = require("chalk");
const { REST } = require(`@discordjs/rest`);
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");

module.exports = (client) => {
  client.functions.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    commandFolders.forEach((folder) => {
      if (folder.startsWith("#")) return;

      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      commandFiles.forEach((file) => {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(
          chalk.green(
            `[Bot] Command: ${command.data.name} has been registered!`
          )
        );
      });
    });

    const { clientId } = process.env;
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log(
        chalk.green("[Bot] Started refreshing application (/) commands.")
      );

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log(
        chalk.green("[Bot] Successfully refreshed application (/) commands.")
      );
    } catch (error) {
      console.error(error);
    }
  };
};
