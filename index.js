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
mongoose.connect(
  process.env.DB_CONNECTION_DEV,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connect to db!")
);

// import routes
const authRoute = require("./routes/auth");
const customerRoute = require("./routes/customer");
const accountRoute = require("./routes/account");
const messageRoute = require("./routes/message");
const segmentRoute = require("./routes/segments");

//middleware
app.use(express.json());

//route middlewares
app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoute);
app.use("/api/account", accountRoute);
app.use("/api/message", messageRoute);
app.use("/api/segment", segmentRoute);

app.listen(process.env.PORT, () => console.log("server started"));
