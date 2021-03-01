const Messages = require("../../model/Messages");
const Segments = require("../../model/Segments");
const MessageClass = require("../constructor/Message");

//lodash
const _ = require("lodash");

function parseMessage(data) {
  var message = new MessageClass.Message();
  message.setContentOTT(data.contentOTT);
  message.setContentSMS(data.contentSMS);
  message.setSegmentId(data.segmentId);
  message.setTemplateId(data.templateId);
  return message;
}

exports.createMessage = async function (data, id) {
  const message = parseMessage(data);
  try {
    if (!_.isEmpty(message.getSegmentId())) {
      const segments = await Segments.where("SegementId", message.getSegmentId);
      const result = new Messages({
        ContentOTT: message.getContentOTT(),
        ContentSMS: message.getContentSMS(),
        TemplateId: message.getTemplateId(),
        ChatIdList: segments[0].ChatIdList,
        CustomerCode: segments[0].CustomerCode,
        ChannelType: segments[0].ChannelType,
        CreateBy: id,
      });
      const saveMessage = await result.save();
      return saveMessage;
    }
  } catch (error) {
    return error;
  }
};
