import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const RoomContext = createContext({});

export default function useRoomContext () {
    return useContext(RoomContext);
}

const API = 'http://localhost:4000';

export function RoomContextProvider({children}) {
    const [roomName, setRoomName] = useState('');
    const [socket, setSocket] = useState({});
    const [rooms, setRooms] = useState([]);

    function connect() {
        const resp = io.connect(API);
        setSocket(resp);
    }
    useEffect(() => {
        if (!socket.io || typeof socket.io.on !== 'function') {
            return;
        }
        socket.io.on('rooms', function(data) {
            console.log('rooms', {data})
            setRooms(data.activeRooms);
        })
    }, [socket]);

    useEffect(() => {
        connect();
    }, []);

    function createARoom() {
        socket.emit('join', roomName);
    }
    const value = {
        socket,
        roomName,
        rooms,
        createARoom,
        setRoomName,
    };

    return (
        <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
    );
}
