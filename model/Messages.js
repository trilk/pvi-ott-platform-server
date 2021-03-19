const mongoose = require("mongoose");

//use uuid
const { v4: uuidv4 } = require("uuid");

const messageSchema = new mongoose.Schema({
  MessageId: {
    type: String,
    default: uuidv4(),
  },
  TemplateId: {
    type: String,
    //required: true,
  },
  ContentSMS: {
    type: String,
    required: true,
  },
  ContentOTT: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
  Video: {
    type: String,
  },
  Type: {
    type: String,
    //required: true,
  },
  HtmlFormat: {
    type: Boolean,
  },
  SegmentId: {
    type: String,
    //required: true,
  },
  ChatIdList: {
    type: Array,
    // required: true,
  },
  ChannelId: {
    type: String,
    //required: true,
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
    required: true,
  },
  Schedule: {
    Immediately: {
      type: Date,
      default: Date.now(),
    },
    ParticularTime: {
      type: Date,
    },
  },
  Status: {
    type: Number,
  },
  Statistic: {
    Sent: {
      type: Boolean,
    },
    Failed: {
      type: Boolean,
    },
    Delivered: {
      type: Boolean,
    },
    Seen: {
      type: Boolean,
    },
    Click: {
      type: Boolean,
    },
    ClickThroughRate: {
      type: Boolean,
    },
  },
});
module.exports = mongoose.model("Messages", messageSchema);