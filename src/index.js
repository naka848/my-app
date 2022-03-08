import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// class Square extends React.Component
// 関数コンポーネント
function Square(props) {
    return (
        // 省略前の書き方
        // onClick={() => this.props.onClick()}
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );

    // constructor(props) {
    //     // JavaScript のクラスでは、サブクラスのコンストラクタを定義する際は常に super を呼ぶ必要がある
    //     super(props);
    //     // コンストラクタで this.state を設定することで、状態を持つことができるようになる
    //     // 現在の Square の状態を this.state に保存する
    //     this.state = {
    //         value: null,
    //     };
    // }

    // render() {
    //     return (
    //         // <button className="square" onClick={()=>console.log('click')}>
    //         // setState()…state が更新されると、コンポーネントはそれに再レンダーで応じる
    //         //   クリックしたら、this.stateのvalueの値が更新される
    //         <button 
    //             className="square" 
    //             // onClick={() => this.setState({ value: "X" })}
    //             // this.props.onClick()…Board から渡されている
    //             // → Board の handleClick(i) を呼び出す
    //             onClick={() => this.props.onClick()}
    //         >
    //             {/* 親コンポーネントBoardから渡された値を表示する */}
    //             {/* 初期値は全てNULL */}
    //             {this.props.value}
    //             {/* this.stateのvalueの値を表示する */}
    //             {/* {this.state.value} */}
    //         </button>
    //     );
    // }
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length-1];
        const squares = current.squares.slice();
        // const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // if (this.state.xIsNext === true) {
        //     squares[i] = '×';
        //     this.state.xIsNext = false;
        // } else {
        //     squares[i] = '○';
        //     this.state.xIsNext = true;
        // }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // setState()…state が更新されると、コンポーネントはそれに再レンダーで応じる
        // this.setState({this.stateのsquaresの値: メソッド内で有効な変数squares});
        // 変更を反映する！
        this.setState({
            // squares: squares,
            history: history.concat([{
                squares:squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
        // console.log(squares);
        // console.log(this.state.squares);
    }

    renderSquare(i) {
        // console.log(this.state.squares[i]);
        // return <Square />;
        // return <Square value={i} />;
        // squares[]は要素が9個の配列であり、初期値にはすべてNULLが格納されている
        // return <Square value={this.state.squares[i]} />;
        return (
            <Square
                // value={this.state.squares[i]}
                value={this.props.squares[i]}
                // onClick={() => this.handleClick(i)}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner:' + winner;
        // } else {
        //     // ？なぜ（）で囲む？
        //     // →三項演算子、文字列はtrueとみなしてしまうので、（）がないと"Next player: "も条件式の一部とみなされてしまいそう
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }

        return (
            <div>
                {/* <div className="status">{status}</div> */}
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
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        }
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move)) => {
            const desc = move ?
                'Go to move #' + move:
                'Go to game start';
            return(
                <li>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            )
        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    // 勝者がいないときNULLを返す
    return null;
}
