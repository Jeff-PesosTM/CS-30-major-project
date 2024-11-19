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
  bombSprite = loadImage("assets/bomb.png");
  flagSprite = loadImage("assets/flag.png");
  tileSprite = loadImage("assets/tile.jpg");
}

function setup() {
  //creates largest square within window
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

//displays the grid and restarts when r key is pressed
function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++){
      grid[y][x].showCells();
    }
  }
  if (keyIsDown(82)) {
    startGame();
  }
}

//function that clears 3x3 area around 1st click tile
function firstClickSafety(x, y) {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++){
      //makes sure the cell is within the grid to prevent errors
      if (x + j > -1 && x + j < GRID_SIZE && y + i > -1 && y + i < GRID_SIZE) {
        if (grid[y + i][x + j].isBomb) {
          grid[y + i][x + j].isBomb = false;
          bombAmount--;
        }

        //rechecks cells adjacent to a deleted bomb to make sure they display the right bomb amounts
        for (let z = -1; z < 2; z++) {
          for (let k = -1; k < 2; k++){
            // makes sure the cell is within the grid to prevent errors
            if (x + k + j > -1 && x + j + k < GRID_SIZE && y + z + i > -1 && y + i + z < GRID_SIZE) {
              grid[y + z + i][x + k + j].checkAdjacentCells();
            }
          }
        }
        grid[y + i][x + j].isRevealed;
      }
    }
  }
  isFirstClick = false;
  whenGameStart = millis();
}

//used during setup, and when game is reset
function startGame() {
  //creates cell objects
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      grid[y][x] = new Cell(y*cellSize, x*cellSize, cellSize);
    } 
  }

  //check adjacent cells in the grid (neighbours)
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      grid[y][x].checkAdjacentCells();
    } 
  }
}
