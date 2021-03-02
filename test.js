const express = require('express');
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const datastorage = require("./datastorage");
const app = express();
const PORT = 8080;

app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cookieParser());
app.use(express.static("src"));
app.use(express.json()); //Used to parse JSON bodies, newer than bodyParser Library

app.post("/html", (req, res) => {
  console.log("Hello")
  console.log(datastorage.tempUser);
  //console.log("Page loaded");
  res.send();
});

app.listen(PORT, () => {
  console.log(`This app listening with test.js at http://localhost:${PORT}`);
});

