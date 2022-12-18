const { Schema, model  } = require("mongoose");
const ticketSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: { type: String, require: true },
  channelId: { type: String, require: true },
  closed: { type: Boolean, require: true },
  ticketGroup: { type: Schema.Types.ObjectId, require: true },
  owner: { type: String, require: true },
  addedUsers: { type: [String], require: false }
});

module.exports = model("Ticket", ticketSchema, "tickets");