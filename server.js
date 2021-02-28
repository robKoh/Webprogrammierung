const express = require('express');
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

// App
//app.use("/index.html", express.static("src"));
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cookieParser());
app.use(express.static("src"));
app.use(express.json()); //Used to parse JSON bodies, newer than bodyParser Library

const users = [];
const commentSection = [[],[]]
var tempUser;

app.post('/login', (req, res) => {
  const user = req.body;

  //Anmelden und Registrieren
  if (user.username !== "" && user.password !== "") {
    if (findUserinUsers(user)) {
      //Anmelden
      res.cookie("session", tempUser.id, {maxAge: 300000});
      res.redirect("/comment.html");
      res.statusCode = 200;
      res.send();
    } else {
      //Registrieren
      user.id = uuidv4();
      user.checkbox = [false, false] 
      tempUser = user;
      users.push(user);
      res.cookie("session", user.id, {maxAge: 300000});
      res.redirect("/comment.html");
      res.statusCode = 201;
      res.send();
    }
  } else {
    res.redirect("/index.html");
    res.send();
  }
  //console.log(users); //Testzwecken drin, um Array Users Content zu überprüfen
  //console.log(users.length);
});

app.post('/checkbox', (req, res) => {
  const checkbox = req.body;

  if (checkbox.checkbox[1] !== undefined) {
    tempUser.checkbox[parseInt(checkbox.checkbox[0].charAt(0))] = true
  } else {
    tempUser.checkbox[parseInt(checkbox.checkbox[0].charAt(0))] = false
  }
});


app.post('/comment', (req, res) => {
  const form_field = req.body;
  if (form_field.hasOwnProperty("commentfield0")) {
    commentSection[0].push(form_field.commentfield0)
  }
  else {
    commentSection[1].push(form_field.commentfield1)
  }
});

app.use((req, res, next) => {
  if (req.cookies.session !== undefined) {
    next();
  } else {
    res.redirect("/index.html");
    res.send();
  }
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