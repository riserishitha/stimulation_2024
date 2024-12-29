document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.querySelector('#score');
  const startButton = document.querySelector('#start');
  const stopButton = document.querySelector('#stop');
  const blockWidth = 100;
  const blockHeight = 20;
  const ballDiameter = 20;
  const boardWidth = 560;
  const boardHeight = 300;
  let timerId;
  let xDirection = 2;
  let yDirection = 2;
  let score = 0;
  let isGameRunning = false;

  const userStart = [230, 10];
  let currentPosition = userStart;

  const ballStart = [270, 40];
  let ballCurrentPosition = ballStart;

  const winMessages = [
    "🎉✨ You’re a Breakout Master! All blocks cleared! 🏆🎮",
    "🔥 Incredible! You’ve won the game! Keep smashing it! 🎮🎊",
    "🏅 Victory is yours! The ball is no match for you! 🎉👏",
    "👏 Bravo! You’ve broken all the blocks and emerged victorious! 🥳💥",
    "🌟 Champion Alert! You’ve conquered this level with style! 🏆🚀"
  ];

  const loseMessages = [
    "💔 Oh no! Game over, but don’t give up! Try again! 🚀",
    "😢 So close! The blocks are still standing. Give it another shot! 💪",
    "⚠️ Oops! You’ve lost this round. The ball got away! 🏐 Keep trying!",
    "🚫 Game Over! But you’re one step closer to winning. Don’t stop now! 💥",
    "🎮 Better luck next time! You’ve got this! 🌟🙌"
  ];

  function getRandomMessage(messages) {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  class Block {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis];
      this.bottomRight = [xAxis + blockWidth, yAxis];
      this.topLeft = [xAxis, yAxis + blockHeight];
      this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
  }

  const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
  ];

  function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
      const block = document.createElement('div');
      block.classList.add('block');
      block.style.left = blocks[i].bottomLeft[0] + 'px';
      block.style.bottom = blocks[i].bottomLeft[1] + 'px';
      grid.appendChild(block);
    }
  }
  addBlocks();

  const user = document.createElement('div');
  user.classList.add('user');
  drawUser();
  grid.appendChild(user);

  function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
  }

  function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
  }

  function moveUser(e) {
    switch (e.key) {
      case 'ArrowLeft':
        if (currentPosition[0] > 0) {
          currentPosition[0] -= 10;
          drawUser();
        }
        break;
      case 'ArrowRight':
        if (currentPosition[0] < boardWidth - blockWidth) {
          currentPosition[0] += 10;
          drawUser();
        }
        break;
    }
  }
  document.addEventListener('keydown', moveUser);

  const ball = document.createElement('div');
  ball.classList.add('ball');
  drawBall();
  grid.appendChild(ball);

  function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
  }

  function checkForCollisions() {
    if (
      ballCurrentPosition[0] >= boardWidth - ballDiameter || 
      ballCurrentPosition[1] >= boardHeight - ballDiameter || 
      ballCurrentPosition[0] <= 0
    ) {
      changeDirection();
    }

    if (
      ballCurrentPosition[0] > currentPosition[0] &&
      ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
      ballCurrentPosition[1] > currentPosition[1] &&
      ballCurrentPosition[1] < currentPosition[1] + blockHeight
    ) {
      changeDirection();
    }

    for (let i = 0; i < blocks.length; i++) {
      if (
        ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
        ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
        ballCurrentPosition[1] > blocks[i].bottomLeft[1] &&
        ballCurrentPosition[1] < blocks[i].topLeft[1]
      ) {
        const allBlocks = Array.from(document.querySelectorAll('.block'));
        allBlocks[i].classList.remove('block');
        blocks.splice(i, 1);
        changeDirection();
        score++;
        updateScoreDisplay();

        if (blocks.length === 0) {
          updateScoreDisplay('You Win!');
          stopGame();
        }
      }
    }

    if (ballCurrentPosition[1] <= 0) {
      updateScoreDisplay('You Lose!');
      stopGame();
    }
  }

  function updateScoreDisplay(message) {
    if (message === 'You Win!') {
      scoreDisplay.innerHTML = getRandomMessage(winMessages);
    } else if (message === 'You Lose!') {
      scoreDisplay.innerHTML = getRandomMessage(loseMessages);
    } else {
      scoreDisplay.innerHTML = `Score: ${score}`;
    }
  }

  function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2;
      return;
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2;
      return;
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2;
      return;
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2;
      return;
    }
  }

  function startGame() {
    if (!isGameRunning) {
      isGameRunning = true;
      timerId = setInterval(moveBall, 30);
    }
  }

  function stopGame() {
    clearInterval(timerId);
    isGameRunning = false;
  }

  startButton.addEventListener('click', startGame);
  stopButton.addEventListener('click', stopGame);
});
