const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const analyzer = require('./services/toneAnalyzer');

let messagesToAnalyze = {
    general: [],
    work: []
};
let mood = 'normal';

const sendMessagesToAnalysis = (msgs) => {
  return analyzer.analyze(msgs.join('\n'));
};

app.get('/', function(req, res){
  res.send('<h1>Felipe Megale, Guilherme Galvão, João Castro, Natália Miranda</h1>');
});

// receives connection and broadcast when a new chat message is called from client
io.on('connection', function(socket){
    socket.on('chat message', async function (msg) {
        messagesToAnalyze[msg.topic].push(msg.msg);

        if (messagesToAnalyze[msg.topic].length % 5 == 0) {
            // let mood = 'joy';
            let analysis = await sendMessagesToAnalysis(messagesToAnalyze[msg.topic]);
            let accuracy = 0.0;
            analysis.document_tone.tones.map((tone) => {
                if(tone.score > accuracy){
                    mood = tone.tone_id;
                }
            });
            console.log('Emit', JSON.stringify({mood: mood, topic: msg.topic}, null, 4));
            io.emit('tone analysis', {'mood': mood, topic: msg.topic});
            messagesToAnalyze[msg.topic] = [];
        }

        io.emit('chat message', msg);
    });
  });
  

http.listen(3001, function(){
  console.log('listening on *:3001');
});
