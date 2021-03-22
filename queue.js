const amqp = require("amqplib");

// api send to social media
const { viberApiPost } = require("./services/api");

//params
const { viberMessageText } = require("./params/viber");

exports.createMessageQueue = async function (userProfile, message) {
  try {
    const connection = await amqp.connect(process.env.RABBIT_CONNECTION);
    const channel = await connection.createChannel();
    const result = await channel.assertQueue(process.env.QUEUE_NAME);
    await viberApiPost("https://chatapi.viber.com/pa/send_message", viberMessageText(userProfile, message))
      .then((response) => {
        channel.sendToQueue(
          process.env.QUEUE_NAME,
          Buffer.from(JSON.stringify({ response: response.data, request: userProfile, content: message }))
        );
      })
      .catch((err) => {
        console.log("res send queue err", err);
      });
  } catch (error) {
    console.log("create queue error", error);
  }
};

exports.receiveQueue = async function () {
  try {
    const connection = await amqp.connect(process.env.RABBIT_CONNECTION);
    const channel = await connection.createChannel();
    const assert = await channel.assertQueue(process.env.QUEUE_NAME);
    channel.consume(process.env.QUEUE_NAME, (result) => {
      console.log("received result : ", result.content.toString());

      channel.ack(result);
    });
  } catch (error) {
    console.log("receive queue error", error);
  }
};
