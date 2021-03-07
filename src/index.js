const express = require("express");
const router = express.Router();
const data = require("../datastorage");

router.post("/css", (req, res) => {
  if (data.tempUser === undefined) {
    data.tempUser = 0;
  } else {
    data.tempUser++;
  }
  res.redirect("/");
  res.send();
});

module.exports = router;
