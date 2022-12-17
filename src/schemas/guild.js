const { Schema, model } = require("mongoose");
const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: { type: String, require: true },
  guildName: { type: String, require: true },
  supportRoles: { type: String, require: true },
  tickets: { type: [String], require: true },
});

module.exports = model("Guild", guildSchema, "guilds");
