var express = require("express");
var app = express();
const mySecret = process.env["MESSAGE_STYLE"];
var assets = __dirname + "/public";
app.use("/public", express.static(assets));
var home = __dirname + "/views/index.html";
app.get("/", function (req, res) {
  res.sendFile(home);
});
app.get("/json", function (req, res) {
  var respone = "Hello JSON";
  if (process.env.MESSAGE_STYLE == "uppercase") {
    response = response.toUpperCase();
    res.json({ message: response });
  } else {
    res.json({ message: response });
  }
});
app.get("/json", function (req, res) {
  var respone = "Hello JSON";

  res.json({ message: response });
});

module.exports = app;
