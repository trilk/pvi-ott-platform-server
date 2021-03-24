const mongoose = require("mongoose");

const messageStatusSchema = new mongoose.Schema({
  MessageId: {
    type: String,
  },
  MessageByTime: {
    type: String,
  },
  Content: {
    type: String,
  },
  Profile: {
    type: Object,
  },
  ChannelType: {
    type: String,
  },
  CreateDate: {
    type: Date,
    default: Date.now(),
  },
  UpdateDate: {
    type: Date,
    default: Date.now(),
  },
  CreateBy: {
    type: String,
  },
  Status: {
    type: Number,
  },
});
module.exports = mongoose.model("MessageStatus", messageStatusSchema);
