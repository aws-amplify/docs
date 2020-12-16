import { useState } from "react"

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function Board() {
  const [squares, setSquares] = useState(
    Array(9).fill(null)
  )
  const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? "X" : "O"
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    )
  }

  const winner = calculateWinner(squares)
  let status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O")

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null) },
  ])
  const [xIsNext, setXIsNext] = useState(true)

  const current = history[history.length - 1]
  const winner = calculateWinner(current.squares)
  let status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O")

  function handleClick(i) {
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? "X" : "O"
    setHistory(history.concat([{ squares: squares }]))
    setXIsNext(!xIsNext)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]
    }
  }
  return null
}

export { Game }
