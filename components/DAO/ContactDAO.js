const Contacts = require("../../model/Contacts.js");
const Channels = require("../../model/Channels");
const _ = require("lodash");

const { __exception, __success, __validField, __emptyData, __exist } = require("../../define_response");
exports.viberSubscribe = async function (data) {
  try {
    const checkExist = await Contacts.findOne({ ChatId: data.id });
    if (!_.isEmpty(checkExist) || !_.isNil(checkExist)) {
      await Contacts.updateOne(
        { ChatId: data.id },
        { $set: { ChatStatus: true, ChatName: data.name, ViberAccount: data } }
      );
      return __exist();
    } else {
      const channel = await Channels.findOne({ ChannelType: "Viber" });
      const contact = new Contacts({
        ChannelId: channel._id,
        ChatId: data.id,
        ChatName: data.name,
        ViberAccount: data,
        ChatStatus: true,
      });
      await contact.save();
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};

exports.viberUnSubscribe = async function (id) {
  try {
    await Contacts.updateOne({ ChatId: id }, { $set: { ChatStatus: false } });
    return __success();
  } catch (error) {
    return __exception();
  }
};

exports.getProfileSubscriber = async function (id) {
  try {
    if (_.isEmpty(id) || _.isNil(id)) {
      return __validField();
    } else {
      const profileSubcriber = await Contacts.findOne({ _id: id });
      return profileSubcriber;
    }
  } catch (error) {
    return __exception();
  }
};
exports.listSubcriber = async function (page, limit) {
  try {
    const list = await Contacts.find()
      .sort({ _id: -1 })
      .skip(limit * page - limit)
      .limit(limit);
    const totalRecord = await Contacts.find();
    let listContacts = new Object();
    listContacts.Contacts = list;
    listContacts.total = totalRecord.length;
    return listContacts;
  } catch (error) {
    return __exception();
  }
};

exports.zaloSubscribe = async function (data) {
  try {
    const checkExist = await Contacts.findOne({ ChatId: data.id });
    if (!_.isEmpty(checkExist) || !_.isNil(checkExist)) {
      await Contacts.updateOne({ ChatId: data.id }, { $set: { ChatStatus: true } });
      return __exist();
    } else {
      const channel = await Channels.findOne({ ChannelType: "Zalo" });
      const contact = new Contacts({
        ChannelId: channel._id,
        ChatId: data.follower.id,
        ChatName: data.name,
        ZaloAccount: data,
        ChatStatus: true,
      });
      await contact.save();
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};

exports.zaloUnSubscribe = async function (id) {
  try {
    await Contacts.updateOne({ ChatId: id }, { $set: { ChatStatus: false } });
    return __success();
  } catch (error) {
    return __exception();
  }
};
