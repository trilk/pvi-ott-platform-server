const mongoose = require("mongoose");

//use uuid
const { v4: uuidv4 } = require("uuid");

const accountTypeSchema = new mongoose.Schema({
  AccountTypeName: {
    type: String,
    required: true,
  },
  AccountTypeDesc: {
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
module.exports = mongoose.model("AccountType", accountTypeSchema);
