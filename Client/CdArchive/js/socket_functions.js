// Connect to the server using socket.io
const socket = io("http://localhost:3000");
console.log(socket)

// Listen for incoming messages from the server


socket.on('message', (data) => {
    //Add the message to the chat log
    const chatLog = document.getElementById('log-div');
    const newMessage = document.createElement('input');
    newMessage.value = data;

    chatLog.appendChild(newMessage);

    const sectionInput = document.getElementById("section-input")
    sectionInput.value = data
});

socket.on('message_2', (data) => {
    //Add the message to the chat log
    const chatLog = document.getElementById('log-div');
    const newMessage = document.createElement('input');
    newMessage.value = data;

    chatLog.appendChild(newMessage);

    const barCodeInput = document.getElementById("bar-code-input")
    barCodeInput.value = data
});

socket.on('message_x', (data) => {
    //Add the message to the chat log
    const chatLog = document.getElementById('log-div');
    const newMessage = document.createElement('input');
    newMessage.value = data;

    // chatLog.appendChild(newMessage);

    const xInput = document.getElementById("x-input")
    xInput.value = data
});

socket.on('message_y', (data) => {
    // Add the message to the chat log
    // const chatLog = document.getElementById('log-div');
    // const newMessage = document.createElement('input');
    // newMessage.value = data;

    // chatLog.appendChild(newMessage);

    const yInput = document.getElementById("y-input")
    yInput.value = data
});

window.addEventListener('load', () => {
    const form = document.getElementById('message-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value;
        socket.emit('message', message);
        messageInput.value = '';
    });
})
 // Handle form submission to send messages