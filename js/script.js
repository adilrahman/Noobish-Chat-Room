
const form  = document.querySelector('form');

const name = prompt("Enter you name : ");

if(name !== null && name !== "")
{

	const socket = io('http://localhost:3000');
	socket.emit('new-User', name);

form.addEventListener('submit', event => {
	event.preventDefault();
	let formData = new FormData(form);
	let msg = formData.get('msg');
	console.log(`You : ${msg}`);
	socket.emit("send-message",{ name , msg});
	form.reset();
});

socket.on('join', name => {
	console.log(`${name} joined`);
});

socket.on('new-message', data => {
	console.log(`${data.name} : ${data.msg}`);
});

socket.on('left',who => {
	console.log(`${who} lefted`);
});

socket.on('somthing', data => {

	console.log(data);

});

}
