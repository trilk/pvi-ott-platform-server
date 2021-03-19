const amqp = require("amqplib");
exports.createMessageQueue = async function (messages) {
  try {
    const connection = await amqp.connect(process.env.RABBIT_CONNECTION);
    const channel = await connection.createChannel();
    const result = await channel.assertQueue(process.env.QUEUE_NAME);
    channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(JSON.stringify(messages)));
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
