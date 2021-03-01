const mongoose = require("mongoose");

//use uuid
const { v4: uuidv4 } = require("uuid");

const templateSchema = new mongoose.Schema({
  TemplateId: {
    type: String,
    default: uuidv4(),
  },
  Title: {
    type: String,
    required: true,
  },
  Caption: {
    type: String,
    required: true,
  },
  Content: {
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
    required: true,
  },
  HtmlFormat: {
    type: Boolean,
  },
  ChannelType: {
    type: String,
    required: true,
  },
  CustomerCode: {
    type: String,
    required: true,
  },
  CreateBy: {
    type: String,
    required: true,
  },
  CreateDate: {
    type: Date,
    default: Date.now(),
  },
  LastestUpdate: {
    type: Date,
    default: Date.now(),
  },
  Status: {
    type: Number,
  },
});
module.exports = mongoose.model("Templates", templateSchema);