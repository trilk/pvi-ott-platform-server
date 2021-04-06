const router = require("express").Router();

const _ = require("lodash");

const { create, updateToken, listChannel } = require("../components/DAO/ChannelDAO");
const verify = require("./verifyToken");
const { __network, __permission, __invalidToken } = require("../define_response");

router.post("/create", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.account.data.role) || _.isNil(req.account.data.role)) {
      return res.send(__invalidToken());
    } else {
      const check = ["Admin", "SPAdmin"].includes(req.account.data.role);
      if (check) {
        const channel = await create(req.body, req.account.data.customerCode);
        return res.send(channel);
      } else {
        return res.send(__permission());
      }
    }
  } catch (error) {
    return res.status(400).send(__network());
  }
});

router.put("/update-token", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.account.data.role) || _.isNil(req.account.data.role)) {
      return res.send(__invalidToken());
    } else {
      const check = ["Admin", "SPAdmin"].includes(req.account.data.role);
      if (check) {
        const channel = await updateToken(req.body);
        return res.send(channel);
      } else {
        return res.send(__permission());
      }
    }
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
      const list = await listChannel(page, limit);
      return res.send(list);
    }
  } catch (error) {
    return res.status(400).send(__network());
  }
});

module.exports = router;
