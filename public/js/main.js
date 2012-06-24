define(function(require) {
    var $ = require('jquery');
    var socket = io.connect();

    socket.on('userlistchanged', function(data) {
        console.log('Updating userlist:');
        console.log(data);
        var userlist = $('#userlist');
        userlist.empty();
        for(user in data) {
            userlist.append('<li>'+user+'</li>');
        }
    });

    $('#loginform').on('submit', function(e){
        e.preventDefault();
        console.log('loginsubmitted');
        socket.emit('login', {username: $('#username').val()});
        return false;
    });
});

