'use strict';

// Variables //
const btnRoll = document.querySelector('.btn--roll'),
    btnHold = document.querySelector('.btn--hold'),
    btnNewGame = document.querySelector('.btn--new'),
    playerTotalScore1 = document.getElementById('score--0'),
    playerTotalScore2 = document.getElementById('score--1'),
    playerCurrentScore1 = document.getElementById('current--0'),
    playerCurrentScore2 = document.getElementById('current--1'),
    playerBg1 = document.querySelector('.player--0'),
    playerBg2 = document.querySelector('.player--1'),
    playerUsername1 = document.getElementById('name--0'),
    playerUsername2 = document.getElementById('name--1'),
    dice = document.querySelector('.dice');

let isFirstPlayer = true;

playerTotalScore1.textContent = 0;
playerTotalScore2.textContent = 0;

// Functions // 
// Roll Dice Function // 
const rollDice = function () {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomNumber}.png`; // change dice image ..
    changeCurrentScore(isFirstPlayer, randomNumber); // change current score ..

}

// Hold Function // 
const holdGame = function () {
    if (isFirstPlayer) // if player 1
    {
        playerTotalScore1.textContent = Number(playerTotalScore1.textContent) + Number(playerCurrentScore1.textContent);

        if (Number(playerTotalScore1.textContent) >= 100) {
            winner(isFirstPlayer);
        } else {
            restPlayer1();
            isFirstPlayer = false;
        }
    } else {
        playerTotalScore2.textContent = Number(playerTotalScore2.textContent) + Number(playerCurrentScore2.textContent);

        if (Number(playerTotalScore2.textContent) >= 100) {
            winner(isFirstPlayer);
        } else {
            restPlayer2();
            isFirstPlayer = true;
        }
    }
}

// New Game Function // 
const newGame = function () {
    restPlayer1();
    restPlayer2();
    btnRoll.addEventListener('click', rollDice);
    btnHold.addEventListener('click', holdGame);
    isFirstPlayer = true;
    playerTotalScore1.textContent = 0;
    playerTotalScore2.textContent = 0;
}

// Change Current Score Function //
const changeCurrentScore = function (player, score) {
    if (player) // if player 1
    {
        restPlayer2();

        if (score !== 1) {
            playerCurrentScore1.textContent = Number(playerCurrentScore1.textContent) + score;
        }
        else {
            isFirstPlayer = false;
            restPlayer1();
        }
    } else { // if player 2
        restPlayer1();

        if (score != 1) {
            playerCurrentScore2.textContent = Number(playerCurrentScore2.textContent) + score;
        }
        else {
            isFirstPlayer = true;
            restPlayer2();
        }
    }
}

// Reset Player 1 Function //
const restPlayer1 = function () {
    playerBg1.style.backgroundColor = 'transparent';
    playerBg2.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    playerCurrentScore1.textContent = 0;
    playerUsername1.style.fontWeight = 'normal';
    playerUsername2.style.fontWeight = 'bold';
}

// Reset Player 2 Function //
const restPlayer2 = function () {
    playerBg1.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    playerBg2.style.backgroundColor = 'transparent';
    playerCurrentScore2.textContent = 0;
    playerUsername1.style.fontWeight = 'bold';
    playerUsername2.style.fontWeight = 'normal';
}

// Winner Function //
const winner = function (player) {
    if (player) {
        playerBg1.style.backgroundColor = '#2f2f2f';
        playerUsername1.style.color = '#c7365f';
        playerTotalScore1.style.color = '#c7365f';
    } else {
        playerBg2.style.backgroundColor = '#2f2f2f';
        playerUsername2.style.color = '#c7365f';
        playerTotalScore2.style.color = '#c7365f';
    }
    btnRoll.removeEventListener('click', rollDice);
    btnHold.removeEventListener('click', holdGame);
}

// Listeners // 
// Roll Dice Listener //
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdGame);
btnNewGame.addEventListener('click', newGame);

