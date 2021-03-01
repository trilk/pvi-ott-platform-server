const mongoose = require("mongoose");

//use uuid
const { v4: uuidv4 } = require("uuid");

const accountTypeSchema = new mongoose.Schema({
  AccountTypeId: {
    type: String,
    default: uuidv4(),
  },
  AccountTypeCode: {
    type: String,
    required: true,
  },
  AccountTypeName: {
    type: String,
    required: true,
  },
  AccountTypeDesc: {
    type: String,
  },
  CustomerCode: {
    type: String,
  },
});
module.exports = mongoose.model("AccountType", accountTypeSchema);
