import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, world!');
});
const sockio = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080"
    }
})

// Initialize socket.io and listen for incoming connections
sockio.on('connection', (socket) => {
    console.log('A robot connected');

    // Listen for incoming messages from clients
    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);

        // Broadcast the message to all connected clients
        sockio.emit('message', data);
    });
    socket.on('message_2', (data) => {
        console.log(`Received message: ${data}`);

        // Broadcast the message to all connected clients
        sockio.emit('message_2', data);
    });
    socket.on('message_x', (data) => {
        console.log(`Received message: ${data}`);

        // Broadcast the message to all connected clients
        sockio.emit('message_x', data);
    });
    socket.on('message_y', (data) => {
        console.log(`Received message: ${data}`);

        // Broadcast the message to all connected clients
        sockio.emit('message_y', data);
    });
    socket.on('table', (data) => {
        console.log(`Received message: ${data}`);

        // Broadcast the message to all connected clients
        sockio.emit('table', data);
    });
});

// Start the server
httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
});