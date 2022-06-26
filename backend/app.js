const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userrouter = require("./routes/users-route");

const app = express();

app.use(bodyParser.json());
mongoose.connect(process.env.DBURL);
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "DELETE"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use("/api/users", userrouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occured!" });
});

app.listen(2000, () => {
  console.log("Backend Server is running!");
});
