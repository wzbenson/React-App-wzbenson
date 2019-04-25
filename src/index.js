import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button className="square"
        onClick={() => this.props.onClick()} >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      turn: 'X',
      won: null
    }
  }

  windir(who, dir) {
    let n = 0
    for (let i = 0; i < 3; ++i) {
      let r = dir.r0 + i * dir.dr;
      let c = dir.c0 + i * dir.dc;
      let rc = this.state.squares[3 * r + c];
      if (rc == who) {
        console.log("r=" + r + "c=" + c + " is mine");
        ++n;
      }
      console.log("r=" + r + "c=" + c + " is " + rc);
    }
    return n == 3;
  }

  win(player) {
    for (let row = 0; row < 3; ++row) {
      console.log("check row " + row);
      if (this.windir(player, { r0: row, dr: 0, c0: 0, dc: 1 })) {
        return true; // row
      }
    }
    for (let col = 0; col < 3; ++col) {
      console.log("check col " + col);
      if (this.windir(player, { r0: 0, dr: 1, c0: col, dc: 0 })) {
        return true; // column
      }
    }
    console.log("check diagonal");
    if (this.windir(player, { r0: 0, dr: 1, c0: 0, dc: 1 })) {
      return true; // diagonal
    }

    console.log("check off diagonal");
    if (this.windir(player, { r0: 0, dr: 1, c0: 2, dc: -1 })) {
      return true; // off diagonal
    }
    return false;
  }

  getSquare(i) {
    return this.state.squares[i];
  }

  setSquare(i, value) {
    let squares = this.state.squares.slice();
    squares[i] = value;
    this.setState({ 'squares': squares });
    console.log('setSquare(' + i + ',' + value + ') new squares: ' + squares);
  }
  changeTurn() {
    let turn = this.state.turn;
    if (turn == 'X') {
      turn = 'O';
    } else {
      turn = 'X';
    }
    console.log('new turn: ' + turn);
    this.setState({ 'turn': turn });
  }

  handelClick(i) {
    if (this.state.win == null && this.getSquare(i) == null) {
      this.setSquare(i, this.state.turn);
      this.changeTurn();
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]}
      onClick={() => this.handelClick(i)} />;
  }

  render() {
    let status;
    let win = this.state.win;
    if (win == null) {
      if (this.win('X')) {
        win = 'X';
      } else if (this.win('O')) {
        win = 'O';
      }
    }
    if (win != this.state.win) {
      this.setState({'win': win});
    }
    if (win == 'X') {
      status = 'X won!';
    } else if (win == 'O') {
      status = 'O won!';
    } else {
      status = 'Next player: ' + this.state.turn;
    }
    return (
      <div>
        <div className="status">{status}</div>
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
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
