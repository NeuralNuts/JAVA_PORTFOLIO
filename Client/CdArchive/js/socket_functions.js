// Connect to the server using socket.io
const socket = io("http://localhost:3000");
console.log(socket)
window.$ = window.jQuery = require('jquery');
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + time;

// Listen for incoming messages from the server
socket.on('message', (section_data) => {
    //Add the message to the chat log
    var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
    var chatLog = document.getElementById('log-div');
    chatLog.innerHTML = newMessage
    const sectionInput = document.getElementById('pro-log-input')
    sectionInput.value = section_data;

    socket.on('message_2', (barcode_data) => {
        //Add the message to the chat log
        const chatLog = document.getElementById('log-div');
        const barCodeInput = document.getElementById("bar-code-input")
        barCodeInput.value = barcode_data

        socket.on('message_x', (x_data) => {
            //Add the message to the chat log
            const chatLog = document.getElementById('log-div');
            const newMessage = document.createElement('input');
            newMessage.value = x_data;
            const xInput = document.getElementById("x-input")
            xInput.value = x_data

            socket.on('message_y', (y_data) => {
                const yInput = document.getElementById("y-input")
                yInput.value = y_data

                results = `Date/Time: ${dateTime} | ${section_data} | ${barcode_data} | ${x_data} | ${y_data} | ADD-FROM-ROBOT`
                var myDoublyList = new DoublyLinkedList(results);
                sectionInput.value = JSON.stringify(myDoublyList.printList().head.value)
                chatLog.appendChild(sectionInput);
            });
        });
    });
});

window.addEventListener('load', () => {
    const form = document.getElementById('message-form');
    const form2 = document.getElementById('message-form2');
    const form3 = document.getElementById('message-form3');
    const form4 = document.getElementById('message-form4');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        message = "sort"
        var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
        var chatLog_1 = document.getElementById('log-div');
        chatLog_1.innerHTML = newMessage
        const sectionInput = document.getElementById('pro-log-input')
        results = `Date/Time: ${dateTime} | RETURN-SORTED-CD-ARCHIVE-TABLE-TO-ROBOT`
        var myDoublyList = new DoublyLinkedList(results);
        sectionInput.value = JSON.stringify(myDoublyList.printList().head.value)
        chatLog_1.appendChild(sectionInput);
        socket.emit('table', message);
    });
    form2.addEventListener('submit', (event) => {
        event.preventDefault();
        var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
        var chatLog_1 = document.getElementById('log-div');
        chatLog_1.innerHTML = newMessage
        const sectionInput = document.getElementById('pro-log-input')
        results = `Date/Time: ${dateTime} RETRIEVE-CD-FROM-ROBOT`
        var myDoublyList = new DoublyLinkedList(results);
        sectionInput.value = JSON.stringify(myDoublyList.printList().head.value)
        chatLog_1.appendChild(sectionInput);
        message = "retrieve cd"
        socket.emit('table', message);
    });
    form3.addEventListener('submit', (event) => {
        event.preventDefault();
        message = "sort"
        var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
        var chatLog_1 = document.getElementById('log-div');
        chatLog_1.innerHTML = newMessage
        const sectionInput = document.getElementById('pro-log-input')
        results = `Date/Time: ${dateTime} REMOVE-CD-FROM-ROBOT`
        var myDoublyList = new DoublyLinkedList(results);
        sectionInput.value = JSON.stringify(myDoublyList.printList().head.value)
        chatLog_1.appendChild(sectionInput);
        socket.emit('table', message);
    });
    form4.addEventListener('submit', (event) => {
        event.preventDefault();
        message = "sort"
        var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
        var chatLog_1 = document.getElementById('log-div');
        chatLog_1.innerHTML = newMessage
        const sectionInput = document.getElementById('pro-log-input')
        results = `Date/Time: ${dateTime} ADD-CD-TO-ROBOT`
        var myDoublyList = new DoublyLinkedList(results);
        sectionInput.value = JSON.stringify(myDoublyList.printList().head.value)
        chatLog_1.appendChild(sectionInput);
        socket.emit('table', message);
    });
})