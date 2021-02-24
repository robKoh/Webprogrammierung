const express = require('express');
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
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
    expires: new Date(Date.now()).setHours(1)
  })
);

app.post('/login', (req, res) => {
  req.session.username = req.body.username;
  res.redirect("/comment.html");
  res.statusCode = 201;
  res.send();
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/index.html");
  res.send();
});

app.get("/displayUser", (req, res) => {
  if (req.session) {
    res.send([req.session.username]);
  } else {
    res.statusCode = 401;
    res.send();
  }
});

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});