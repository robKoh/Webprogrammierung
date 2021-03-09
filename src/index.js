const express = require("express");
const router = express.Router();
const data = require("../datastorage");

const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

// App
//app.use("/index.html", express.static("src"));
router.use(express.urlencoded()); //Parse URL-encoded bodies
router.use(cookieParser());
router.use(express.static("src"));
router.use(express.json()); //Used to parse JSON bodies, newer than bodyParser Library

router.post("/login", (req, res, next) => {
  const user = req.body;

  //Anmelden und Registrieren
  if (user.username !== "" && user.password !== "") {
    if (findUserInUsers(user)) {
      //Anmelden
      res.cookie("session", data.tempUser.id, { maxAge: 300000 });
      res.statusCode = 200;
    } else {
      //Registrieren
      user.id = uuidv4();
      user.checkbox = [false, false];
      user.visitCounter = [[], []];
      data.tempUser = user;
      data.users.push(user);
      res.cookie("session", user.id, { maxAge: 300000 });
      res.statusCode = 201;
    }
  }
  res.redirect("/");
  next();
  //res.send();
  //console.log(users); //Testzwecken drin, um Array Users Content zu überprüfen
  //console.log(users.length);
});

/*router.post("/css", (req, res) => {
  if (data.tempUser === undefined) {
    data.tempUser = 0;
  } else {
    data.tempUser++;
  }
  res.redirect("/");
  res.send();
});*/

function findUserInUsers(user) {
  const userFounded = data.users.find((listenElement) => {
    return listenElement.username === user.username && listenElement.password === user.password;
  });
  //console.log(userFounded); // Test

  if (userFounded !== undefined) {
    data.tempUser = userFounded;
    return true;
  }
  return false;
}

module.exports = router;
