const express = require('express');
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

// App
app.use("/index.html", express.static("src"));
app.use(express.urlencoded()); //Parse URL-encoded bodies

const users = [];
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
  console.log(users); //Testzwecken drin, um Array Users Content zu überprüfen
  console.log(users.length);
});

app.use(cookieParser());

app.use((req, res, next) => {
  if (req.cookies.session !== undefined) {
    next();
  } else {
    res.redirect("/index.html");
    res.send();
  }
});

app.use(express.static("src"));

function findUserinUsers(user) {
  const userFounded = users.find((listenElement) => {
    return listenElement.username === user.username && listenElement.password == user.password;
  });
  console.log(userFounded); // Test

  if (userFounded !== undefined) {
    tempUser = userFounded;
    return true;
  } else {
    return false;
  }
}

app.use(express.json()); //Used to parse JSON bodies
// funktioniert noch nicht!
app.get("/displayUser", (req, res) => {
  let username = req.body.username;
  console.log(username);
  if (username !== undefined) {
    res.statusCode = 200;
    res.send(username);
  } else {
    res.statusCode = 401;
    res.send();
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