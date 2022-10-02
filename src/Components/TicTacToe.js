import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [turn, setTurn] = useState("x");
  // tracking wich items beeing clicked --> 9 as a parameter, because of 9 fields -> fill them with an empty string
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();

  //   =========================== SEARCH WINNER / RIGHT COMBO ===========================
  const pickWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    //   =========================== LOOK FOR RIGHT COMBOS ===========================

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          // do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };

  //   =========================== DISABLE DOUBLE CLICK ===========================

  const fieldClick = (num) => {
    if (cells[num] !== "") {
      window.alert("already clicked!"); // do not allow a field to be clicked twice
      return;
    }

    //   =========================== DISPLAY RIGHT PLAYER ===========================

    let squares = [...cells];

    if (turn === "x") {
      // first player will be X the next O
      squares[num] = "x";
      // display the choice as X or O depending on whose turn it is
      setTurn("o");
    } else {
      setTurn("x");
      squares[num] = "o";
    }

    pickWinner(squares); // check everytime when someone plays
    setCells(squares); //remember what is clicked
    console.log(squares);
  };

  // calling the function fieldClick everytime we klick on a field
  // passign the props -> num
  const GameDiv = ({ num }) => {
    return <div onClick={() => fieldClick(num)}>{cells[num]}</div>;
  };

  //   =========================== PLAY AGAIN BUTTON ===========================

  const refreshPage = () => {
    window.location.reload();
  };

  // passing props to know which field is clicked
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <p>
        It is <span>{turn}</span>'s turn
      </p>
      <div className="game-container">
        <GameDiv num={0} />
        <GameDiv num={1} />
        <GameDiv num={2} />
        <GameDiv num={3} />
        <GameDiv num={4} />
        <GameDiv num={5} />
        <GameDiv num={6} />
        <GameDiv num={7} />
        <GameDiv num={8} />
      </div>
      <button onClick={refreshPage}>start again</button>;
      {/* if there is a winner -> display winner */}
      {winner && (
        <>
          <p>
            The Winner is: <span>{winner}</span>
          </p>
          {/* <button onClick={refreshPage}>play again</button> */}
        </>
      )}
    </>
  );
};

export default TicTacToe;
