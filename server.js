const express = require('express');
const app = express();
const PORT = 8080;

// App

app.use(express.static('src'));

app.listen(PORT, () => {
  console.log(`This app listening at http://localhost:${PORT}`);
});