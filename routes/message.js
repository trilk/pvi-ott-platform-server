const router = require("express").Router();

const viberBot = require("./viberbot");

//lodash
const _ = require("lodash");
// verify token
const verify = require("../routes/verifyToken");

// queue
const { createMessageQueue, receiveQueue } = require("../queue");

// Message DAO
const { createMessage, updateMessage, listMessage } = require("../components/DAO/MessageDAO");

// Message Model
const Message = require("../model/Messages");
const { __exception, __success, __validField, __emptyData, __network, __missingParam } = require("../define_response");
router.post("/send", verify, async (req, res) => {
  try {
    const result = await Message.findById(req.body.id);
    if (_.isNil(req.body.id)) {
      return res.send(__validField());
    }
    if (_.isEmpty(result)) {
      return res.send(__emptyData());
    } else {
      result.ChatIdList.forEach(async (userProfile) => {
        // viberBot.sendMessage(userProfile);
        await createMessageQueue(userProfile, result.ContentOTT);
        await receiveQueue();
      });
      return res.send(__success());
    }
  } catch (error) {
    res.status(400).send(__network());
  }
});

router.post("/create", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.body.segmentId)) {
      return res.send(__validField());
    } else {
      const message = await createMessage(req.body, req.account.data.id);
      return res.send(message);
    }
  } catch (error) {
    res.status(400).send(__network());
  }
});
router.put("/update", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.body.segmentId)) {
      return res.send(__validField());
    } else {
      const message = await updateMessage(req.body);
      return res.send(message);
    }
  } catch (error) {
    res.status(400).send(__network());
  }
});

//ROUTER GET
router.get("/list", verify, async (req, res) => {
  try {
    const { limit, page } = req.query;
    if (_.isEmpty(limit) || _.isNil(limit)) {
      return res.send(__missingParam());
    } else {
      const message = await listMessage(parseInt(page), parseInt(limit));
      return res.send(message);
    }
  } catch (error) {
    let result = __network();
    result.error = error;
    return res.status(400).send(result);
  }
});
module.exports = router;
