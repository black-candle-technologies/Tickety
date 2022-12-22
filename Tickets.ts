const { Client } = require('discord.js');

let SetupManager = require('./managers/SetupManager');
let TicketManager = require('./managers/TicketManager');

module.exports = (client: typeof Client) => {
    client.SetupManager = new SetupManager();
    client.TicketManager = new TicketManager();
}

export {};