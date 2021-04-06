const Contacts = require("../../model/Contacts.js");
const _ = require("lodash");

const { __exception, __success, __validField, __emptyData, __exist } = require("../../define_response");
const Channels = require("../../model/Channels.js");
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
      const contact = new Contacts({
        ChannelId: "Viber",
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

exports.zaloSubscribe = async function (data, oa_id) {
  try {
    const checkExist = await Contacts.findOne({ ChatId: data.user_id });
    const channel = await Channels.findOne({ ChannelCode: oa_id });
    if (!_.isEmpty(checkExist) || !_.isNil(checkExist)) {
      await Contacts.updateOne(
        { ChatId: data.user_id },
        { $set: { ChatStatus: true, ChatName: data.display_name, ZaloAccount: data, ChannelId: channel._id } }
      );
      return __exist();
    } else {
      const contact = new Contacts({
        ChannelType: "Zalo",
        ChannelId: channel._id,
        ChatId: data.user_id,
        ChatName: data.display_name,
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
