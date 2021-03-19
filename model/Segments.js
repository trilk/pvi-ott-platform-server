const mongoose = require("mongoose");

//use uuid
const { v4: uuidv4 } = require("uuid");
const segmentSchema = new mongoose.Schema({
  SegmentId: {
    type: String,
    default: uuidv4(),
  },
  SegmentName: {
    type: String,
    required: true,
  },
  SegmentDesc: {
    type: String,
  },
  ChatIdList: {
    type: Array,
  },
  ChannelId: {
    type: String,
    required: true,
  },
  FilterQuery: {
    type: Array,
  },
  CreateBy: {
    type: String,
  },
  Status: {
    type: Number,
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
module.exports = mongoose.model("Segments", segmentSchema);
