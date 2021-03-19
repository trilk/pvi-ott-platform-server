const router = require("express").Router();
const { register } = require("../components/auth/Accounts");
const { getProfileSubscriber, listSubcriber } = require("../components/DAO/ContactDAO");
// verify token
const verify = require("../routes/verifyToken");
const _ = require("lodash");
// define response
const { __permission, __network, __success, __exception, __validField, __invalidToken } = require("../define_response");

//ROUTER POST

//ROUTER GET
router.get("/profile/:id", verify, async (req, res) => {
  try {
    const profile = await getProfileSubscriber(req.params.id);
    return res.send(profile);
  } catch (error) {
    return res.status(400).send(__network());
  }
});
router.get("/list", verify, async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (_.isEmpty(limit) || _.isNil(limit)) {
      return res.send(__missingParam());
    } else {
      const list = await listSubcriber(page, limit);
      return res.send(list);
    }
  } catch (error) {
    return res.status(400).send(__network());
  }
});
module.exports = router;
