const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

// App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("src"));

const users = new Map();

/*app.get("/", (req, res) => {
  var i = 0;
  id = uuidv4();
  users.set(i, id);
  res.cookie("test test", {
    expire: 3600000 + Date.now(),
    httpOnly: true,
    secure: true
    
    //res.sendFile(__dirname + "/static/index.html");
    
});
});*/

app.post('/login', (req, res) => {
  const user = req.body;
  users[uuidv4()] = user;
  res.redirect("comment.html");
  res.statusCode = 201;
  res.send();
});

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});