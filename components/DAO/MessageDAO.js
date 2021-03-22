const Messages = require("../../model/Messages");
const Segments = require("../../model/Segments");
const MessageClass = require("../constructor/Message");

//lodash
const _ = require("lodash");
const { __emptyData, __validField, __exception, __success } = require("../../define_response");
function parseMessage(data) {
  var message = new MessageClass.Message();
  message.setContentOTT(data.contentOTT);
  message.setContentSMS(data.contentSMS);
  message.setSegmentId(data.segmentId);
  message.setTemplateId(data.templateId);
  return message;
}

exports.createMessage = async function (data, id) {
  try {
    const message = parseMessage(data);
    const segments = await Segments.findOne({ _id: message.getSegmentId() });
    if (_.isEmpty(segments)) {
      return __emptyData();
    } else {
      const result = new Messages({
        ContentOTT: message.getContentOTT(),
        ContentSMS: message.getContentSMS(),
        TemplateId: message.getTemplateId(),
        ChatIdList: segments.ChatIdList,
        ChannelId: segments.ChannelId,
        CreateBy: id,
      });
      await result.save();
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};

exports.updateMessage = async function (data) {
  try {
    const message = parseMessage(data);
    const segments = await Segments.findOne({ _id: message.getSegmentId() });
    if (_.isEmpty(segments)) {
      return __emptyData();
    } else {
      const result = new Object({
        ContentOTT: message.getContentOTT(),
        ContentSMS: message.getContentSMS(),
        TemplateId: message.getTemplateId(),
        ChatIdList: segments.ChatIdList,
        ChannelId: segments.ChannelId,
      });
      await Messages.updateOne({ _id: data.id }, { $set: result });
      return __success();
    }
  } catch (error) {
    let result = __exception();
    result.error = error;
    return result;
  }
};

// list all message with limit,page parameter
exports.listMessage = async function (page, limit) {
  try {
    const list = await Messages.find()
      .sort({ _id: -1 })
      .skip(limit * page - limit)
      .limit(limit);

    const totalRecord = await Messages.find();
    let listMessage = new Object();
    listMessage.messages = list;
    listMessage.total = totalRecord.length;
    return listMessage;
  } catch (error) {
    return __exception();
  }
};
