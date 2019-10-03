const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const analyzer = require('./services/toneAnalyzer');

let messagesToAnalyze = [];

const sendMessagesToAnalysis = (msgs) => {
  return analyzer.analyze(msgs.join('\n'));
}

app.get('/', function(req, res){
  res.send('<h1>Felipe Megale, Guilherme Galvão, João Castro</h1>');
});

// receives connection and broadcast when a new chat message is called from client
io.on('connection', function(socket){
    socket.on('chat message', async function (msg) {
        
        io.emit('chat message', msg);
        messagesToAnalyze.push(msg.msg);

          // TODO - Configurar para retornar mood: ANGRY
        if (messagesToAnalyze.length % 5 == 0) {
          let analysis = await sendMessagesToAnalysis(messagesToAnalyze);
          io.emit('tone analysis', analysis);
        }
    });
  });
  

http.listen(3001, function(){
  console.log('listening on *:3001');
});
