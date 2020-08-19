
const form  = document.querySelector('form');
const messageBlock = document.querySelector('.MessagesBlock');

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
		if(msg.trim() !== "" ){
			socket.emit("send-message",{ name , msg});
			
			let divTag = document.createElement('div');
			let nameTag = document.createElement('h6');
			let messageTag = document.createElement('p');
			
			divTag.setAttribute('class',"Message bg-light");

			nameTag.textContent = "You";
			messageTag.textContent = msg;
			divTag.appendChild(nameTag);
			divTag.appendChild(messageTag);
			messageBlock.appendChild(divTag);
		
			form.reset();
		}
	});

	socket.on('join', name => {
		console.log(`${name} joined`);
		let divTag = document.createElement('div');
		let smallTag = document.createElement('small');
		smallTag.textContent = `${name} joined`;
		divTag.setAttribute('class' , 'join  text-success');

		divTag.appendChild(smallTag);
		messageBlock.appendChild(divTag);

	});

	socket.on('new-message', data => {
		console.log(`${data.name} : ${data.msg}`);
		let divTag = document.createElement('div');
		let nameTag = document.createElement('h6');
		let messageTag = document.createElement('p');

		divTag.setAttribute('class',"Message bg-light");
		
		nameTag.textContent = data.name;
		messageTag.textContent = data.msg;
		divTag.appendChild(nameTag);
		divTag.appendChild(messageTag);
		messageBlock.appendChild(divTag);
	});

	socket.on('left',who => {
		let divTag = document.createElement('div');
		let smallTag = document.createElement('small');
		smallTag.textContent = `${who} left`;
		divTag.setAttribute('class' , 'disconnect text-danger');

		divTag.appendChild(smallTag);
		messageBlock.appendChild(divTag);


		console.log(`${who} lefted`);
	});

	socket.on('somthing', data => {
	
		console.log(data);

	});

}
