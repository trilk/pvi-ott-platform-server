const router = require("express").Router();

router.post("/webhook", async (req, res) => {
  try {
    console.log("req",req.body);
  } catch (error) {
    console.log("webhook error", error);
  }
});
router.get("/webhook", async (req, res) => {
  try {
    res.send("zalo webhook connect success");
  } catch (error) {
    console.log("zalo webhook connect error", error);
  }
});
module.exports = router;
