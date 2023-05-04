// Connect to the server using socket.io
const socket = io("http://localhost:3000");
console.log(socket)
window.$ = window.jQuery = require('jquery');
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + time;

class Node_2 {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

class DoublyLinkedList {
    constructor(value) {
        this.head = {
            value: value,
            next: null,
            previous: null
        };
        this.length = 1;
        this.tail = this.head;
    }

    printList() {
        let array = [];
        let currentList = this.head;
        while (currentList !== null) {
            array.push(currentList.value);
            currentList = currentList.next;
        }

        array.join(' <--> ');
        return this;
    }

    // Insert node at end of the list
    append(value) {
        let newNode = new Node_2(value);

        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;

        this.length++;
        this.printList();
    }

    // Insert node at the start of the list
    prepend(value) {
        let newNode = new Node_2(value);

        newNode.next = this.head;
        this.head.previous = newNode;
        this.head = newNode;

        this.length++;
        this.printList();
    }

    // Insert node at a given index
    insert(index, value) {
        if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
            console.log(`Invalid index. Current length is ${this.length}.`);
            return this;
        }

        // If index is 0, prepend
        if (index === 0) {
            this.prepend(value);
            return this;
        }

        // If index is equal to this.length, append
        if (index === this.length) {
            this.append(value);
            return this;
        }

        // Reach the node at that index
        let newNode = new Node_2(value);
        let previousNode = this.head;

        for (let k = 0; k < index - 1; k++) {
            previousNode = previousNode.next;
        }

        let nextNode = previousNode.next;

        newNode.next = nextNode;
        previousNode.next = newNode;
        newNode.previous = previousNode;
        nextNode.previous = newNode;

        this.length++;
        this.printList();
    }

    // Remove a node
    remove(index) {
        if (!Number.isInteger(index) || index < 0 || index > this.length) {
            console.log(`Invalid index. Current length is ${this.length}.`);
            return this;
        }

        // Remove head
        if (index === 0) {
            this.head = this.head.next;
            this.head.previous = null;

            this.length--;
            this.printList();
            return this;
        }

        // Remove tail
        if (index === this.length - 1) {
            this.tail = this.tail.previous;
            this.tail.next = null;

            this.length--;
            this.printList();
            return this;
        }

        // Remove node at an index
        let previousNode = this.head;

        for (let k = 0; k < index - 1; k++) {
            previousNode = previousNode.next;
        }
        let deleteNode = previousNode.next;
        let nextNode = deleteNode.next;

        previousNode.next = nextNode;
        nextNode.previous = previousNode;

        this.length--;
        this.printList();
        return this;
    }
}

// Listen for incoming messages from the server
socket.on('message', (section_data) => {
    //Add the message to the chat log
    var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
    var chatLog = document.getElementById('log-div');
    chatLog.innerHTML = newMessage
    const sectionInput = document.getElementById('pro-log-input')
    sectionInput.value = section_data;
    chatLog.appendChild(sectionInput);
    console.log(section_data)

    socket.on('message_2', (barcode_data) => {
        //Add the message to the chat log
        const chatLog = document.getElementById('log-div');
        const newMessage = document.createElement('input');
        newMessage.value = barcode_data;
        chatLog.appendChild(newMessage);
        const barCodeInput = document.getElementById("bar-code-input")
        barCodeInput.value = barcode_data
        console.log(barcode_data)

        myArray = [dateTime, section_data, barcode_data]
        var myDoublyList = new DoublyLinkedList(myArray);
        console.log(myDoublyList.printList())
        sectionInput.value = JSON.stringify(myDoublyList.printList().head.value)
    });
});



socket.on('message_x', (data) => {
    //Add the message to the chat log
    const chatLog = document.getElementById('log-div');
    const newMessage = document.createElement('input');
    newMessage.value = data;
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
        // const sectionInput = document.getElementById('title-input');
        // const message = sectionInput.value;

        // document.getElementById('').innerHTML = "";
        //get_data = `SELECT * FROM archive`;

        var source = document.getElementById('my-table');
        var destination = document.getElementById('my-table-2');
        var copy = source.cloneNode(true);
        destination.parentNode.replaceChild(copy, destination);
        console.log(destination)
    });
})
//console.log(myDoublyList.printList())