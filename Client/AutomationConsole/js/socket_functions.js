// Connect to the server using socket.io
const socket = io("http://localhost:3000");
console.log(socket)

// Listen for incoming messages from the server
socket.on('message', (data) => {
    // Add the message to the chat log
    //  const chatLog = document.getElementById('log-div');
    //  const newMessage = document.createElement('input');
    //  newMessage.value = data;
    // const sectionInput = document.getElementById("section-input")
    // const barCodeInput = document.getElementById("bar-code-input")

    // sectionInput.value = data
    // barCodeInput.value = data
});

window.addEventListener('load', () => {
    const form = document.getElementById('message-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const sectionInput = document.getElementById('section-input');
        const message = sectionInput.value;

        let message_obj = {
            data_1: message
        }

        socket.emit('message', JSON.stringify(message_obj));
        sectionInput.value = '';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const barCodeInput = document.getElementById('bar-code-input');
        const message_2 = barCodeInput.value;
        socket.emit('message_2', message_2);
        barCodeInput.value = '';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const xInput = document.getElementById('x-input');
        const message_x = xInput.value;

        socket.emit('message_x', message_x);
        xInput.value = '';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const yInput = document.getElementById('y-input');
        const message_y = yInput.value;
        console.log(message_y)

        socket.emit('message_y', message_y);
        yInput.value = '';
    });
})

socket.on('table', (data) => {
    //Add the message to the chat log

    // const chatLog = document.getElementById('log-div');
    // const newMessage = document.createElement('input');

    // let myDoublyList = new DoublyLinkedList("s");

    // newMessage.value = myDoublyList.append("fdfd");
    console.log(data)
});