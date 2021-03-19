const Segments = require("../../model/Segments");
const Accounts = require("../../model/Accounts");
const Contacts = require("../../model/Contacts");
//lodash
const _ = require("lodash");

const { __exception, __success, __validField, __emptyData, __exist } = require("../../define_response");

exports.createSegment = async function (data, id) {
  try {
    if (_.isEmpty(data.channelId) || _.isNil(data.channelId)) {
      return __validField();
    } else {
      let arrayContacts = [];
      const contactList = await Contacts.where("ChannelId", data.channelId);
      contactList.forEach((element) => {
        arrayContacts.push({ ChatId: element.ChatId, ChatName: element.ChatName });
      });
      const segment = new Segments({
        SegmentName: data.segmentName,
        SegmentDesc: data.segmentDesc,
        ChannelId: data.channelId,
        ChatIdList: arrayContacts,
        CreateBy: id,
      });
      const saveSegment = await segment.save();
      const result = __success();
      result.data = saveSegment;
      return result;
    }
  } catch (error) {
    return __exception();
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
