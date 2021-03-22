const router = require("express").Router();
//lodash
const _ = require("lodash");
// verify token
const verify = require("../routes/verifyToken");

const { createSegment, listSegment, updateSegment } = require("../components/DAO/SegmentDAO");

// define response
const { __success, __network, __validField } = require("../define_response");

//ROUTER POST
router.post("/create", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.body.channelId) || _.isEmpty(req.body.segmentName)) {
      return res.send(__validField());
    } else {
      const segment = await createSegment(req.body, req.account.data.id);
      return res.send(segment);
    }
  } catch (error) {
    res.status(400).send(__network());
  }
});

router.put("/update", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.body.channelId) || _.isEmpty(req.body.id)) {
      return res.send(__validField());
    } else {
      const segment = await updateSegment(req.body);
      return res.send(segment);
    }
  } catch (error) {
    res.status(400).send(__network());
  }
});

//ROUTER GET
router.get("/list", verify, async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (_.isEmpty(limit) || _.isNil(limit)) {
      return res.send(__missingParam());
    } else {
      const list = await listSegment(page, limit);
      return res.send(list);
    }
  } catch (error) {
    return res.status(400).send(__network());
  }
});
module.exports = router;
