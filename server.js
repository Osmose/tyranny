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
        console.log('Connection from ' + socket.handshake.address.address);
        emituserlist();

        // The client is logging in
        socket.on('login', function(data) {
            console.log('Login from: ' + data.username);
            

            // If passwords match then
            if (true) {
                socket.emit('login_success', {username: data.username});
            } else {
                socket.emit('login_failure', {message: "Invalid username/password"});
            }

            users[data.username] = {ipaddress: socket.handshake.address.address,
                                    s: socket};
            console.log(users);
            // Send an updated userlist to everyone
            var userlist = {};
            for (user in users) {
                userlist[user] = {username: user};
            }
            socket.broadcast.emit('userlistchanged', userlist);
            socket.emit('userlistchanged', userlist)
        });

        // The client disconnected(Remove them from the list of active users)
        socket.on('disconnect', function(data) {
           console.log('client disconnected');
           for(username in users) {
               if (users[username].s.id == socket.id) {
                   console.log('    ' + username + ' disconnected');
                   delete users[username];
               }
           }
           console.log(users);
           // Send an updated userlist to everyone
           var userlist = {};
           for (user in users) {
               userlist[user] = {username: user};
           }
           socket.broadcast.emit('userlistchanged', userlist);
        });

        // The client wants the list of users
        socket.on('getusers', emituserlist);

        // Sends the list of online users to the client
        function emituserlist() {
            var userlist = {};
            for (user in users) {
                userlist[user] = {username: user};
            }
            socket.emit('userlistchanged', userlist);
        };
    });
});
