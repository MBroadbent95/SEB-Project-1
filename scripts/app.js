console.log("Hello world!");

const grid = document.querySelector(".grid");
const width = 15;
const cellCount = width * width + 1;
const cells = [];
let playerCurrentPosition = 215;
const playerBoundaryLeft = 208;
const playerBoundaryRight = 223;

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    grid.appendChild(cell);
    cells.push(cell);
  }
  addPlayer(playerCurrentPosition);
}

function addPlayer(position) {
  cells[position].classList.add("player");
}

function removePlayer(position) {
  cells[position].classList.remove("player");
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
  }
  addPlayer(playerCurrentPosition);
  console.log(`player current position ${playerCurrentPosition}`);
}

document.addEventListener("keydown", handleKeyDown);
