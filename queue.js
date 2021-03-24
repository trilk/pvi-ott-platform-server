const amqp = require("amqplib");

// api send to social media
const { viberApiPost } = require("./services/viberApi");
const { zaloApiPost } = require("./services/zaloApi");

//params
const { viberMessageText } = require("./params/viber");
const { zaloMessageText } = require("./params/zalo");

//dao
const { createMessageStatus } = require("./components/DAO/MessageStatusDAO");

exports.createMessageQueue = async function (userProfile, message, messageByTime) {
  try {
    const connection = await amqp.connect(process.env.RABBIT_CONNECTION);
    const channel = await connection.createChannel();
    const result = await channel.assertQueue(process.env.QUEUE_NAME);

    const channelType = message.ChannelType;
    const content = message.ContentOTT;
    const token = message.ChannelToken;
    if (channelType == "Zalo") {
      await zaloApiPost(
        `https://openapi.zalo.me/v2.0/oa/message?access_token=${token}`,
        zaloMessageText(userProfile, content)
      )
        .then((response) => {
          channel.sendToQueue(
            process.env.QUEUE_NAME,
            Buffer.from(
              JSON.stringify({
                response: response.data,
                profile: userProfile,
                request: message,
                message_by_time: messageByTime,
              })
            )
          );
        })
        .catch((err) => {
          console.log("res send queue zalo err", err);
        });
    }
    if (channelType == "Viber") {
      await viberApiPost("https://chatapi.viber.com/pa/send_message", viberMessageText(userProfile, content))
        .then((response) => {
          channel.sendToQueue(
            process.env.QUEUE_NAME,
            Buffer.from(
              JSON.stringify({
                response: response.data,
                request: message,
                profile: userProfile,
                request: message,
                message_by_time: messageByTime,
              })
            )
          );
        })
        .catch((err) => {
          console.log("res send queue viber err", err);
        });
    }
  } catch (error) {
    console.log("create queue error", error);
  }
};

exports.receiveQueue = async function () {
  try {
    const connection = await amqp.connect(process.env.RABBIT_CONNECTION);
    const channel = await connection.createChannel();
    const assert = await channel.assertQueue(process.env.QUEUE_NAME);
    channel.consume(process.env.QUEUE_NAME, async (result) => {
      //ghi du lieu vao db
      await createMessageStatus(result.content.toString());
      
      channel.ack(result);
    });
  } catch (error) {
    console.log("receive queue error", error);
  }
};
