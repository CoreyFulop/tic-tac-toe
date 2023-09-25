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
        if (currentPlayer.symbol == "X") {
            e.target.classList.add("crosses");
        } else {
            e.target.classList.add("noughts");
        }
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
        let {updateDisplay, clearBackground} = displayController;
        resetGameBoardArray();
        updateDisplay();
        clearBackground();
        setUpGameBoard();
    }
    const newGameBtn = document.getElementById("new-game");
    newGameBtn.addEventListener("click", newGame);
    return {getCurrentPlayer, newGame};
})();

const displayController = (function () {
    const clearBackground = function () {
        const squares = Array.from(document.querySelectorAll(".game-square"));
        squares.forEach(square => square.classList.remove("noughts"));
        squares.forEach(square => square.classList.remove("crosses"));
    }
    const updateDisplay = function () {
        const {getGameBoardArray} = gameBoardObj;
        const gameBoard = getGameBoardArray();
        for (let i = 0; i < gameBoard.length; i++) {
            let currentSquare = document.querySelector(`div[data-square="${i}"]`);
            currentSquare.textContent = gameBoard[i];
        }
    }
    return {updateDisplay, clearBackground};
})();

function playerFactory(playerName, symbol) {
    return {playerName, symbol};
}

const playerOne = playerFactory("playerOne", "X");
const playerTwo = playerFactory("playerTwo", "O");

