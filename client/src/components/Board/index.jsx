import useGameContext from '@context/GameContext';
import useRoomContext from '@context/RoomContext';
import styles from './styles.module.scss';

function Board() {
    const {state: {board, gameState}, play, currentPlayer} = useGameContext();
    const {emitPlay} = useRoomContext();

    function handlePlay(payload) {
        play(payload);
        emitPlay(payload);
    }

    if (gameState === 'FINISHED') {
        return <div>finished</div>
    }

    return (
        <div>
            {board.map((row, i) => (
                <div className={styles.boardRow}>
                    {row.map((_, j) => (
                        <div className={styles.boardItem} onClick={() => `${currentPlayer}_PLAYERS_TURN` === gameState && handlePlay({row: i, column: j})}>
                            {board[i][j]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
