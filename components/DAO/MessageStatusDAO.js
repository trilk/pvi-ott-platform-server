const MessageStatus = require("../../model/MessageStatus");
const MessageStatusClass = require("../constructor/MessageStatus");

const _ = require("lodash");

const { __exception, __success } = require("../../define_response");

const parseData = (data) => {
  let messageStatus = new MessageStatusClass.MessageStatus();
  messageStatus.setMessageId(data.request.MessageId);
  messageStatus.setContent(data.request.ContentOTT);
  messageStatus.setCreateBy(data.request.CreateBy);
  messageStatus.setChannelType(data.request.ChannelType);

  messageStatus.setProfile(data.profile);
  messageStatus.setMessageByTime(data.message_by_time);

  //response
  messageStatus.setStatus(!_.isEmpty(data.response.status) ? data.response.status : data.response.error);
  return messageStatus;
};

exports.createMessageStatus = async function (data) {
  try {
    const message = parseData(JSON.parse(data));
    const messageStatus = new MessageStatus({
      MessageId: message.getMessageId(),
      MessageByTime: message.getMessageByTime(),
      Content: message.getContent(),
      Profile: message.getProfile(),
      ChannelType: message.getChannelType(),
      CreateBy: message.getCreateBy(),
      Status: message.getStatus(),
    });
    await messageStatus.save();
    return __success();
  } catch (error) {
    let result = __exception();
    result.error = error;
    return result;
  }
};
