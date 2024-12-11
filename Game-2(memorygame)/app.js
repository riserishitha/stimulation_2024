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
    { name: 'cow', emoji: '🐮' }    
];

cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector('#grid');
const result = document.querySelector('#result');

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('div'); 
        card.textContent = '❓';
        card.setAttribute('data-id', i); 
        card.classList.add('card'); 
        card.addEventListener('click', flipCard); 
        grid.appendChild(card);
    }
}
let cardChosen = [];
let cardChosenIds = [];
let cardWon = 0; 

function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (cardChosenIds.includes(cardId)) return;

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

    result.textContent = `${cardWon}`;
    cardChosen = [];
    cardChosenIds = [];

    if (cardWon === cardArray.length / 2) {
        result.textContent = 'Congratulations, you found them all!';
    }
}

createBoard();
