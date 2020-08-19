
const socket = io('http://localhost:3000');

socket.on('somthing',data => {

	console.log(data.data);

});

