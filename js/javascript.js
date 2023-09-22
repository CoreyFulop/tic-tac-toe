"use strict";

const gameBoard = (function () {
    const gameBoardArray = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    return {gameBoardArray};
})();

const gameController = (function () {
    return {};
})();

const displayController = (function () {
    return {};
})();

function playerFactory(playerName) {
    return {playerName};
}

const playerOne = playerFactory("playerOne");
const playerTwo = playerFactory("playerTwo");
