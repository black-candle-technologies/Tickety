const { Schema, model } = require("mongoose");
const ticketGroupSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: { type: String, require: true },
  channelId: { type: String, require: true },
  supportRole: { type: String, require: false },
  ticketCategory: { type: String, require: false },
  closingCategory: { type: String, require: false },
  openTickets: { type: [String], require: false },
  closedTickets: { type: [String], require: false }
});

module.exports = model("TicketGroup", ticketGroupSchema, "ticketGroup");
