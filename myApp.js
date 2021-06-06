console.log("SERVER IS RUNNING");
require("dotenv").config();
var express = require("express");
var app = express();
const mySecret = process.env["MESSAGE_STYLE"];
var assets = __dirname + "/public";
app.use("/public", express.static(assets));
var home = __dirname + "/views/index.html";

app.use((req, res, next) => {
  console.log(req.method, req.path, "-", req.ip);
  next();
});

app.get("/", (req, res, next) => {
  res.sendFile(home);
});
app.get("/json", function (req, res) {
  var response = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: response.toUpperCase() });
  } else {
    res.json({ message: response });
  }
});
module.exports = app;
