var express = require('express');
var socketio = require('socket.io');
var fs = require('fs');
var util = require('./util');

// Start by setting up the database connection.
util.connectToDB(function(db) {
    // Global list of users currently active on the server
    var users = {};

    // Load models
    var models = require('./models')(db);

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
        socket.emit('print', {msg: 'Please login above'});


        socket.on('login', function(data) {
            console.log("Login from: " + data.username);
            users[data.username] = {ipaddress: socket.handshake.address.address,
                                    s: socket};
            socket.emit('print', {msg: 'Welcome ' + data.username});
            console.log(users);
        });
        socket.on('disconnect', function(data) {
           console.log('client disconnected');
           for(username in users) {
               if (users[username].s.id == socket.id) {
                   console.log('    ' + username + ' disconnected');
                   delete users[username];
               }
           }
           console.log(users);
        });
    });
});