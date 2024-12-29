const cardArray = [
    { name: 'dog', emoji: '🐶' },
    { name: 'cat', emoji: '🐱' },
    { name: 'snake', emoji: '🐍' },
    { name: 'donkey', emoji: '🫏' },
    { name: 'pig', emoji: '🐷' },
    { name: 'rat', emoji: '🐭' },
    { name: 'rabbit', emoji: '🐰' },
    { name: 'monkey', emoji: '🐒' },
    { name: 'cow', emoji: '🐮' },
    { name: 'dog', emoji: '🐶' },
    { name: 'cat', emoji: '🐱' },
    { name: 'snake', emoji: '🐍' },
    { name: 'donkey', emoji: '🫏' },
    { name: 'pig', emoji: '🐷' },
    { name: 'rat', emoji: '🐭' },
    { name: 'rabbit', emoji: '🐰' },
    { name: 'monkey', emoji: '🐒' },
    { name: 'cow', emoji: '🐮' },
];

let movesLeft = 20;
let cardChosen = [];
let cardChosenIds = [];
let cardWon = 0;

function shuffleCards() {
    cardArray.sort(() => 0.5 - Math.random());
}
function createBoard() {
    const grid = document.querySelector('#grid');
    grid.innerHTML = ''; 
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('div');
        card.textContent = '❓';
        card.setAttribute('data-id', i);
        card.classList.add('card');
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (cardChosenIds.includes(cardId) || this.classList.contains('matched')) return;

    cardChosen.push(cardArray[cardId].name);
    cardChosenIds.push(cardId);

    this.textContent = cardArray[cardId].emoji;

    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardChosenIds[0];
    const optionTwoId = cardChosenIds[1];

    if (optionOneId === optionTwoId) {
        alert('You clicked the same card!');
        cards[optionOneId].textContent = '❓';
    } else if (cardChosen[0] === cardChosen[1]) {
        cards[optionOneId].classList.add('matched');
        cards[optionTwoId].classList.add('matched');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardWon++;
    } else {
        cards[optionOneId].textContent = '❓';
        cards[optionTwoId].textContent = '❓';
    }

    movesLeft--;
    updateGameInfo();
    cardChosen = [];
    cardChosenIds = [];

    if (cardWon === cardArray.length / 2) {
        showEndMessage('Congratulations, you found them all!');
    } else if (movesLeft === 0) {
        showEndMessage('Game Over! You ran out of moves!');
    }
}

function updateGameInfo() {
    const result = document.querySelector('#result');
    const movesDisplay = document.querySelector('#moves');
    result.textContent = `Score: ${cardWon}`;
    movesDisplay.textContent = `Moves Left: ${movesLeft}`;
}

function showEndMessage(message) {
    const grid = document.querySelector('#grid');
    grid.innerHTML = `<h3>${message}</h3>`;
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Start Again';
    restartButton.addEventListener('click', restartGame);
    grid.appendChild(restartButton);
}

function restartGame() {
    movesLeft = 20;
    cardWon = 0;
    cardChosen = [];
    cardChosenIds = [];
    shuffleCards();
    createBoard();
    updateGameInfo();
}

function initializeGame() {
    shuffleCards();
    createBoard();
    const movesDisplay = document.createElement('h3');
    movesDisplay.id = 'moves';
    movesDisplay.textContent = `Moves Left: ${movesLeft}`;
    document.body.insertBefore(movesDisplay, document.querySelector('#grid'));
    updateGameInfo();
}

initializeGame();
