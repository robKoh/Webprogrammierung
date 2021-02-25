const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

// App
app.use("/index.html", express.static("src"));
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(bodyParser.json());

const users = [];

app.post('/login', (req, res) => {
  const user = req.body;

  //Anmelden und Registrieren
  if (user.username !== "" && user.password !== "") {
    const userFounded = findUserinUsers(user);
    console.log(userFounded); // Test

    if (userFounded !== undefined) {
      //Anmelden
      res.cookie("session", userFounded.id, {maxAge: 300000});
      //res.redirect("/comment.html");
      res.statusCode = 200;
      res.send();
    } else {
      //Registrieren
      user.id = uuidv4();
      users.push(user);
      res.cookie("session", user.id, {maxAge: 300000});
   //   res.redirect("/comment.html");
      res.statusCode = 201;
      res.send();
    }
  } else {
    res.redirect("/");
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

app.use("/comment.html", express.static("src"));

function findUserinUsers(user) {
  const userFounded = users.find((listenElement) => {
    return listenElement.id === user.id;
  });
}

// funktioniert noch nicht!
app.get("/displayUser", (req, res) => {
  if (req.body) {
    res.send([req.body.username]);
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