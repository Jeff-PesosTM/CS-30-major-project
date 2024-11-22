// Bazinga Tower Defence
// Grady chovan
// start date: 11/19/2024

let grid;
let cell = {
  width: 0,
  height: 0,
};

let map = {
  width: 16,
  height: 9,
};

//prevents right click from making context menu show up
addEventListener("contextmenu", rightClick, false);
function rightClick(event) {
  event.preventDefault();
}

//16 by 9 grid
function setup() {
  createCanvas(windowWidth, windowHeight);
  cell.width = windowWidth / map.width;
  cell.height = windowHeight / map.height;
  grid = createArray();
}

function draw() {
  background(0);
  startGame();
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
class Cells {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cell.width;
    this.height = cell.height;
  }
}

//creates a new 2d array 
function createArray() {
  let newArray = [];
  for (let y = 0; y < map.height; y++) {
    newArray.push([]);
  }
  return newArray;
}

//used during setup, and when game is reset
function startGame() {
  //creates cell objects
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      grid[y][x] = new Cells(y * cell.height, x * cell.width);
    } 
  }
}