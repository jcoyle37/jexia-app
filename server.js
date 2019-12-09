var express = require('express');
var app = express();
const port = 3002;
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.post('/post', function(req, res) {
    console.log('incoming POST');
    io.emit('req', {
        data: req.body,
        headers: req.headers
    });
    res.status(200).send("Successfully posted");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/js/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname+'/js/socket.io.js'));
});

// listen for requests
var listener = http.listen(port, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});