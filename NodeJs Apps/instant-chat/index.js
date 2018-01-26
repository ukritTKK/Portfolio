var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3008;

app.get('/', function(req, res){
		res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('## user joined the chat');

	socket.on('disconnect', function(){
		console.log('## user disconnected');
	});

	socket.on('chatMsg', function(msg){
		io.emit('chatMsg', msg);
		console.log('> user message: ' + msg);
	});
});

http.listen(port, function(){
	console.log('listening on port ' + port);
});