import { useState } from "react";
import Square from "./Square";

// function to calculate who wins by defining all winning combinations
const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // iterate through each winning line to check for a winner
  for (let i = 0; i < lines.length; i++) {
    // extract indices of squares for the current winning line
    const [a, b, c] = lines[i];
    // check if all three squares in the winning line are occupied by the same symbol
    // and the squares are not empty
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return winning symbol
      return squares[a];
    }
  }
  return null;
};

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));

  const handleClick = (i: number) => {
    // check if the square is taken
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // otherwise put X or O every other time its clicked
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  // function to check for a tie
  const isTie =
    squares.every((square) => square !== "") && !calculateWinner(squares);

  // text showing who is up next or who won
  let message;
  if (isTie) {
    message = "It's a tie!";
  } else {
    const winner = calculateWinner(squares);
    if (winner) {
      message = "The winner is " + winner + "!";
    } else {
      message = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  // function to handle restart
  const handleRestart: React.MouseEventHandler<HTMLButtonElement> = () => {
    // reset the squares to an array filled with empty strings
    setSquares(Array(9).fill(""));
    // reset to ensure the first player to move will be "X"
    setXIsNext(true);
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} handleClick={() => handleClick(0)} />
          <Square value={squares[1]} handleClick={() => handleClick(1)} />
          <Square value={squares[2]} handleClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} handleClick={() => handleClick(3)} />
          <Square value={squares[4]} handleClick={() => handleClick(4)} />
          <Square value={squares[5]} handleClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} handleClick={() => handleClick(6)} />
          <Square value={squares[7]} handleClick={() => handleClick(7)} />
          <Square value={squares[8]} handleClick={() => handleClick(8)} />
        </div>
      </div>

      <div className="text-container">
        <p className="message">{message}</p>
        <button className="button" onClick={handleRestart}>
          Start over
        </button>
      </div>
    </>
  );
};

export default Board;
