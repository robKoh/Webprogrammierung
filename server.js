const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

// App
app.use(express.static("src"));
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(bodyParser.json());

const users = [];
var areWrongCredentials = true;

app.post('/login', (req, res) => {
  const user = req.body;

  //Anmelden und Registrieren
  if (user.username !== "" && user.password !== "") {
    if (findUserinUsers(user) !== undefined) {
      //Anmelden
      res.cookie("session", user.id, {maxAge: 300000});
      res.redirect("/comment.html");
      res.statusCode = 200;
      res.send();
    } else {
      //Registrieren
      user.id = uuidv4();
      users.push(user);
      res.cookie("session", user.id, {maxAge: 300000});
      res.redirect("/comment.html");
      res.statusCode = 201;
      res.send();
    }
  } else {
    areWrongCredentials = true;
  }
  console.log(users);
});

function findUserinUsers(user) {
  const userFounded = users.find((listenElement) => {
    return listenElement.id === user.id;
  });
}

app.get("/displayUser", (req, res) => {
  if (req.body) {
    res.send([req.body.username]);
  } else {
    res.statusCode = 401;
    res.send();
  }
});

app.get("/displayAlertCredentials", (req, res) => {
  if (areWrongCredentials) {
    areWrongCredentials = false;
    res.status(200).send();
  } else {
    areWrongCredentials = false;
    res.status(405).send();
  }
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
  res.send();
});

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});