import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useGameContext from './GameContext';

const RoomContext = createContext({});

export default function useRoomContext () {
    return useContext(RoomContext);
}

const API = 'http://localhost:4000';

export function RoomContextProvider({children}) {
    const [roomName, setRoomName] = useState('');
    const [socket, setSocket] = useState({});
    const {currentPlayer, opponentPlay, setCurrentPlayer} = useGameContext();

    function connect() {
        const resp = io.connect(API);
        setSocket(resp);
    }
    useEffect(() => {
        if (!socket.on) {
            return;
        }
        socket.on('created', function() {
            setCurrentPlayer('X');
        });
        socket.on('joined', function() {
            if (!currentPlayer) {
                setCurrentPlayer('O');
            }
        });
        socket.on('played', function(data) {
            opponentPlay({column: data.column, row: data.row});
        })
    }, [socket, currentPlayer]);

    useEffect(() => {
        connect();
    }, []);

    function createARoom() {
        socket.emit('join', roomName);
    }

    function emitPlay(payload) {
        socket.emit('played', {...payload, roomName});
    }

    const value = {
        socket,
        roomName,
        emitPlay,
        createARoom,
        setRoomName,
    };

    return (
        <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
    );
}
