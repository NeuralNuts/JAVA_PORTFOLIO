// Connect to the server using socket.io
const socket = io("http://localhost:3000");
console.log(socket)

// Listen for incoming messages from the server
socket.on('message', (data) => {
});

window.addEventListener('load', () => {
    const form = document.getElementById('message-form');
    const process = document.getElementById("message-form-process") 

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

    process.addEventListener('submit', (event) => {
        event.preventDefault();

        var barCodeInput = document.getElementById("bar-code-input").value
        var sectionInput = document.getElementById("section-input").value
        var selectMenu = document.getElementById("select-process").value
        var result

        if(selectMenu === "Remove"){
            result = `REMOVE-FROM-ROBOT | Barcode: ${barCodeInput} | Section: ${sectionInput}`
        }
        else if(selectMenu === "Add"){
            result = `ADD-FROM-ROBOT | Barcode: ${barCodeInput} | Section: ${sectionInput}`
        }
        if(selectMenu === "Return"){
            result = `RETRUN-FROM-ROBOT | Barcode: ${barCodeInput} | Section: ${sectionInput}`
        }
        else if(selectMenu === "Retrieve"){
            result = `RETRIEVE-FROM-ROBOT | Barcode: ${barCodeInput} | Section: ${sectionInput}`
        }
        if(selectMenu === "Sort"){ 
            result = `SORT-FROM-ROBOT | Barcode: ${barCodeInput} | Section: ${sectionInput}`
        }

        socket.emit('message_remove', result);
    });
})

socket.on('table', (data) => {
    var barCodeInput = document.getElementById("bar-code-input")
    var sectionInput = document.getElementById("section-input")

    barCodeInput.value = data[0];
    sectionInput.value = data[1];

    bubbleSort();
    console.log(data)
});