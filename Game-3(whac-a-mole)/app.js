const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const restartButton = document.querySelector('#restart-button');

let hitPosition;
let result = 0;
let currentTime = 60;
let timerId = null;
function restartGame() {
    clearInterval(timerId); 
    clearInterval(countDownTimerId); 
    result = 0;
    currentTime = 60; 
    score.textContent = result; 
    timeLeft.textContent = currentTime;
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
}
function randomSquare() {
    squares.forEach(sq => sq.classList.remove('mole')); 

    let randomPosition = squares[Math.floor(Math.random() * squares.length)]; 
    randomPosition.classList.add('mole'); 

    hitPosition = randomPosition.id; 
}
function moveMole() {
    timerId = setInterval(randomSquare, 500);
}
squares.forEach(sq => {
    sq.addEventListener('click', () => {
        if (sq.id === hitPosition) { 
            result++;
            score.textContent = result; 
            hitPosition = null;
        }
    });
});
moveMole();
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime; 

    if (currentTime === 0) {
        clearInterval(countDownTimerId); 
        clearInterval(timerId); 
        alert('GAME OVER! Your final score is ' + result); 
    }
}
restartButton.addEventListener('click', restartGame);
let countDownTimerId = setInterval(countDown, 1000);
