const express = require("express");
const router = express.Router();
const data = require("../datastorage");

const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

var lastVisitedPage = undefined;

// App
//app.use("/index.html", express.static("src"));
router.use(express.urlencoded()); //Parse URL-encoded bodies
router.use(cookieParser());
router.use(express.static("src"));
router.use(express.json()); //Used to parse JSON bodies, newer than bodyParser Library

router.get("/login", (req, res) => {
  res.statusCode = 200;
  var usr = data.tempUser;
  res.json({ usr });
});

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
      user.ownComments = [[], []];
      user.visitedPage = new Map();
      data.tempUser = user;
      data.users.push(user);
      res.cookie("session", user.id, { maxAge: 300000 });
      res.statusCode = 201;
    }
  }
  res.redirect("/");
  next();
});

router.post("/html", (req, res) => {
  incrementVisitedPage("template.html");
  res.redirect("/template.html");
  res.send();
});

router.post("/css", (req, res) => {
  incrementVisitedPage("css.html");
  res.redirect("/css.html");
  res.send();
});

router.post("/javascript", (req, res) => {
  incrementVisitedPage("javascript.html");
  res.redirect("/javascript.html");
  res.send();
});

router.post("/show-comment", (req, res) => {
  incrementVisitedPage("comment.html");
  res.redirect("/comment.html");
  res.send();
});

router.get("/show-most-visited-page", (req, res) => {
  var hideMostVisitedPageBut = data.tempUser === undefined || data.tempUser.visitedPage.size === 0;
  res.json({ hideMostVisitedPageBut });
});

router.post("/show-most-visited-page", (req, res) => {
  var max = undefined;
  var mostVisited = undefined;
  data.tempUser.visitedPage.forEach((value, key) => {
    if (max === undefined || value > max) {
      max = value;
      mostVisited = key;
    }
  });
  lastVisitedPage = mostVisited;
  res.redirect("/" + mostVisited);
  res.send();
});

function incrementVisitedPage(page) {
  if (data.tempUser !== undefined) {
    if (page !== lastVisitedPage) {
      lastVisitedPage = page;
      var tmp = data.tempUser.visitedPage.get(page);
      if (tmp === undefined) {
        data.tempUser.visitedPage.set(page, 1);
      } else {
        data.tempUser.visitedPage.set(page, tmp + 1);
      }
    }
  }
}

router.get("/comment", (req, res) => {
  res.statusCode = 200;
  var usr = data.tempUser;
  var cmt = data.commentSection;
  res.json({ usr, cmt });
});

router.post("/comment", (req, res) => {
  if (data.tempUser === undefined) {
    res.statusCode = 200;
  } else {
    const form_field = req.body;

    if (form_field.hasOwnProperty("commentfield0")) {
      data.tempUser.ownComments[0].push(data.commentSection[0].length);
      data.commentSection[0].push(form_field.commentfield0);
    } else {
      data.tempUser.ownComments[1].push(data.commentSection[1].length);
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
  lastVisitedPage = undefined;
  res.redirect("/");
  res.send();
});

module.exports = router;
