const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

// App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static("src"));

const users = new Map();

// add static login page
app.use("/", express.static(__dirname + "/index.html"));


app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});