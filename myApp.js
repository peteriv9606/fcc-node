var bodyParser = require("body-parser");
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(home);
});

app.get("/json", (req, res) => {
  var response = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: response.toUpperCase() });
  } else {
    res.json({ message: response });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    console.log(req.time);
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  let word = req.params.word;
  res.send({
    echo: word,
  });
});

//a better way to structure a get/post request - show the path, then decide what to do if GET/POST;
app
  .route("/name")
  .get((req, res) => {
    res.send({ name: req.query.first + " " + req.query.last });
  })
  .post((req, res) => {
    res.send({ name: req.body.first + " " + req.body.last });
  });

module.exports = app;
