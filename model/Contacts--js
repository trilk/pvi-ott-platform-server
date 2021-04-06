const mongoose = require("mongoose");

// use uuid
const { v4: uuid } = require("uuid");

const contactSchema = new mongoose.Schema({
  ContactId: {
    type: String,
    default: uuid(),
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  CustomerCode: {
    type: String,
    required: true,
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
  ContactStatus: {
    type: Number,
  },
  ZaloAccount: {
    Id: {
      type: String,
    },
    UserName: {
      type: String,
    },
    ChannelId: {
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
  },
  FacebookAccount: {
    Id: {
      type: String,
    },
    UserName: {
      type: String,
    },
    ChannelId: {
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
  },
  IntagramAccount: {
    Id: {
      type: String,
    },
    UserName: {
      type: String,
    },
    ChannelId: {
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
  },
  ViberAccount: {
    Id: {
      type: String,
    },
    UserName: {
      type: String,
    },
    ChannelId: {
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
  },
  WhatsAppAccount: {
    Id: {
      type: String,
    },
    UserName: {
      type: String,
    },
    ChannelId: {
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
  },
  TelegramAccount: {
    Id: {
      type: String,
    },
    UserName: {
      type: String,
    },
    ChannelId: {
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
  },
  Status: {
    type: Number,
  },
  LastLocation: {
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
  },
  LastMessageSent: {
    type: String,
  },
  LastActive: {
    type: Date,
  },
  Address: {
    Address: {
      type: String,
    },
    Ward: {
      type: String,
    },
    District: {
      type: String,
    },
    City: {
      type: String,
    },
    Country: {
      type: String,
    },
  },
  CreateDate: {
    type: Date,
    default: Date.now(),
  },
  LastestUpdate: {
    type: String,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Contacts", contactSchema);