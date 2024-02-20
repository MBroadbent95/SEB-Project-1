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
let invasionBegins = null;
let gameSpeed = 3000;
let isPlaying = false;
let direction = "RIGHT";

function reset() {
  playerScore = 0;
  scoreDisplay.textContent = playerScore;
  lives = 3;
  livesDisplay.innerHTML = "❤".repeat(lives);
  isPlaying = false;
  removeAlien();
  clearInterval(invasionBegins);
  //invasionBegins = null;
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
    cell.innerText = i;
    grid.appendChild(cell);
    cells.push(cell);
  }
  //addPlayer(playerCurrentPosition);
  //addOneAlien(alienCurrentPosition);
  //drawAliens();
}

function addPlayer(position) {
  cells[position].classList.add("player");
}

// function addOneAlien(position) {
//   cells[position].classList.add("alien");
// }

function removePlayer(position) {
  cells[position].classList.remove("player");
}
// function removeOneAlien(position) {
//   cells[position].classList.remove("alien");
// }
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

function handleKeyDown(event) {
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
    console.log("A shot was fired!");
  }
  addPlayer(playerCurrentPosition);
  console.log(`player current position ${playerCurrentPosition}`);
}

function fireShot() {
  let shotStart = playerCurrentPosition - 16;
  const shotInterval = setInterval(() => {
    removeShot(shotStart);
    shotStart = shotStart - 16;
    addShot(shotStart);
    console.log(shotStart);
    if (shotStart < 16) {
      console.log("the shot has stopped");
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
      playerScore += 100;
      console.log(`player score is ${playerScore}`);
      scoreDisplay.textContent = playerScore;
      clearInterval(shotInterval);
    }
    // if (shotStart === alienPosition) {
    //   removeShot(shotStart);

    //   //removeAlien(alienPosition);
    //   ///score
    //   clearInterval(shotInterval);
    //   console.log("the alien was destroyed");
    // }
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
    console.log("bombs away");
    if (bombStart > 207) {
      console.log("no more bomb");
      removeBomb(bombStart);
      clearInterval(dropInterval);
    }
    if (bombStart === playerCurrentPosition) {
      removeBomb(bombStart);
      clearInterval(dropInterval);
      console.log("player got dunked!");
      lives--;
    }
  }, 500);
}

function moveAliens() {
  if (direction === "RIGHT") {
    if (alienPosition % 16 === 5) {
      aMoveDown();
      direction = "LEFT";
      console.log("movedown 1 is called");
    } else {
      aMoveRight();
      console.log("moveright is called");
    }
  } else if (direction === "LEFT") {
    if (alienPosition % 16 === 0) {
      aMoveDown();
      direction = "RIGHT";
      console.log("movedown 2 is called");
    } else {
      aMoveLeft();
      console.log("moveleft is called");
    }
  }
}

function endGame() {
  clearInterval(invasionBegins);
  removePlayer();
  removeAlien();
  alienPosition = 18;
  setTimeout(() => alert(playerScore), 50);
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
    console.log("alien collision");
    clearInterval(invasionBegins);
    endGame();
  }
}

// function victory() {
//   console.log("Victory!");
//   /////increase score
//   //// reset game
//   gameSpeed -= 500;
//   ////begin game
//   playerScore += 1000;
//   scoreDisplay.textContent = playerScore;
//   lives = 3;
//   livesDisplay.innerHTML = "❤".repeat(lives);
//   // isPlaying = false;
//   clearInterval(invasionBegins);
//   startGame();
// }

function startGame() {
  if (!isPlaying) {
    isPlaying = !isPlaying;
    drawAliens();
    addPlayer(playerCurrentPosition);
    invasionBegins = setInterval(() => {
      moveAliens();
      dropBomb();
      invaded();
      if (!lives) {
        endGame();
      }
      // if ((alienArmy.length = undefined)) {
      //   console.log("Victory!");
      //   //   victory();
      // }
      livesDisplay.innerHTML = lives ? "❤".repeat(lives) : "☠";
    }, gameSpeed);
  }
}

createGrid();
document.addEventListener("keydown", handleKeyDown);
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", reset);
