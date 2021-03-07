const express = require("express");
const router = express.Router();
const data = require("../datastorage");

router.post("/html", (req, res) => {
  console.log(data.tempUser);
  res.redirect("/");
  res.send();
});

module.exports = router;
