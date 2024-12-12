const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let hitPosition;
let result = 0;
let currentTime = 60;
let timerId = null;
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

let countDownTimerId = setInterval(countDown, 1000);
