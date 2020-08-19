
const io = require('socket.io')(3000);

var UserList = {};

io.on('connection', socket => {
	socket.emit('somthing', "nothing");

	socket.on('new-User', name => {
		UserList[socket.id] = name;
		socket.broadcast.emit('join',name);
		console.log(`${name} joined`)
		console.log(UserList);
	});

	
	socket.on("send-message", data => {
		let name = data['name'];
		let msg = data['msg'];
		console.log(`${name} : ${msg}`);
		socket.broadcast.emit('new-message', data);
	});

	socket.on('disconnect',() => {
		console.log(`Disconnected ${UserList[socket.id]}`);
		socket.broadcast.emit('left',UserList[socket.id]);
		delete UserList[socket.id];
		console.log(UserList);
	});
});

