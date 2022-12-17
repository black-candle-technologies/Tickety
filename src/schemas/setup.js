const { Schema, model } = require("mongoose");
const setupSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: { type: String, require: true },
  userId: { type: String, require: true},
  ticketType: { type: String, require: false },
  embedChannel: { type: String, require: false },
  embedTitle: { type: String, require: false },
  embedText: { type: String, require: false },
  ticketCategory: { type: String, require: false},
  ticketClosingCategory: { type: String, require: false }
});

module.exports = model("GuildSetup", setupSchema, "guildSetups");