
const socket = io('http://localhost:3000');
const form  = document.querySelector('form');

form.addEventListener('submit', event => {
	event.preventDefault();
	let formData = new FormData(form);
	let msg = formData.get('msg');
	console.log(msg);
	form.reset();
});




socket.on('somthing',data => {

	console.log(data.data);

});


