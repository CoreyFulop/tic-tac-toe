"use strict";

const gameBoardObj = (function () {
    const gameBoardArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];  // Dummy data
    return {gameBoardArray};
})();

const gameController = (function () {
    const getGameBoardArray = function (gameBoardObj) {
        return gameBoardObj.gameBoardArray;
    }
    return {getGameBoardArray};
})();

const displayController = (function () {
    const updateDisplay = function () {
        const gameBoardArray = gameController.getGameBoardArray(gameBoardObj);
        gameBoardArray.forEach(squareValue => {
            const currentSquareIndex = gameBoardArray.indexOf(squareValue);
            const currentSquareDisplay = document.querySelector(`span[data-square="${currentSquareIndex}"]`);
            currentSquareDisplay.setAttribute("data-value", squareValue);
            currentSquareDisplay.textContent = squareValue;
        });
    }
    return {updateDisplay};
})();

function playerFactory(playerName) {
    return {playerName};
}

const playerOne = playerFactory("playerOne");
const playerTwo = playerFactory("playerTwo");

