console.log("Hello world!");

const grid = document.querySelector(".grid");
const width = 15;
const cellCount = width * width + 1;
const cells = [];
let playerCurrentPosition = 199;
const playerBoundaryLeft = 192;
const playerBoundaryRight = 207;
let playerScore = 0;
const scoreDisplay = document.getElementById("score-display");
let lives = 3;
const livesDisplay = document.getElementById("lives-display");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const muteButton = document.getElementById("mute");
let invasionBegins = null;
let gameSpeed = 900;
let isPlaying = false;
let direction = "RIGHT";
let killCount = 0;
let shotSound = new Audio("styles/sounds/HitMarker.wav");
shotSound.volume = 0.3;
let winSound = new Audio("styles/sounds/captureWin.wav");
winSound.volume = 0.4;
let backgroundTrack = new Audio("styles/sounds/crystal.wav");
backgroundTrack.volume = 0.1;
let gameOverSound = new Audio("styles/sounds/gameOver.wav");
gameOverSound.volume = 0.3;
let gotDamaged = new Audio("styles/sounds/damaged.wav");
gotDamaged.volume = 0.4;
let splat = new Audio("styles/sounds/splat.wav");
splat.volume = 0.4;
let isMuted = "FALSE";

function reset() {
  isPlaying = false;
  removePlayer(playerCurrentPosition);
  playerScore = 0;
  scoreDisplay.textContent = playerScore;
  lives = 3;
  livesDisplay.innerHTML = "❤".repeat(lives);
  removeAlien();
  clearInterval(invasionBegins);
  killCount = 0;
  alienArmy = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 48, 49, 50, 51, 52, 53, 54,
    55, 56, 57, 58,
  ];
  alienPosition = 18;
  direction = "RIGHT";
  playerCurrentPosition = 199;
  backgroundTrack.pause();
}

let alienArmy = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57, 58,
];
let alienPosition = 18;

function drawAliens() {
  alienArmy.forEach((relativePosition) =>
    cells[relativePosition + alienPosition].classList.add("alien")
  );
}

function removeAlien() {
  alienArmy.forEach((relativePosition) =>
    cells[relativePosition + alienPosition].classList.remove("alien")
  );
}

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
    cells.push(cell);
  }
}

function addPlayer(position) {
  cells[position].classList.add("player");
}

function removePlayer(position) {
  cells[position].classList.remove("player");
}

function removeShot(position) {
  cells[position].classList.remove("shot");
}
function addShot(position) {
  cells[position].classList.add("shot");
}
function removeBomb(position) {
  cells[position].classList.remove("bomb");
}
function addBomb(position) {
  cells[position].classList.add("bomb");
}

function aMoveRight() {
  removeAlien();
  alienPosition = alienPosition + 1;
  drawAliens();
}
function aMoveLeft() {
  removeAlien();
  alienPosition = alienPosition - 1;
  drawAliens();
}
function aMoveDown() {
  removeAlien();
  alienPosition = alienPosition + 16;
  drawAliens();
}
function mute() {
  if (isMuted === "FALSE") {
    isMuted = "TRUE";
    backgroundTrack.pause();
  } else if (isMuted === "TRUE") {
    isMuted = "FALSE";
    backgroundTrack.play();
  }
}

function handleKeyDown(event) {
  if (isPlaying === true) {
    removePlayer(playerCurrentPosition);
    if (event.keyCode === 37 && playerCurrentPosition !== playerBoundaryLeft) {
      playerCurrentPosition--;
    } else if (
      event.keyCode === 39 &&
      playerCurrentPosition !== playerBoundaryRight
    ) {
      playerCurrentPosition++;
    } else if (event.keyCode === 32) {
      fireShot();
    }
    addPlayer(playerCurrentPosition);
  }
}

function fireShot() {
  let shotStart = playerCurrentPosition - 16;
  const shotInterval = setInterval(() => {
    removeShot(shotStart);
    shotStart = shotStart - 16;
    addShot(shotStart);
    if (shotStart < 16) {
      removeShot(shotStart);
      clearInterval(shotInterval);
    }
    let hitByShot = alienArmy.find(
      (alienRelativePosition) =>
        alienRelativePosition + alienPosition === shotStart
    );
    if (hitByShot != null) {
      cells[hitByShot + alienPosition].classList.remove("alien");
      removeShot(shotStart);
      alienArmy = alienArmy.filter((alien) => alien !== hitByShot);
      playerScore += 200;
      killCount++;
      shotSound.play();
      scoreDisplay.textContent = playerScore;
      clearInterval(shotInterval);
    }
    if (isPlaying !== true) {
      removeShot(shotStart);
      clearInterval(shotInterval);
    }
  }, 150);
}

function randomAlien() {
  return alienArmy[Math.floor(Math.random() * alienArmy.length)];
}

function dropBomb() {
  let bombStart = randomAlien() + alienPosition;
  const dropInterval = setInterval(() => {
    removeBomb(bombStart);
    bombStart = bombStart + 16;
    addBomb(bombStart);
    if (bombStart > 207) {
      removeBomb(bombStart);
      clearInterval(dropInterval);
    }
    if (bombStart === playerCurrentPosition) {
      gotDamaged.play();
      removeBomb(bombStart);
      clearInterval(dropInterval);
      playerScore -= 50;
      lives--;
    }
    if (isPlaying !== true) {
      removeBomb(bombStart);
      clearInterval(dropInterval);
    }
  }, 400);
}

function moveAliens() {
  if (direction === "RIGHT") {
    if (alienPosition % 16 === 5) {
      aMoveDown();
      direction = "LEFT";
    } else {
      aMoveRight();
    }
  } else if (direction === "LEFT") {
    if (alienPosition % 16 === 0) {
      aMoveDown();
      direction = "RIGHT";
    } else {
      aMoveLeft();
    }
  }
}

function endGame() {
  removePlayer(playerCurrentPosition);
  removeAlien();
  isPlaying = false;
  backgroundTrack.pause();
  setTimeout(() => alert(`Your score was ${playerScore}!`), 100);
  const highScore = localStorage.removeItem("high-score");
  if (!highScore || playerScore > highScore) {
    localStorage.setItem("high-score", playerScore);
  }
}

function invaded() {
  if (
    alienArmy.some(
      (relativePosition) =>
        relativePosition + alienPosition === playerCurrentPosition
    )
  ) {
    clearInterval(invasionBegins);
    splat.play();
    playerScore -= 200;
    endGame();
  }
}

function startGame() {
  if (!isPlaying) {
    isPlaying = !isPlaying;
    backgroundTrack.play();
    drawAliens();
    addPlayer(playerCurrentPosition);
    invasionBegins = setInterval(() => {
      moveAliens();
      if (killCount < 44) {
        dropBomb();
      }
      invaded();
      if (!lives) {
        clearInterval(invasionBegins);
        gameOverSound.play();
        endGame();
      }
      if (killCount === 44) {
        clearInterval(invasionBegins);
        winSound.play();
        endGame();
      }
      livesDisplay.innerHTML = lives ? "❤".repeat(lives) : "☠";
    }, gameSpeed);
  }
}

createGrid();
document.addEventListener("keydown", handleKeyDown);
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", reset);
muteButton.addEventListener("click", mute);
