const router = require("express").Router();

//define response
const { __network } = require("../define_response");

// validation login
const { login } = require("../components/auth/Accounts");

//ROUTER POST
router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body.phone, req.body.password);
    return res.header("auth-token", result.token).send(result);
  } catch (error) {
    return res.status(400).send(__network());
  }
});
//ROUTER GET
module.exports = router;
