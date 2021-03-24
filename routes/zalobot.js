const router = require("express").Router();

const { zaloSubscribe, zaloUnSubscribe } = require("../components/DAO/ContactDAO");
const { getTokenByChannel } = require("../components/DAO/ChannelDAO");

//api zalo
const { getProfileUser } = require("../services/zaloApi");

router.post("/webhook", async (req, res) => {
  //get Token
  const token = await getTokenByChannel("Zalo");
  try {
    const event_name = req.body.event_name;
    const data = req.body;
    if (event_name == "follow") {
      await getProfileUser(token, data.follower.id)
        .then((response) => {
          zaloSubscribe(response.data.data);
        })
        .catch((error) => {
          console.log("error zalo follow", error);
        });
    }
    if (event_name == "unfollow") {
      await zaloUnSubscribe(data.follower.id);
    }
    res.status(200).send("zalo webhook bot connect success");
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
