const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');

let currentIndex = 76;
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 20;
const winEmojis = ['🎉', '👏', '🥳', '🎊', '🏆'];
const loseEmojis = ['😢', '💀', '👎', '😞', '☠️'];

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');

    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex -= 1;
            break;
        case 'ArrowRight':
            if (currentIndex % width < width - 1) currentIndex += 1;
            break;
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width;
            break;
        case 'ArrowDown':
            if (currentIndex + width < width * width) currentIndex += width;
            break;
    }
    squares[currentIndex].classList.add('frog');
}

function autoMoveElements() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
}

function checkOutComes() {
    lose();
    win();
}

function moveLogLeft(logLeft) {
    if (logLeft.classList.contains('l1')) {
        logLeft.classList.remove('l1');
        logLeft.classList.add('l2');
    } else if (logLeft.classList.contains('l2')) {
        logLeft.classList.remove('l2');
        logLeft.classList.add('l3');
    } else if (logLeft.classList.contains('l3')) {
        logLeft.classList.remove('l3');
        logLeft.classList.add('l1');
    }
}

function moveLogRight(logRight) {
    if (logRight.classList.contains('l1')) {
        logRight.classList.remove('l1');
        logRight.classList.add('l3');
    } else if (logRight.classList.contains('l3')) {
        logRight.classList.remove('l3');
        logRight.classList.add('l2');
    } else if (logRight.classList.contains('l2')) {
        logRight.classList.remove('l2');
        logRight.classList.add('l1');
    }
}

function moveCarLeft(carLeft) {
    if (carLeft.classList.contains('c1')) {
        carLeft.classList.remove('c1');
        carLeft.classList.add('c2');
    } else if (carLeft.classList.contains('c2')) {
        carLeft.classList.remove('c2');
        carLeft.classList.add('c3');
    } else if (carLeft.classList.contains('c3')) {
        carLeft.classList.remove('c3');
        carLeft.classList.add('c1');
    }
}

function moveCarRight(carRight) {
    if (carRight.classList.contains('c1')) {
        carRight.classList.remove('c1');
        carRight.classList.add('c3');
    } else if (carRight.classList.contains('c3')) {
        carRight.classList.remove('c3');
        carRight.classList.add('c2');
    } else if (carRight.classList.contains('c2')) {
        carRight.classList.remove('c2');
        carRight.classList.add('c1');
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = `You Win! ${getRandomEmoji(winEmojis)}`;
        clearInterval(timerId);
        document.removeEventListener('keyup', moveFrog);
    }
}

function lose() {
    if (
        currentTime === 0 ||
        squares[currentIndex].classList.contains('car-left') ||
        squares[currentIndex].classList.contains('car-right')
    ) {
        resultDisplay.textContent = `Game Over! ${getRandomEmoji(loseEmojis)}`;
        clearInterval(timerId);
        document.removeEventListener('keyup', moveFrog);
    }
}

function getRandomEmoji(emojiArray) {
    const randomIndex = Math.floor(Math.random() * emojiArray.length);
    return emojiArray[randomIndex];
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        timerId = null;
        document.removeEventListener('keyup', moveFrog);
    } else {
        timerId = setInterval(autoMoveElements, 1000);
        outcomeTimerId = setInterval(checkOutComes, 50);
        document.addEventListener('keyup', moveFrog);
    }
});
