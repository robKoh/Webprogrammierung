const express = require("express");
const app = express();
const PORT = 8080;
const index = require("./src/index");

app.use(index);
app.use(express.static("src"));

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});
