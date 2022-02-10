const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {origin: '*'} });

io.on('connection', function(socket) {
    console.log(`User connected ${socket.id}`);

    socket.on('join', function(roomName) {
        const rooms = io.sockets.adapter.rooms;
        const room = rooms.get(roomName);
        if (!room) {
            socket.join(roomName);
            socket.emit('created');
            console.log('room created');
        } else if (room.size === 1) {
            socket.join(roomName);
            socket.emit('joined');
            console.log('room joined');
        } else {
            socket.emit('full')
            console.log('room full');
        }
    });

    socket.on('played', function(payload) {
        console.log({payload})
    });
});

function getActiveRooms(io) {
    // Convert map into 2D list:
    // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
    const arr = Array.from(io.sockets.adapter.rooms);
    // Filter rooms whose name exist in set:
    // ==> [['room1', Set(2)], ['room2', Set(2)]]
    const filtered = arr.filter(room => !room[1].has(room[0]))
    // Return only the room name: 
    // ==> ['room1', 'room2']
    const res = filtered.map(i => i[0]);
    return res;
}

httpServer.listen(4000);