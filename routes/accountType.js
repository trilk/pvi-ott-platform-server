const router = require("express").Router();

const verify = require("../routes/verifyToken");
const _ = require("lodash");
const { __network, __permission, __invalidToken } = require("../define_response");

const { createAccountType, updateAccountType, listAccountType } = require("../components/DAO/AccountTypeDAO");
router.post("/create", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.account.data.role) || _.isNil(req.account.data.role)) {
      return res.send(__invalidToken());
    } else {
      const check = ["Admin", "SPAdmin"].includes(req.account.data.role);
      if (check) {
        const account = await createAccountType(req.body);
        return res.send(account);
      } else {
        return res.send(__permission());
      }
    }
  } catch (error) {
    return res.status(400).send(__network());
  }
});

router.put("/update", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.account.data.role) || _.isNil(req.account.data.role)) {
      return res.send(__invalidToken());
    } else {
      const check = ["Admin", "SPAdmin"].includes(req.account.data.role);
      if (check) {
        const account = await updateAccountType(req.body.id, req.body);
        return res.send(account);
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
      const list = await listAccountType(page, limit);
      return res.send(list);
    }
  } catch (error) {
    return res.status(400).send(__network());
  }
});

module.exports = router;
