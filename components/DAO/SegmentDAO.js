const Segments = require("../../model/Segments");
const Accounts = require("../../model/Accounts");
const Contacts = require("../../model/Contacts");
const Channels = require("../../model/Channels");
//lodash
const _ = require("lodash");

const { __exception, __success, __validField, __emptyData, __exist } = require("../../define_response");

exports.createSegment = async function (data, id) {
  try {
    if (_.isEmpty(data.channelId) || _.isNil(data.channelId)) {
      return __validField();
    } else {
      const Channel = await Channels.findOne({ _id: data.channelId });
      const contacts = await Contacts.where("ChannelType", Channel.ChannelType);
      let listContact = null;
      if (Channel.ChannelType == "Zalo") {
        listContact = contacts.map((element) => {
          return element.ZaloAccount;
        });
      }
      if (Channel.ChannelType == "Viber") {
        listContact = contacts.map((element) => {
          return element.ZaloAccount;
        });
      }
      const segment = new Segments({
        SegmentName: data.segmentName,
        SegmentDesc: data.segmentDesc,
        ChannelId: Channel._id,
        ChannelType: Channel.ChannelType,
        ChannelToken: Channel.ChannelToken,
        ChatIdList: listContact,
        CreateBy: id,
      });
      const saveSegment = await segment.save();
      const result = __success();
      result.data = saveSegment;
      return result;
    }
  } catch (error) {
    let result = __exception();
    result.error = error;
    return result;
  }
};

exports.updateSegment = async function (data) {
  try {
    const segmentType = await Segments.findOne({ _id: data.id });
    const Channel = await Channels.findOne({ _id: segmentType.ChannelId });
    const contacts = await Contacts.where("ChannelType", Channel.ChannelType);
    let listContact = null;
    if (Channel.ChannelType == "Zalo") {
      listContact = contacts.map((element) => {
        return element.ZaloAccount;
      });
    }
    if (Channel.ChannelType == "Viber") {
      listContact = contacts.map((element) => {
        return element.ZaloAccount;
      });
    }

    let segment = new Object();
    segment.SegmentName = data.segmentName;
    segment.SegmentDesc = data.segmentDesc;
    segment.ChatIdList = listContact;
    await Segments.updateOne({ _id: data.id }, { $set: segment });
    return __success();
  } catch (error) {
    let result = __exception();
    result.error = error;
    return result;
  }
};

exports.listSegment = async function (page, limit) {
  try {
    const list = await Segments.find()
      .sort({ _id: -1 })
      .skip(limit * page - limit)
      .limit(limit);
    const totalRecord = await Segments.find();
    let listSegment = new Object();
    listSegment.segments = list;
    listSegment.total = totalRecord.length;
    return listSegment;
  } catch (error) {
    return __exception();
  }
};
