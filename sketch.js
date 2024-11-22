// Bazinga Tower Defence
// Grady chovan
// start date: 11/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize;

const GRID_SIZE = 16;

//prevents right click from making context menu show up
addEventListener("contextmenu", rightClick, false);
function rightClick(event) {
  event.preventDefault();
}

function preload() {
  // bombSprite = loadImage("assets/bomb.png");
  // flagSprite = loadImage("assets/flag.png");
  // tileSprite = loadImage("assets/tile.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createArray(GRID_SIZE);
  cellSize = width / GRID_SIZE;
  startGame();
}

function draw() {
  background(0);
  displayGrid();
  checkMousePress();
}


class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
  }

  findNextPoint() {
    //figure out the vector of the next point the enemy has to move to
  }

  moveToPoint() {
    //moves to the point given by the findNextPoint function
  }
}

class Tower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
  }

  findEnemy() {

  }

  attackEnemy() {
    
  }
}

//the map, used to easily distinguish path cell from non path cell
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
  }
}

function checkMousePress() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      
    }

    else if (mouseButton === RIGHT) {
      
    }
  }
}

//creates a new 2d array 
function createArray(howLarge) {
  let newArray = [];
  for (let y = 0; y < howLarge; y++) {
    newArray.push([]);
  }
  return newArray;
}

// for (let i = -1; i < 2; i++) {
//   for (let j = -1; j < 2; j++){
//     //makes sure the cell is within the grid to prevent errors
//     if (x + j > -1 && x + j < GRID_SIZE && y + i > -1 && y + i < GRID_SIZE) {

//used during setup, and when game is reset
function startGame() {
  //creates cell objects
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      grid[y][x] = new Cell(y*cellSize, x*cellSize, cellSize);
    } 
  }
}
