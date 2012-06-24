define(function(require) {
    var socket = io.connect('http://localhost:8000');
    socket.on('print', function(data) {
        document.getElementById('msg').innerHTML = data.msg;
    });
});