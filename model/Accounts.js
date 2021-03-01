const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  PhoneNumber: {
    type: String,
    required: true,
    min: 10,
    max: 10,
  },
  Password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  CustomerCode: {
    type: String,
    required: true,
  },
  OTP: {
    Code: {
      type: String,
    },
    ExpireTime: {
      type: Date,
    },
    CreateDate: {
      type: Date,
      default: Date.now(),
    },
    Status: {
      type: Number,
      default: 0,
    },
  },
  FullName: {
    type: String,
  },
  Gender: {
    type: Boolean,
  },
  Address: {
    type: String,
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
module.exports = mongoose.model("Accounts", accountSchema);