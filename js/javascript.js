"use strict";

const gameBoardObj = (function () {
    const setUpGameBoard = function () {
        const squares = Array.from(document.querySelectorAll(".game-square"));
        squares.forEach(square => square.addEventListener("click", getPlayerMove, {once: true}));
    }
    const getPlayerMove = function (e) {
        const {updateDisplay} = displayController;
        const squareTarget = e.target.getAttribute("data-square");
        const {getCurrentPlayer} = gameController;
        const currentPlayer = getCurrentPlayer();
        gameBoardArray[squareTarget] = currentPlayer.symbol;
        updateDisplay();
    }
    const gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    const getGameBoardArray = function () {
        return gameBoardArray;
    }
    const resetGameBoardArray = function () {
        for(let i = 0; i < gameBoardArray.length; i++) {
            gameBoardArray[i] = "";
        }
    }
    return {gameBoardArray, setUpGameBoard, getGameBoardArray, resetGameBoardArray};
})();

const gameController = (function () {
    let move = 1;
    const getCurrentPlayer = function () {
        let player;
        if (move%2 == 0) {
            player = playerTwo;
        } else {
            player = playerOne;
        }
        move++;
        return player;
    }
    const newGame = function () {
        let {gameBoardArray, setUpGameBoard, resetGameBoardArray} = gameBoardObj;
        let {updateDisplay} = displayController;
        resetGameBoardArray();
        updateDisplay();
        setUpGameBoard();
    }
    const newGameBtn = document.getElementById("new-game");
    newGameBtn.addEventListener("click", newGame);
    return {getCurrentPlayer, newGame};
})();

const displayController = (function () {
    const updateDisplay = function () {
        const {getGameBoardArray} = gameBoardObj;
        const gameBoard = getGameBoardArray();
        for (let i = 0; i < gameBoard.length; i++) {
            let currentSquare = document.querySelector(`div[data-square="${i}"]`);
            currentSquare.textContent = gameBoard[i];
        }
    }
    return {updateDisplay};
})();

function playerFactory(playerName, symbol) {
    return {playerName, symbol};
}

const playerOne = playerFactory("playerOne", "X");
const playerTwo = playerFactory("playerTwo", "O");

