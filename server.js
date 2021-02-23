const express = require("express");
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

var id;
const users = new Map();

app.get("/", (req, res) => {
  var i = 0;
  id = uuidv4();
  users.set(i, id);
  res.cookie("test test", {
    expire: 3600000 + Date.now(),
    httpOnly: true,
    secure: true
  });

  // console.log(users[i]);
  // console.log(document.cookie);
  /*for (i = 0; i < users.size; i++) {
    if (users[i] !== document.cookie) {
      id = uuidv4();
      users.set(i, id);
      res.cookie(id, { expire: 3600000 + Date.now() });
    }
  }*/
  res.sendFile(__dirname + "/static/index.html");
});

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});