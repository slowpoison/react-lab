import React from 'react';
import './TicTacToe.css';

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
      );
}

export default
class TicTacToe extends React.Component {
  static Wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  initState() {
    return {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }

  gameOver() {
    return this.isWin() || this.isDraw();
  }

  isWin() {
    let s = this.state.squares;
    for (let r = 0; r < TicTacToe.Wins.length; ++r) {
      let win = TicTacToe.Wins[r];
      let play = s[win[0]];
      if (play == null)
        continue;
      if (s[win[1]] == play && s[win[2]] == play)
        return true;
    }
    return false;
  }

  isDraw() {
    let r = 0;
    let draw = true;
    while (draw && r < TicTacToe.Wins.length) {
      let win = TicTacToe.Wins[r]; 
      let s = this.state.squares;
      draw = (s[win[0]] != null && s[win[1]] != null && s[win[0]] != s[win[1]])
        || (s[win[1]] != null && s[win[2]] != null && s[win[1]] != s[win[2]])
        || (s[win[2]] != null && s[win[0]] != null && s[win[2]] != s[win[0]]);

      ++r;
    }
    return draw;
  }

  handleClick(i) {
    if (this.state.squares[i] != null || this.gameOver())
      return;

    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    return (
      <table className="tic-tac-toe">
      <tbody>
        <tr>
          <button onClick={() => this.setState(this.initState())}>
            New Game
          </button>
        </tr>
        <tr>
          <td>
            {(this.isWin() || this.isDraw())
              ? (this.isDraw()
                  ? "Draw"
                  : ("Winner " + (this.state.xIsNext ? 'O' : 'X')))
              : ((this.state.xIsNext ? 'X' : 'O') + ' to play next')}
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
              </div>
              <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
              </div>
              <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      </table>
    );
  }
}

