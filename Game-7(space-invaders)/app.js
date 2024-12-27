const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".results");
const playAgainButton = document.getElementById("play-again");
let currentShooterIndex = 202;
const width = 15;
let aliensRemoved = [];
let invadersId;
let bossId;
let isGoingRight = true;
let direction = 1;
let results = 0;
let level = 1;
let alienInvaders = [];
let isGameOver = false;
let bossActive = false;

function setupGrid() {
    grid.innerHTML = ""; 
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div");
        grid.appendChild(square);
    }
}

function initializeGame() {
    currentShooterIndex = 202;
    aliensRemoved = [];
    direction = 1;
    isGoingRight = true;
    results = 0;
    level = 1;
    bossActive = false;
    isGameOver = false;

    alienInvaders = createAlienInvaders(level);
    setupGrid();

    const squares = Array.from(document.querySelectorAll(".grid div"));
    squares[currentShooterIndex].classList.add("shooter");

    resultDisplay.innerHTML = `Score: ${results} | Level: ${level}`;
    document.addEventListener("keydown", moveShooter);
    document.addEventListener("keydown", shoot);

    startGame();
}

function createAlienInvaders(level) {
    const rows = 3 + level;
    const aliens = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < 10; j++) {
            aliens.push(i * width + j);
        }
    }
    return aliens;
}

function drawInvaders() {
    const squares = Array.from(document.querySelectorAll(".grid div"));
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader");
        }
    }
}

function removeInvaders() {
    const squares = Array.from(document.querySelectorAll(".grid div"));
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }
}

function moveShooter(e) {
    const squares = Array.from(document.querySelectorAll(".grid div"));
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
}

function moveInvaders() {
    const squares = Array.from(document.querySelectorAll(".grid div"));
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    removeInvaders();

    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            isGoingRight = false;
        }
    }

    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            isGoingRight = true;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    drawInvaders();

    if (squares[currentShooterIndex].classList.contains("invader")) {
        resultDisplay.innerHTML = "GAME OVER";
        clearInterval(invadersId);
        isGameOver = true;
    }

    if (aliensRemoved.length === alienInvaders.length && !bossActive) {
        spawnBoss();
    }
}

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    const squares = Array.from(document.querySelectorAll(".grid div"));

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        if (squares[currentLaserIndex].classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);
            clearInterval(laserId);

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            results++;
            resultDisplay.innerHTML = `Score: ${results} | Level: ${level}`;
        }

        if (currentLaserIndex < width) {
            clearInterval(laserId);
        }
    }

    if (e.key === "ArrowUp") {
        laserId = setInterval(moveLaser, 100);
    }
}

function spawnBoss() {
    bossActive = true;
    const squares = Array.from(document.querySelectorAll(".grid div"));
    let bossHealth = 5;
    let bossPosition = width / 2;

    squares[bossPosition].classList.add("boss");

    bossId = setInterval(() => {
        squares[bossPosition].classList.remove("boss");
        bossPosition += direction;
        squares[bossPosition].classList.add("boss");

        if (squares[currentShooterIndex].classList.contains("boss")) {
            resultDisplay.innerHTML = "GAME OVER";
            clearInterval(bossId);
            isGameOver = true;
        }

        if (bossHealth === 0) {
            squares[bossPosition].classList.remove("boss");
            clearInterval(bossId);
            levelUp();
        }
    }, 500);
}

function levelUp() {
    level++;
    resultDisplay.innerHTML = `Level ${level}`;
    alienInvaders = createAlienInvaders(level);
    drawInvaders();
    startGame();
}

function startGame() {
    invadersId = setInterval(moveInvaders, 600 - level * 50);
}

playAgainButton.addEventListener("click", () => {
    clearInterval(invadersId);
    clearInterval(bossId);
    initializeGame();
});

initializeGame();
