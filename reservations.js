// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// Enable static file path for front-end js --** How else do we do this?
app.use(express.static(path.join(__dirname, 'public')));


// Data

var tables = [];

// Functions

function sendTables(operator) {
  console.log('in send tables function')
  var reservedTables;
  var waitingTables;
  var allTables = {};
  if (tables.length < 6) {
    reservedTables = tables;
    waitingTables = { message: 'The waitlist is currently empty'}
  } else {
    reservedTables = tables.slice(0, 5);
    waitingTables = tables.slice(5, tables.length);
  }
  allTables.waiting = waitingTables;
  allTables.reserved = reservedTables;
  return JSON.stringify(allTables[operator])
}

// Routes

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'home.html'));
  console.log('accessed');
});

app.get('/tables', function (req, res) {
  res.sendFile(path.join(__dirname, 'tables.html'));
});

app.get('/new', function (req, res) {
  res.sendFile(path.join(__dirname, 'new_reservation.html'));
});

app.get('/api/:options', function (req, res) {
  var action = req.params.options;
  switch (action) {
    case 'tables':
      res.json(sendTables('reserved'));
      console.log('reserved');
      break;
    case 'waiting':
      res.json(sendTables('waiting'));
      console.log('waiting')
      break;
    case 'by_id':
      //
      break;
  }
});

app.post('/api/new', function (req, res) {
  tables.push(req.body);
  res.json(req.body);
});



// 

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});