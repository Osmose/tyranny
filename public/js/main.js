define(function(require) {
    var $ = require('jquery');
    var socket = io.connect('http://localhost:8000');
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

