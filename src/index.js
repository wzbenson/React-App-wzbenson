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
      squares : Array(9).fill(null),
      turn : 'X'
    }
  }

  cloneState() {
    return {
      squares: this.squares,
      turn: this.turn
    }
  }

  getSquare(i) {
    return this.state.squares[i];
  }

  setSquare(i,value) {
    let state = this.cloneState();
    state.squares[i]=value;
    this.setState(state);
  }

  get squares() {
    return this.state.squares.slice();
  }
  get turn() {
    return this.state.turn;
  }
  set turn(value) {
    let state = this.cloneState();
    state.turn = value;
    this.setState(state);
  }
  changeTurn() {
    if (this.turn == 'X') {
      this.turn = 'O';
    } else {
      this.turn = 'X';
    }
  }
  handelClick(i) {
    console.log("click " + i + " square = " + this.getSquare(i));
    if (this.getSquare(i) == null) {
      this.setSquare(i,this.turn);
      this.changeTurn();
      console.log("now player " + this.turn);
    }
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} 
                   onClick={()=>this.handelClick(i)} />;
  }

  render() {
    const status = 'Next player R1: X';

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
