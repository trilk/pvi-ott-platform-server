const mongoose = require("mongoose");

// use uuid
const { v4: uuid } = require("uuid");
const channelSchema = new mongoose.Schema({
  ChannelId: {
    type: String,
    default: uuid(),
  },
  ChannelType: {
    type: String,
    required: true,
  },
  CustomerCode: {
    type: String,
  },
  ChannelInfo: {
    ChannelId: {
      type: String,
    },
    ChannelName: {
      type: String,
    },
    ChannelToken: {
      type: String,
    },
    ChannelHashKey: {
      type: String,
    },
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
module.exports = mongoose.model("Channels", channelSchema);