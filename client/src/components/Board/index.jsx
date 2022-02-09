import useRoomContext from '@context/RoomContext';
import styles from './styles.module.scss';

const BOARD_DIMENSION = 3;

function Board() {
    // const {xPlays, oPlays} = useRoomContext();
    return (
        <div>
            {Array.from({ length: BOARD_DIMENSION }, (_, row) => (
                <div className={styles.boardRow}>
                    {Array.from({ length: BOARD_DIMENSION }, (_, column) => (
                        <div className={styles.boardItem}>
                            {row}
                            {column}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
