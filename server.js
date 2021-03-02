const express = require('express');
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const datastorage = require("./datastorage");
const app = express();
const PORT = 8080;

// App
//app.use("/index.html", express.static("src"));
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cookieParser());
app.use(express.static("src"));
app.use(express.json()); //Used to parse JSON bodies, newer than bodyParser Library

const ENUM = { comment: 0, javas: 1}

//const users = [];
//const commentSection = [[],[]]
//var tempUser;

function fooRoute(req, res, next) {
  const newUrl = req.url;

  if (newUrl === '/login') {
    if (datastorage.tempUser.visitCounter !== undefined) {
      tempUser.visitCounter[ENUM.comment]++;
    } 
    res.send()
  } else {
    //console.log(tempUser);
    next();
  }
}

app.post('/login', (req, res, next) => {
  const user = req.body;

  //Anmelden und Registrieren
  if (user.username !== "" && user.password !== "") {
    if (findUserinUsers(user)) {
      //Anmelden
      res.cookie("session", tempUser.id, {maxAge: 300000});
      res.redirect("/comment.html");
      res.statusCode = 200;
    } else {
      //Registrieren
      user.id = uuidv4();
      user.checkbox = [false, false] 
      user.visitCounter = [[],[]]
      tempUser = user;
      users.push(user);
      res.cookie("session", user.id, {maxAge: 300000});
      res.redirect("/comment.html");
      res.statusCode = 201;
    }
  } else {
    res.redirect("/index.html");
  }
  next();
  //res.send();
  //console.log(users); //Testzwecken drin, um Array Users Content zu überprüfen
  //console.log(users.length);
});

app.post("/*", fooRoute);
//app.post("/", fooRoute);

app.use((req, res, next) => {
  if (req.cookies.session !== undefined) {
    next();
  } else {
    res.redirect("/");
    res.send();
  }
});

app.post('/checkbox', (req, res) => {
  const checkbox = req.body;

  if (checkbox.checkbox[1] !== undefined) {
    tempUser.checkbox[parseInt(checkbox.checkbox[0].charAt(0))] = true
  } else {
    tempUser.checkbox[parseInt(checkbox.checkbox[0].charAt(0))] = false
  }
  res.statusCode = 201;
  res.redirect("/comment.html");
  res.send();
});

app.post('/pageload', (req, res) => {
  //console.log(req);
  //console.log("Page loaded");
  res.send();
});

app.post('/comment', (req, res) => {
  const form_field = req.body;

  if (form_field.hasOwnProperty("commentfield0")) {
    commentSection[0].push(form_field.commentfield0)
  }
  else {
    commentSection[1].push(form_field.commentfield1)
  }
  res.statusCode = 201;
  res.redirect("/comment.html");
  res.send();
});

function findUserinUsers(user) {
  const userFounded = users.find((listenElement) => {
    return listenElement.username === user.username && listenElement.password === user.password;
  });
  //console.log(userFounded); // Test

  if (userFounded !== undefined) {
    tempUser = userFounded;
    return true;
  } else {
    return false;
  }
}

app.get("/displayUser", (req, res) => {
  if (tempUser.username !== undefined) {
    res.statusCode = 200;
    res.json({ tempUser, commentSection});
  } else {
    res.statusCode = 401;
    res.send();
  }
  //console.log(tempUser); //Testzwecken drin, um Array Users Content zu überprüfen
});

app.get("/logout", (req, res) => {
  res.clearCookie('session');
  res.redirect("/");
  res.send();
});

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});
