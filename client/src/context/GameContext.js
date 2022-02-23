import { createContext, useContext, useReducer, useState } from 'react';

const GameContext = createContext({});

export default function useGameContext () {
    return useContext(GameContext);
}

const gameSteps = {
    NOT_READY: 'NOT_READY',
    READY: 'READY',
    X_PLAYERS_TURN: 'X_PLAYERS_TURN',
    O_PLAYERS_TURN: 'O_PLAYERS_TURN',
    FINISHED: 'FINISHED',
}

const actionTypes = {
    GAME_READY: 'GAME_READY',
    GAME_STARTED: 'GAME_STARTED',
    X_PLAYER_PLAYED: 'X_PLAYER_PLAYED',
    O_PLAYER_PLAYED: 'O_PLAYER_PLAYED',
}

const initialState = {
    gameState: gameSteps.X_PLAYERS_TURN,
    board: Array.from({length: 3}, () => Array.from({length: 3}, () => {
        return null;
    })),
}

function updateBoard(board, payload) {
    const updatedBoard = [...board];
    board[payload.row][payload.column] = payload.value;
    return updatedBoard;
}

function checkIfWon(board, payload) {
    if (checkIf3MarksThroughCenter(board, payload)) {
        return true;
    }

    const has3MarksThroughRow = board[payload.row][0] === payload.value && board[payload.row][1] === payload.value && board[payload.row][2] === payload.value;
    const has3MarksThroughColumn = board[0][payload.column] === payload.value && board[1][payload.column] === payload.value && board[2][payload.column] === payload.value;

    return has3MarksThroughRow || has3MarksThroughColumn;
}

function checkIf3MarksThroughCenter(board, payload) {
    // left diagonal
    if (board[0][0] === payload.value && board[2][2] === payload.value) {
        return true;
    }
    // right diagonal
    if (board[2][0] === payload.value && board[0][2] === payload.value) {
        return true;
    }
    // through the middle row
    if (board[1][0] === payload.value && board[1][2] === payload.value) {
        return true;
    }
    // through the middle column
    if (board[0][1] === payload.value && board[2][1] === payload.value) {
        return true;
    }

    return false;
}

function reducer(state, action) {
    switch(action.type) {
        case actionTypes.GAME_READY: 
            return {
                ...state,
                gameState: gameSteps.GAME_READY,
            }
        case actionTypes.GAME_STARTED:
            return {
                ...state,
                gameState: gameSteps.X_PLAYERS_TURN,
            }
        case actionTypes.PLAYER_PLAYED:
            const nextPlayer = action.payload.player === 'X' ? 'O' : 'X'; 
            const updatedBoard = updateBoard(state.board, action.payload);
            const hasWon = checkIfWon(updatedBoard, action.payload);
            return {
                ...state,
                board: updatedBoard,
                gameState: hasWon ? gameSteps.FINISHED : gameSteps[`${nextPlayer}_PLAYERS_TURN`],
            }
    }
}

export function GameContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [currentPlayer, setCurrentPlayer] = useState();

    function play({row, column}) {
        dispatch({
            type: actionTypes.PLAYER_PLAYED,
            payload: {
                value: currentPlayer,
                player: currentPlayer,
                row,
                column,
            }
        })
    }

    function opponentPlay({row, column}) {
        dispatch({
            type: actionTypes.PLAYER_PLAYED,
            payload: {
                value: currentPlayer === 'X' ? 'O' : 'X',
                player: currentPlayer === 'X' ? 'O' : 'X',
                row,
                column,
            }
        });
    }

    const value = {
        currentPlayer,
        state,
        dispatch,
        opponentPlay,
        play,
        setCurrentPlayer,
    };

    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
}
