define(function(require) {
    var $ = require('jquery');
    var socket = io.connect();

    // Hide a few things for logged-out users
    $('#userinfo').hide();

    // Update the userlist when it changes
    socket.on('userlistchanged', function(data) {
        console.log('Updating userlist:');
        console.log(data);
        var userlist = $('#userlist');
        userlist.empty();
        for(user in data) {
            userlist.append('<li>'+user+'</li>');
        }
    });

    
    // Setup the login form for submission
    $('#loginform').on('submit', function(e){
        e.preventDefault();
        console.log('loginsubmitted');
        socket.emit('login', {username: $('#username').val()});
        return false;
    });
    // Handle successful login
    socket.on('login_success', function(data) {
        console.log("Login Successful!");
        $('#loginform').hide();
        $('#userinfo').show();
        $('#user').text(data.username);
    });
    socket.on('login_failure', function(data) {
        console.log('Login failure');
        $('#loginmsg').text(data.message);
    });
});

