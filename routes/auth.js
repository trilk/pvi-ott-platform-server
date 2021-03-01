const router = require("express").Router();

// validation login
const { login } = require("../components/auth/Accounts");

//ROUTER POST
router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body.phone, req.body.password);
    res.header("auth-token", result.token).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});
//ROUTER GET
module.exports = router;
