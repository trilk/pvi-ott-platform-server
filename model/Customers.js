const mongoose = require("mongoose");

//use uuid
const { v4: uuidv4 } = require('uuid');
const customerSchema = new mongoose.Schema({
  CustomerCode: {
    type: String,
    default: uuidv4(),
  },
  CustomerName: {
    type: String,
    required: true,
  },
  CustomerDesc: {
    type: String,
  },
  CompanyInfo: {
    CompanyName: {
      type: String,
    },
    TaxCode: {
      type: String,
    },
    Address: {
      type: String,
    },
    OwnerName: {
      type: String,
    },
    OwnerPhone: {
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
module.exports = mongoose.model("Customers", customerSchema);
