const http = require("http");
const fs = require("fs");
require("dotenv").config();

const func = require("../index");

const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const UrlMessage = require("viber-bot").Message.Url;
const StickerMessage = require("viber-bot").Message.Sticker;

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
  bot.sendMessage(response.userProfile, [new TextMessage("Hi")]);
});
bot.onSubscribe((response) => {
  func.socketEmit(response.userProfile);
  viberSubscribe(response.userProfile);
});
bot.onUnsubscribe((userId) => {
  func.socketEmit(userId);
  viberUnSubscribe(userId);
});
bot.getBotProfile().then((response) => {
  console.log("bot name", response.name);
});

const httpsOptions = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};
http.createServer(httpsOptions, bot.middleware()).listen(5002, () => {
  bot
    .setWebhook(process.env.WEBHOOK_URL)
    .then(() => {
      console.log("viber bot set webhook success");
    })
    .catch((err) => console.log("bot didn't connected", err));
});
module.exports = bot;
