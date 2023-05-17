// Connect to the server using socket.io
const socket = io("http://localhost:3000");
window.$ = window.jQuery = require('jquery');

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + time;
var resultsArray = [];
// Listen for incoming messages from the server
/**
 * Sockets
 * @function
 */
socket.on('message', (section_data) => {
    var createInput = document.createElement('input')
    var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
    var chatLog = document.getElementById('log-div');

    newMessage
    chatLog.innerHTML = newMessage

    let sectionInput = document.getElementById('pro-log-input')

    sectionInput.value = section_data;

    socket.on('message_2', (barcode_data) => {
        var barCodeInput = document.getElementById("bar-code-input")
        barCodeInput.value = barcode_data

        socket.on('message_x', (x_data) => {
            var chatLog = document.getElementById('log-div');
            var newMessage = document.createElement('input');
            var xInput = document.getElementById("x-input")

            newMessage.value = x_data;
            xInput.value = x_data

            socket.on('message_y', (y_data) => {
                var yInput = document.getElementById("y-input")
                var myDoublyList;

                yInput.value = y_data
                results = `Date/Time: ${dateTime} | ${section_data} | ${barcode_data} | ${x_data} | ${y_data} | ADD-FROM-ROBOT`
                myDoublyList = new DoublyLinkedList();
                resultsArray = results
                //myDoublyList.prepend(1)
                //myDoublyList.insert(2, 33)
                sectionInput.value = results//= JSON.stringify(myDoublyList.printList().head.value)
                //chatLog.appendChild(sectionInput);
                console.log(myDoublyList.printList())
                console.log(resultsArray)
                chatLog.appendChild(sectionInput);
                myDoublyList.append(resultsArray)
            });
        });
    });
});



/**
 * Getting socket messages
 * @function
 */
socket.on('message_remove', (remove_data) => {
    var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
    var chatLog = document.getElementById('log-div');

    chatLog.innerHTML = newMessage

    let sectionInput = document.getElementById('pro-log-input')

    sectionInput.value = remove_data;
    results = `Date/Time: ${dateTime} | ${remove_data}`
    myDoublyList = new DoublyLinkedList();
    resultsArray = results
    myDoublyList.append(resultsArray)
    // sectionInput.value = JSON.stringify(myDoublyList.printList().head.value)
    chatLog.appendChild(sectionInput);

});

/**
 * Gets sockets emits on window load
 * @function
 */
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
        var sectionInput = document.getElementById("section-input").value
        var barCodeInput = document.getElementById("bar-code-input").value
        var myDoublyList;

        chatLog_1.innerHTML = newMessage

        let logInput = document.getElementById('pro-log-input')

        results = `Date/Time: ${dateTime} | Section: ${sectionInput} | Barcode: ${barCodeInput} | RETURN-SORTED-CD-ARCHIVE-TABLE-TO-ROBOT`
        myDoublyList = new DoublyLinkedList();
        myDoublyList.prepend(results)
        logInput.value = results
        chatLog_1.appendChild(logInput);

        socket.emit('table', message);
    });
    form2.addEventListener('submit', (event) => {
        event.preventDefault();
        message = "retrieve cd"

        var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
        var chatLog_1 = document.getElementById('log-div');
        var sectionInput = document.getElementById("section-input").value
        var barCodeInput = document.getElementById("bar-code-input").value
        var myDoublyList;

        chatLog_1.innerHTML = newMessage

        let logInput = document.getElementById('pro-log-input')

        results = `Date/Time: ${dateTime} | Section: ${sectionInput} | Barcode: ${barCodeInput} | RETRIEVE-CD-FROM-ROBOT`
        myDoublyList = new DoublyLinkedList();
        myDoublyList.prepend(results)
        logInput.value = results
        chatLog_1.appendChild(logInput);

        socket.emit('table', message);
    });
    form3.addEventListener('submit', (event) => {
        event.preventDefault();
        message = "sort"

        var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
        var chatLog_1 = document.getElementById('log-div');
        var sectionInput = document.getElementById("section-input").value
        var barCodeInput = document.getElementById("bar-code-input").value
        var myDoublyList;

        chatLog_1.innerHTML = newMessage

        let logInput = document.getElementById('pro-log-input')

        results = `Date/Time: ${dateTime} | Section: ${sectionInput} | Barcode: ${barCodeInput} | REMOVE-CD-FROM-ROBOT`
        myDoublyList = new DoublyLinkedList();
        myDoublyList.append(results)
        logInput.value = results
        chatLog_1.appendChild(logInput);

        socket.emit('table', message);
    });
    form4.addEventListener('submit', (event) => {
        event.preventDefault();
        message = "sort"

        var newMessage = `<input style="width: 100%;" id="pro-log-input"/>`;
        var chatLog_1 = document.getElementById('log-div');
        var sectionInput = document.getElementById("section-input").value
        var barCodeInput = document.getElementById("bar-code-input").value
        var myDoublyList;

        chatLog_1.innerHTML = newMessage

        let logInput = document.getElementById('pro-log-input')

        results = `Date/Time: ${dateTime} | Section: ${sectionInput} | Barcode: ${barCodeInput} | ADD-CD-TO-ROBOT`
        myDoublyList = new DoublyLinkedList();
        myDoublyList.prepend(results)
        logInput.value = results
        logInput = chatLog_1;

        socket.emit('table', message);
    });
})

function showDoublyLinkedList(){
    var text_area = document.getElementById("area-id")
    let sectionInput = document.getElementById('pro-log-input')
    var myDoublyList = new DoublyLinkedList(resultsArray)
    text_area.innerText = JSON.stringify(myDoublyList.printList())
}