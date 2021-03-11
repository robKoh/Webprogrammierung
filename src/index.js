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

router.get("/login", (req, res) => {
  if (data.tempUser === undefined || data.tempUser.username !== undefined) {
    res.statusCode = 200;
    var usr = data.tempUser === undefined ? undefined : data.tempUser;
    res.json({ usr });
  } else {
    res.statusCode = 401;
    res.send();
  }
});

router.post("/login", (req, res, next) => {
  const user = req.body;
  console.log(user);

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
  res.redirect("/template.html");
  next();
});

router.post("/html", (req, res) => {
  res.redirect("/template.html");
  res.send();
});

router.post("/css", (req, res) => {
  res.redirect("/css.html");
  res.send();
});

router.post("/javascript", (req, res) => {
  res.redirect("/javascript.html");
  res.send();
});

router.post("/show-comment", (req, res) => {
  res.redirect("/comment.html");
  res.send();
});

router.get("/comment", (req, res) => {
  if (data.tempUser === undefined || data.tempUser.username !== undefined) {
    res.statusCode = 200;
    var usr = data.tempUser === undefined ? undefined : data.tempUser;
    var cmt = data.commentSection;
    res.json({ usr, cmt });
  } else {
    res.statusCode = 401;
    res.send();
  }
});

router.post("/comment", (req, res) => {
  if (data.tempUser === undefined) {
    res.statusCode = 200;
  } else {
    const form_field = req.body;

    if (form_field.hasOwnProperty("commentfield0")) {
      data.commentSection[0].push(form_field.commentfield0);
    } else {
      data.commentSection[1].push(form_field.commentfield1);
    }
    res.statusCode = 201;
  }
  res.redirect("/comment.html");
  res.send();
});

router.post("/checkbox", (req, res) => {
  if (data.tempUser === undefined) {
    res.statusCode = 200;
  } else {
    const checkbox = req.body;
    if (checkbox.checkbox[1] !== undefined) {
      data.tempUser.checkbox[parseInt(checkbox.checkbox[0].charAt(0))] = true;
    } else {
      data.tempUser.checkbox[parseInt(checkbox.checkbox[0].charAt(0))] = false;
    }
    res.statusCode = 201;
  }
  res.redirect("/comment.html");
  res.send();
});

function findUserInUsers(user) {
  const userFounded = data.users.find((listenElement) => {
    return listenElement.username === user.username && listenElement.password === user.password;
  });

  if (userFounded !== undefined) {
    data.tempUser = userFounded;
    return true;
  }
  return false;
}

router.post("/logout", (req, res) => {
  res.clearCookie("session");
  data.tempUser = undefined;
  res.redirect("/");
  res.send();
});

module.exports = router;
