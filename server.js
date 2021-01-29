'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use('/', express.static(__dirname + '/source'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/source/Grid_Flex.html');
});

app.get('/source/Main.html', (req, res) => {
  res.sendFile(__dirname + '/source/Main.html');
});

app.get('/source/Example.html', (req, res) => {
  res.sendFile(__dirname + '/source/Example.html');
});

app.get('/source/Style.css', (req, res) => {
  res.sendFile(__dirname + '/source/Style.css');
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);