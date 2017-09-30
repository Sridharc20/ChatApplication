var express= require('express');

//sockets
var socket=require('socket.io')

//App setup
var app = express();

//server
var server = app.listen(4000,function() {
console.log("Listening on request on 4000 port");
});

//server static files
app.use(express.static('public'));

//socket set up

var io = socket(server);

io.on('connection', function(socket) {
  console.log("made socket connection",socket.id);

//listen to the emitted client

socket.on('chat',function(data) {
    //send it to all the connected sockets
  io.sockets.emit('chat',data);
  });

//brodcast
socket.on('typing',function(user){
    socket.broadcast.emit('typing',user);
});

});
