
import useRoomContext from '@context/RoomContext';

function Lobby() {
    const {setRoomName, roomName, createARoom} = useRoomContext();
    return (
        <>
            <h1>Welcome to Tic-Tac-Toe</h1>
            <p>Start by creating a new room or joining some of the existing ones</p>
            <input
                type="text"
                value={roomName}
                onChange={({ target: {value} }) => setRoomName(value)}
            />
            <button onClick={createARoom}>Create a room</button>
        </>
    );
}

export default Lobby;
