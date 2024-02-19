console.log("Hello world!");

const grid = document.querySelector(".grid");
const width = 15;
const cellCount = width * width + 1;
const cells = [];
let playerCurrentPosition = 215;
const playerBoundaryLeft = 208;
const playerBoundaryRight = 223;
//let alienCurrentPosition = 71;

let alienArmy = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57, 58,
];
let alienPosition = 34;

function drawAliens() {
  alienArmy.forEach((relativePosition) =>
    cells[relativePosition + alienPosition].classList.add("alien")
  );
}

function removeAlien() {
  alienArmy.forEach(
    (relativePosition) =>
      cells[relativePosition + alienPosition.classList.remove("alien")]
  );
}

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    grid.appendChild(cell);
    cells.push(cell);
  }
  addPlayer(playerCurrentPosition);
  //addOneAlien(alienCurrentPosition);
  drawAliens();
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
    let hitByShot = alienArmy.find(
      (alienRelativePosition) =>
        alienRelativePosition + alienPosition === shotStart
    );
    if (hitByShot != null) {
      cells[hitByShot + alienPosition].classList.remove("alien");
      removeShot(shotStart);
      alienArmy = alienArmy.filter((alien) => alien !== hitByShot);
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

function randomAlien(alienArmy) {
  return alienArmy[Math.floor(Math.random() * alienArmy.length)];
}
// this function successfully finds a random alien from the alien Army array
// tomorrow we will incorporate this into a bomb dropping system.
console.log(randomAlien(alienArmy));
document.addEventListener("keydown", handleKeyDown);
