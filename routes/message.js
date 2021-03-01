const router = require("express").Router();
//lodash
const _ = require("lodash");
// verify token
const verify = require("../routes/verifyToken");

// queue
const amqp = require("amqplib");
const { createMessageQueue } = require("../publisher");

// Message DAO
const MessageDAO = require("../components/DAO/MessageDAO");

// Message Model
const Message = require("../model/Messages");

router.post("/send", verify, async (req, res) => {
  try {
    const result = await Message.findById(req.body.id);
    if (typeof result !== "undefined" && !_.isEmpty(result)) {
      const add = await createMessageQueue(req.body);
      const receive = await receiveQueue();
      res.send(result);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/create", verify, async (req, res) => {
  try {
    const result = await MessageDAO.createMessage(
      req.body,
      req.account.data.id
    );
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
