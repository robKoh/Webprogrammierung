const express = require('express');
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
//const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

// App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("src"));

app.use(
  cookieSession({
    name: "session",
    signed: false,
    expires: new Date(Date.now() + 3600000)
  })
);

const users = new Map();

app.post('/', (req, res) => {
  req.session.username = req.body.username;
  const user = req.body.username;
  users[uuidv4()] = user;
  res.redirect("/comment.html");
  res.statusCode = 201;
  res.send();
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
  res.send();
});

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});