const express = require("express");
const app = express();

const fs = require("fs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//use cors
const cors = require("cors");
app.use(cors());

// use dotenv
const dotenv = require("dotenv");
dotenv.config();

// connect mongo db
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION_DEV, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connect to db!");
});

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
app.use(express.static(__dirname + "/node_modules"));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    var headers = {};
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = "86400"; // 24 hours
    res.writeHead(200, headers);
    res.end();
  } else {
    next();
  }
});

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
  res.send("hello").status(200);
});

const http = require("http");

const server = http
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(process.env.PORT, () => {
    console.log(`server express started ${process.env.PORT}`);
  });
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_HOST,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", function (socket) {
  console.log("Client connected to the WebSocket");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("message", function (msg) {
    console.log("Received a chat message");
  });
});

module.exports.socketEmit = function (value) {
  io.emit("message", value);
};
