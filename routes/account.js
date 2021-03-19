const router = require("express").Router();
const { register } = require("../components/auth/Accounts");
const { getProfile, updateProfile, deleteAccount, listAccount } = require("../components/DAO/AccountDAO");
// verify token
const verify = require("../routes/verifyToken");
const _ = require("lodash");
// define response
const { __permission, __network, __success, __exception, __validField, __invalidToken } = require("../define_response");
//ROUTER POST
router.post("/register", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.account.data.role) || _.isNil(req.account.data.role)) {
      return res.send(__invalidToken());
    } else {
      const check = ["Admin", "SPAdmin"].includes(req.account.data.role);
      if (check) {
        const account = await register(req.body);
        return res.send(account);
      } else {
        return res.send(__permission());
      }
    }
  } catch (error) {
    return res.status(400).send(__network());
  }
});

//ROUTER PUT
//update profile
router.put("/update-profile", verify, async (req, res) => {
  try {
    const acccount = await updateProfile(req.account.data.id, req.body);
    return res.send(acccount);
  } catch (error) {
    return res.status(400).send(__network());
  }
});

//ROUTER DELETE
//delete account
router.delete("/delete-account", verify, async (req, res) => {
  try {
    if (_.isEmpty(req.account.data.role) || _.isNil(req.account.data.role)) {
      return res.send(__invalidToken());
    } else {
      const check = ["Admin", "SPAdmin"].includes(req.account.data.role);
      if (check) {
        const account = await deleteAccount(req.body.accepted_id);
        return res.send(account);
      } else {
        return res.send(__permission());
      }
    }
  } catch (error) {
    return res.status(400).send(__network());
  }
});

//ROUTER GET
router.get("/profile", verify, async (req, res) => {
  try {
    const profile = await getProfile(req.account.data.id);
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
      const list = await listAccount(page, limit);
      return res.send(list);
    }
  } catch (error) {
    return res.status(400).send(__network());
  }
});
module.exports = router;
