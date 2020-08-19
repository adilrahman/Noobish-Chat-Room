
const io = require('socket.io')(3000);

io.on('connection', socket => {
	console.log("Connnected");
	socket.emit('somthing',{data : "nothing"});

	socket.on('disconnect',() => {
		console.log("Disconnected");
	});
});

