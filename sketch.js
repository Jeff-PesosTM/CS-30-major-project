// Bazinga Tower Defence
// Grady chovan
// start date: 11/19/2024

let grid = [];
let newGrid = [];
let cell = {
  size: 0,
};

let map = {
  width: 16,
  height: 9,
  path: false,
  easy: "easy map",
};

function preload() {
  grassIMG = loadImage("assets/grass.png");
  pathIMG = loadImage("assets/pavement.png");
  map.easy = loadJSON("easy_map.json");
}

//prevents right click from making context menu show up
addEventListener("contextmenu", rightClick, false);
function rightClick(event) {
  event.preventDefault();
}

//16 by 9 grid
function setup() {
  createCanvas(windowWidth, windowHeight);
  cell.size = windowWidth / map.width;
  grid = map.easy;
  testEnemy = new Enemy(0,0);
}

function draw() {
  background(0);
  startGame();
  displayGrid();
  testEnemy.moveToPoint();
}

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.width = 100;
    this.height = 100;
    this.waypointIndex = 0;
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
    this.health = 100;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  findNextPoint() {
    //figure out the vector of the next point the enemy has to move to
  }

  moveToPoint(xcor, ycor) {
    //moves to the point given by the findNextPoint function
    let waypoint = {
      x: 200,
      y: 100,
    };
    circle(this.x,this.y, 50);
    let yDistance = waypoint.y - this.center.y;
    let xDistance = waypoint.x - this.center.x;
    let angle = Math.atan2(yDistance, xDistance);
    let speed = 3;

    this.velocity.x = Math.cos(angle) * speed;
    this.velocity.y = Math.sin(angle) * speed;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) && Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) && this.waypointIndex < waypoint.length - 1) {
      this.waypointIndex++;
    }
  }
}

//the map, used to easily distinguish path cell from non path cell
class Cells {
  constructor(x, y, size, placeable) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.canPlace = placeable;
  }
}

//used during setup, and when game is reset
function startGame() {
  for (let y = 0; y < map.height; y++) {
    newGrid[y] = [];
    for (let x = 0; x < map.width; x++) {
      if (grid[y][x] === 1) {
        map.path = true;
      }
      else {
        map.path = false;
      }
      newGrid[y][x] = new Cells(x * cell.size, y * cell.size, cell.size, !map.path);
    }
  }
}

function displayGrid() {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (newGrid[y][x].canPlace) { 
        image(grassIMG, newGrid[y][x].x, newGrid[y][x].y, cell.size, cell.size);
      }
      if (!newGrid[y][x].canPlace) {
        image(pathIMG, newGrid[y][x].x, newGrid[y][x].y, cell.size, cell.size);
      }
    }
  }
}