const express = require('express');
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

// App
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("src"));

const users = new Map();

app.post('/', (req, res) => {
  const user = req.body;
  users[uuidv4()] = user;
  res.redirect("/comment.html/");
  res.statusCode = 201;
  res.send();
});

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});