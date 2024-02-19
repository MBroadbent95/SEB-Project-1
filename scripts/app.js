console.log("Hello world!");

const grid = document.querySelector(".grid");
const width = 15;
const cellCount = width * width + 1;
const cells = [];
let playerCurrentPosition = 215;
const playerBoundaryLeft = 208;
const playerBoundaryRight = 223;
let alienCurrentPosition = 71;

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    grid.appendChild(cell);
    cells.push(cell);
  }
  addPlayer(playerCurrentPosition);
  addOneAlien(alienCurrentPosition);
}

function addPlayer(position) {
  cells[position].classList.add("player");
}
function addOneAlien(position) {
  cells[position].classList.add("alien");
}

function removePlayer(position) {
  cells[position].classList.remove("player");
}
function removeOneAlien(position) {
  cells[position].classList.remove("alien");
}
function removeShot(position) {
  cells[position].classList.remove("shot");
}
function addShot(position) {
  cells[position].classList.add("shot");
}

createGrid();

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
    if (shotStart === alienCurrentPosition) {
      removeShot(shotStart);
      removeOneAlien(alienCurrentPosition);
      ///score
      clearInterval(shotInterval);
    }
  }, 150);
}
document.addEventListener("keydown", handleKeyDown);
