var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.send('<h1>Felipe Megale, Guilherme Galvão, João Castro</h1>');
});

// receives connection and broadcast when a new chat message is called from client
io.on('connection', function(socket){
    socket.on('chat message', function (msg) {
        console.log('message: ' + JSON.stringify(msg, null, 4));
        io.emit('chat message', msg);
    })
  });
  

http.listen(3001, function(){
  console.log('listening on *:3001');
});
