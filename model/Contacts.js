const mongoose = require("mongoose");

// use uuid
const { v4: uuid } = require("uuid");

const contactSchema = new mongoose.Schema({
  PhoneNumber: {
    type: String,
  },
  Email: {
    type: String,
  },
  Gender: {
    type: Boolean,
  },
  FullName: {
    type: String,
  },
  ChannelId: {
    type: String,
    required: true,
  },
  ChatId: {
    type: String,
  },
  ChatName: {
    type: String,
  },
  ChatStatus: {
    type: Boolean,
  },
  CreateDate: {
    type: Date,
    default: Date.now(),
  },
  LastestUpdate: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Contacts", contactSchema);