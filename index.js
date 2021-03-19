const express = require("express");
const app = express();

//use cors
const cors = require("cors");
app.use(cors());

// use dotenv
const dotenv = require("dotenv");
dotenv.config();

// connect mongo db
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION_DEV, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("connect to db!")
);

// import routes
const authRoute = require("./routes/auth");
const customerRoute = require("./routes/customer");
const accountRoute = require("./routes/account");
const accountTypeRoute = require("./routes/accountType");
const messageRoute = require("./routes/message");
const segmentRoute = require("./routes/segments");
const channelRoute = require("./routes/channel");
const zalobot = require("./routes/zalobot");
const viberbot = require("./routes/viberbot");
const contactRoute = require("./routes/contact");

//middleware
app.use(express.json());

//route middlewares
app.use("/zalo", zalobot);
app.use("/viber/webhook", viberbot.middleware());
app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoute);
app.use("/api/account", accountRoute);
app.use("/api/account-type", accountTypeRoute);
app.use("/api/message", messageRoute);
app.use("/api/segment", segmentRoute);
app.use("/api/channel", channelRoute);
app.use("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(process.env.PORT, () => {
  console.log("server express started");
});
