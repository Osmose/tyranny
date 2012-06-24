define(function(require) {
    var $ = require('jquery');
    var socket = io.connect('http://localhost:8000');

    socket.on('userlistchanged', function(data) {
        console.log('Updating userlist: ' + data);
        var userlist = $('#userlist');
        userlist.empty();
        for(user in data) {
            userlist.append('<li>'+user+'</li>');
        }
    });
    socket.on('print', function(data) {
        $('#msg').text(data.msg);
    });

    $('#loginform').on('submit', function(e){
        e.preventDefault();
        console.log('loginsubmitted');
        socket.emit('login', {username: $('#username').val()});
        return false;
    });
});

