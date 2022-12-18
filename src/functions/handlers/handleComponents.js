const chalk = require("chalk");
const fs = require("fs");

module.exports = (client) => {
  client.functions.handleComponents = async () => {
    const componentFolders = fs.readdirSync("./src/components");
    componentFolders.forEach((folder) => {
      if (folder.startsWith("#")) return;
      const componentFiles = fs
        .readdirSync(`./src/components/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { buttons, selectMenus, modals } = client;

      switch (folder) {
        case "buttons":
          componentFiles.forEach((file) => {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
            console.log(
              chalk.green(
                `[Bot] Button: ${button.data.name} has been registered!`
              )
            );
          });
          break;
        case "selectMenus":
          componentFiles.forEach((file) => {
            const menu = require(`../../components/${folder}/${file}`);
            selectMenus.set(menu.data.name, menu);
            console.log(
              chalk.green(
                `[Bot] Select Menu: ${menu.data.name} has been registered!`
              )
            );
          });
          break;
        case "modals":
          componentFiles.forEach((file) => {
            const modal = require(`../../components/${folder}/${file}`);
            modals.set(modal.data.name, modal);
            console.log(
              chalk.green(
                `[Bot] Modal: ${modal.data.name} has been registered!`
              )
            );
          });
          break;
        default:
          break;
      }
    });
  };
};
