// Bazinga Tower Defence
// Grady chovan
// start date: 11/19/2024

let grid;
let cell = {
  size: 0,
};

let map = {
  width: 16,
  height: 9,
  path: 1,
  open: 0,
  easy: 0,
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
  //startGame();
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
      x: 100,
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

class Tower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
  }

  findEnemy() {

  }

  attackEnemy() {
    new Projectile(this.x, this.y, this.findEnemy(), 50, 5);
  }
}

class Soldier extends Tower {
  contructor(x, y) {

  }
}

class Projectile {
  constructor(x, y, direction, speed, pierce) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.direction = direction;
    this.speed = speed;
    this.pierce = pierce;
  }
}

//the map, used to easily distinguish path cell from non path cell
class Cells {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
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
      grid[y][x] = new Cells(y * cell.height, x * cell.width, cell.size);
    }
  }
}

function displayGrid() {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (grid[y][x] === map.open) {
        image(grassIMG, x*cell.size, y*cell.size, cell.size, cell.size);
      }
      if (grid[y][x] === map.path) {
        image(pathIMG, x*cell.size, y*cell.size, cell.size, cell.size);
      }
    }
  }
}