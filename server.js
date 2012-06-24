var express = require('express');
var socketio = require('socket.io');
var fs = require('fs');

var app = express.createServer();
app.listen(8000);

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

var io = socketio.listen(app);
io.sockets.on('connection', function(socket) {
    console.log('Connection made.');
    socket.emit('print', {msg: 'Hello waffles!'});
});

