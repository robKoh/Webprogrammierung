const express = require('express');
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

// App
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", express.static(__dirname + "/src"));

var id;
const users = new Map();

app.get('/', function (req, res) {
  var i;
  for (i = 0; i < users.size; i++) {
    if (users[i] != document.cookie) {
      id = uuidv4();
      users.set(i, id);
      res.cookie(id, {expire: 3600000 + Date.now()});
    }
  }
  res.send();
});

/*app.post('/', (req, res) => {
  if ()

  const user = req.body;
  users[uuidv4()] = user;
  //res.redirect("/students/");
  res.statusCode = 201;
  res.send();

 // req.session.username = req.body.username;
 // res.redirect("/index.html");
  //res.send();
});*/

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});