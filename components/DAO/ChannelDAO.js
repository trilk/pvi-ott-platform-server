const Channels = require("../../model/Channels");
const _ = require("lodash");

const { __exception, __success, __validField, __emptyData } = require("../../define_response");
exports.create = async function (data, customerCode) {
  try {
    if (_.isEmpty(data.channelType) || _.isEmpty(data.channelName)) {
      return __validField();
    } else {
      const channel = new Channels({
        ChannelType: data.channelType,
        ChannelName: data.channelName,
        CustomerCode: customerCode,
      });
      await channel.save();
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};

exports.updateToken = async function (data) {
  try {
    if (_.isEmpty(data.id) || _.isNil(data.id) || _.isEmpty(data) || _.isNil(data)) {
      return __validField();
    }
    const result = await Channels.findById(data.id);
    if (_.isEmpty(result)) {
      return __emptyData();
    } else {
      let channel = new Object();
      channel.ChannelToken = data.channelToken;

      await Channels.updateOne({ _id: data.id }, { $set: channel });
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};

//get detail channel
exports.getDetail = async function (id) {
  try {
    if (_.isEmpty(id) || _.isNil(id)) {
      return __validField();
    } else {
      const detail = await Channels.findOne({ _id: id });
      return detail;
    }
  } catch (error) {
    return __exception();
  }
};

exports.listChannel = async function (page, limit) {
  try {
    const list = await Channels.find()
      .sort({ _id: -1 })
      .skip(limit * page - limit)
      .limit(limit);
    const totalRecord = await Channels.find();
    let listChannels = new Object();
    listChannels.Channels = list;
    listChannels.total = totalRecord.length;
    return listChannels;
  } catch (error) {
    return __exception();
  }
};

//get Token by channel
exports.getTokenByChannel = async function (channelType) {
  try {
    if (_.isEmpty(channelType) || _.isNil(channelType)) {
      return __validField();
    } else {
      const detail = await Channels.findOne({ ChannelType: channelType });
      return detail.ChannelToken;
    }
  } catch (error) {
    return __exception();
  }
};
