"use strict";

const gameBoardObj = (function () {
    const setUpGameBoard = function () {
        const squares = Array.from(document.querySelectorAll(".game-square"));
        squares.forEach(square => square.addEventListener("click", getPlayerMove, {once: true}));
    }
    const getPlayerMove = function (e) {
        const {updateDisplay} = displayController;
        const squareTarget = e.target.getAttribute("data-square");
        const {getCurrentPlayer, checkPlayerWin} = gameController;
        const currentPlayer = getCurrentPlayer();
        gameBoardArray[squareTarget] = currentPlayer.symbol;
        if (currentPlayer.symbol == "X") {
            e.target.classList.add("crosses");
        } else {
            e.target.classList.add("noughts");
        }
        updateDisplay();
        checkPlayerWin(currentPlayer);
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
    return {gameBoardArray, setUpGameBoard, getGameBoardArray, resetGameBoardArray, getPlayerMove};
})();

const gameController = (function () {
    let messageContainer = document.querySelector(".message-container");
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
        move = 1;
        let {gameBoardArray, setUpGameBoard, resetGameBoardArray} = gameBoardObj;
        let {updateDisplay, clearBackground} = displayController;
        resetGameBoardArray();
        updateDisplay();
        clearBackground();
        setUpGameBoard();
        messageContainer.textContent = "";
    }
    const disableFurtherMoves = function () {
        const {getPlayerMove} = gameBoardObj;
        const squares = Array.from(document.querySelectorAll(".game-square"));
        squares.forEach(square => square.removeEventListener("click", getPlayerMove));
    }
    const checkPlayerWin = function (currentPlayer) {
        const playerSymbol = currentPlayer.symbol;
        const {gameBoardArray} = gameBoardObj;
        if (gameBoardArray[0] == playerSymbol && gameBoardArray[1] == playerSymbol && gameBoardArray[2] == playerSymbol) {
            messageContainer.textContent = `${currentPlayer.playerName} wins`;
            disableFurtherMoves();
        } else if (gameBoardArray[3] == playerSymbol && gameBoardArray[4] == playerSymbol && gameBoardArray[5] == playerSymbol) {
            messageContainer.textContent = `${currentPlayer.playerName} wins`;
            disableFurtherMoves();
        } else if (gameBoardArray[6] == playerSymbol && gameBoardArray[7] == playerSymbol && gameBoardArray[8] == playerSymbol) {
            messageContainer.textContent = `${currentPlayer.playerName} wins`;
            disableFurtherMoves();
        } else if (gameBoardArray[0] == playerSymbol && gameBoardArray[3] == playerSymbol && gameBoardArray[6] == playerSymbol) {
            messageContainer.textContent = `${currentPlayer.playerName} wins`;
            disableFurtherMoves();
        } else if (gameBoardArray[1] == playerSymbol && gameBoardArray[4] == playerSymbol && gameBoardArray[7] == playerSymbol) {
            messageContainer.textContent = `${currentPlayer.playerName} wins`;
            disableFurtherMoves();
        } else if (gameBoardArray[2] == playerSymbol && gameBoardArray[5] == playerSymbol && gameBoardArray[8] == playerSymbol) {
            messageContainer.textContent = `${currentPlayer.playerName} wins`;
            disableFurtherMoves();
        } else if (gameBoardArray[0] == playerSymbol && gameBoardArray[4] == playerSymbol && gameBoardArray[8] == playerSymbol) {
            messageContainer.textContent = `${currentPlayer.playerName} wins`;
            disableFurtherMoves();
        } else if (gameBoardArray[2] == playerSymbol && gameBoardArray[4] == playerSymbol && gameBoardArray[6] == playerSymbol) {
            messageContainer.textContent = `${currentPlayer.playerName} wins`;
            disableFurtherMoves();
        } else if (gameBoardArray[0] != "" && gameBoardArray[1] != "" && gameBoardArray[2] != "" && 
                    gameBoardArray[3] != "" && gameBoardArray[4] != "" && gameBoardArray[5] != "" && 
                    gameBoardArray[6] != "" && gameBoardArray[7] != "" && gameBoardArray[8] != "") {
                        messageContainer.textContent = `Tie`;
        }
    }
    const newGameBtn = document.getElementById("new-game");
    newGameBtn.addEventListener("click", newGame);
    return {getCurrentPlayer, newGame, checkPlayerWin};
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

const playerOne = playerFactory("Player One", "X");
const playerTwo = playerFactory("Player Two", "O");

