import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X')
    currentPlayer = 'O';

  return currentPlayer;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]); //for logging
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });

  const activePlayer = deriveActivePlayer(gameTurns);

  //get updated gameboard
  let gameBoard = [...initialGameBoard.map(arr => [...arr])]; //deep copy

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const combo of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column];
    const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column];
    const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column];

    if (firstSquareSymbol !== null && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      //win
      winner = players[firstSquareSymbol];
    }
  }

  //draw logic - no winner, 9 turns
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerChange(playerSymbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [playerSymbol]: newName
      };
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName='Player1'
            symbol='X'
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerChange}
          />
          <Player
            initialName='Player2'
            symbol='O'
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerChange}
          />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}

        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
