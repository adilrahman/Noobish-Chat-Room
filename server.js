
const io = require('socket.io')(3000);

var UserList = {};

io.on('connection', socket => {
	console.log(`Connnected  : ${socket.id} `);
	socket.emit('somthing', "nothing");
	UserList[socket.id] = "name";

	socket.broadcast.emit('join',UserList[socket.id]);
	
	socket.on("send-message", data => {
		let name = data['name'];
		let msg = data['msg'];
		console.log(`${name} : ${msg}`);
		socket.broadcast.emit('new-message', data);
	});

	socket.on('disconnect',() => {
		delete UserList[socket.id];
		console.log("Disconnected ${socket.id}");
		socket.broadcast.emit('left',socket.id);
	});
});

