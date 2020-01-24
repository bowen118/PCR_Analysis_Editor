import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square">
      {props.value}
    </button>
  );
}
  
// class Board extends React.Component {

//   renderSquare(i) {
//     return (
//       <Square 
//         value={this.props.squares[i]} 
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null),
//       }],
//       stepNumber: 0,
//       xIsNext: true,
//     };
//   }

//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//       history: history.concat([{
//         squares: squares,
//       }]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext,
//     });
//   }

//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0,
//     });
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);

//     const moves = history.map((step, move) => {
//       const desc = move ?
//         'Go to move #' + move :
//         'Go to game start';
//       return (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       );
//     });
    
//     let status;
//     if (winner) {
//       status = 'Winner: ' + winner;
//     } else {
//       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }

//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board 
//             squares={current.squares}
//             onClick={(i) => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

// ========================================

class Plate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.rows,
      cols: this.props.cols,
      platePattern: Array(this.props.rows).fill(null).map(() => Array(this.props.cols).fill(0).slice()),
    };
  }

  renderSquare(i) {
    return (
      <Square 
        value={i} 
      />
    );
  }

  updatePlate(r, c) {
    this.setState({
      rows: this.props.rows,
      cols: this.props.cols,
      platePattern: Array(this.props.rows).fill(null).map(() => Array(this.props.cols).fill(0).slice()),
    })
  }

  render() {
    if (this.state.rows != this.props.rows || this.state.cols != this.props.cols) {
      this.updatePlate(this.props.rows, this.props.cols);
    }
    const rows = this.state.platePattern.map((row, rowIndex) => {
      var rowStart = rowIndex * this.state.platePattern[0].length;
      var thisRow = row.map((well, colIndex) => {
        return (
          <td key={colIndex}>{this.renderSquare(rowStart + colIndex + 1)}</td>
        );
      })
      return (
        <tr key={rowIndex}>
          {thisRow}
        </tr>
      );
    });
    console.log(this.state.rows);
    console.log(this.props.rows);
    return (
      <div>
        <table>
          {rows}
        </table>
      </div>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 8,
      cols: 12,
    };
  }

  standardPlate() {
    this.setState({
      rows: 8,
      cols: 12,
    });
  }

  largePlate() {
    this.setState({
      rows: 16,
      cols: 24,
    });
  }

  renderTable(r, c) {
    return (
      <div>
        <Plate rows={this.state.rows} cols={this.state.cols} />
      </div>
    );
  } 

  render() {
    return (
      <>
      <button onClick={() => this.standardPlate()}>96-Well Plate</button>
      <button onClick={() => this.largePlate()}>384-Well Plate</button>
      {this.renderTable(this.state.rows, this.state.cols)}
      </>
    );
  }
}

ReactDOM.render(
  <Menu />,
  document.getElementById('root')
);
  
  