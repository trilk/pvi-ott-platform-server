const http = require("http");
const fs = require("fs");

const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const UrlMessage = require("viber-bot").Message.Url;
const StickerMessage = require("viber-bot").Message.Sticker;
require("dotenv").config();

// DAO
const { viberSubscribe, viberUnSubscribe } = require("../components/DAO/ContactDAO");
// Creating the bot with access token, name and avatar
const bot = new ViberBot({
  authToken: process.env.VIBER_BOT_TOKEN, // Learn how to get your access token at developers.viber.com
  name: "Tesolf Bot",
  avatar: "http://viber.com/avatar.jpg", // Just a placeholder avatar to display the user
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  sendMessage(response.userProfile, "Hi");
});
bot.onSubscribe((response) => viberSubscribe(response.userProfile));
bot.onUnsubscribe((userId) => viberUnSubscribe(userId));
bot.getBotProfile().then((response) => {
  console.log("bot name", response);
});

const sendMessage = (userProfile, message) => {
  bot.sendMessage(userProfile, [new TextMessage(message)]);
};

const httpsOptions = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};
http.createServer(httpsOptions, bot.middleware()).listen(6000, () => {
  bot
    .setWebhook(process.env.WEBHOOK_URL)
    .then(() => {
      console.log("viber bot set webhook success");
    })
    .catch((err) => console.log(err));
});
module.exports = bot;
