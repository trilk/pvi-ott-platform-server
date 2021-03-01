const router = require("express").Router();
//lodash
const _ = require("lodash");
// verify token
const verify = require("../routes/verifyToken");

const SegmentDAO = require("../components/DAO/SegmentDAO");
router.post("/create", verify, async (req, res) => {
  try {
    const result = await SegmentDAO.createSegment(req.body, req.account.data.id);
    if (!_.isEmpty(result)) {
      res.send(result);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
