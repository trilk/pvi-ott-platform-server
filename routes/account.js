const router = require("express").Router();
const Accounts = require("../model/Accounts");
const { register } = require("../components/auth/Accounts");

// verify token
const verify = require("../routes/verifyToken");

//ROUTER POST
router.post("/register", verify, async (req, res) => {
  if (req.account.data.role === "Admin") {
    const account = await register(req.body);
    if (typeof account.errors !== "undefined") {
      res.status(400).send("Something went wrong");
    } else {
      res.json(account);
    }
  } else {
    res.status(400).send("Permission Error!!!");
  }
});

//ROUTER GET
router.get("/profile", verify, async (req, res) => {
  try {
    const profile = await Accounts.findById(req.account.data.id);
    res.json(profile).send();
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
