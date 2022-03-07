import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  constructor(props) {
    // JavaScript のクラスでは、サブクラスのコンストラクタを定義する際は常に super を呼ぶ必要がある
    super(props);
    // コンストラクタで this.state を設定することで、状態を持つことができるようになる
    // 現在の Square の状態を this.state に保存する
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      // <button className="square" onClick={()=>console.log('click')}>
      // setState()…state が更新されると、コンポーネントはそれに再レンダーで応じる
    //   クリックしたら、this.stateのvalueの値が更新される
      <button className="square" onClick={() => this.setState({ value: "X" })}>
        {/* 親コンポーネントBoardから渡された値を表示する */}
        {/* {this.props.value} */}
        {/* this.stateのvalueの値を表示する */}
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = "Next player: X";

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

ReactDOM.render(<Game />, document.getElementById("root"));
