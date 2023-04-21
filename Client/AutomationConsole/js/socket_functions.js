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
         socket.emit('message', message);
         sectionInput.value = '';
     });
     form.addEventListener('submit', (event) => {
        event.preventDefault();
        const barCodeInput = document.getElementById('bar-code-input');
        const message_2 = barCodeInput.value;
        socket.emit('message_2', message_2);
        barCodeInput.value = '';
    });
 })
 // Handle form submission to send messages