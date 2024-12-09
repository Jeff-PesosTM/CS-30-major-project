// Bazinga Tower Defence
// Grady chovan
// start date: 11/19/2024

let grid = [];
let newGrid = [];
let cell = {
  width: 0,
  height: 0,
};

const waypoints = [
  {x: 156.40625, y: 301.7777777777778},
];

let testEnemy;

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
  cell.width = windowWidth / map.width;
  cell.height = windowHeight / map.height;
  grid = map.easy;
  console.clear();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cell.width = windowWidth / map.width;
  cell.height = windowHeight / map.height;
}


function draw() {
  background(0);
  startGame();
  displayGrid();
  if (testEnemy) {
    testEnemy.findNextPoint();
  }
}

function mousePressed() {
  testEnemy = new Enemy(cellCenter(0, 3).x, cellCenter(0, 3).y);
  // console.log('mouseX', mouseX);
  // console.log('mouseY', mouseY);
  console.log('waypoints', cellCenter(0, 3).x, cellCenter(0, 3).y);
  console.log('waypoints', cellCenter(2, 3).x, cellCenter(2, 3).y);
  
}

function cellCenter(x, y) {
  let middle = {
    x: 0,
    y: 0,
  };
  middle.x = x * cell.width + cell.width/2;
  middle.y = y * cell.height + cell.height/2;
  return middle;
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
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan(yDistance, xDistance);
    console.log(angle);

    const speed = 3;

    this.velocity.x = Math.cos(angle) * speed;
    this.velocity.y = Math.sin(angle) * speed;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    circle(this.x,this.y, 50);

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
      this.waypointIndex < waypoints.length - 1) { 
      this.waypointIndex++;
      //console.log('x', this.x);
      //console.log('y', this.y);
    }
  }

  moveToPoint() {
    //moves to the point given by the findNextPoint function
    let waypoint = {
      x: cellCenter(2, 3).x,
      y: cellCenter(2, 3).y,
    };
    circle(this.x,this.y, 50);
    let angle = Math.atan2(waypoint.y, waypoint.x) * 180 / Math.PI;
    let speed = 3;

    this.velocity.x = Math.tan(angle) * speed;
    this.velocity.y = Math.tan(angle) * speed;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

//the map, used to easily distinguish path cell from non path cell
class Cells {
  constructor(x, y, width, height, placeable) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canPlace = placeable;
  }
}

//used during setup, and when game is reset
function startGame() {
  //making the map
  for (let y = 0; y < map.height; y++) {
    newGrid[y] = [];
    for (let x = 0; x < map.width; x++) {
      if (grid[y][x] === 1) {
        map.path = true;
      }
      else {
        map.path = false;
      }
      newGrid[y][x] = new Cells(x * cell.width, y * cell.height, cell.width, cell.height, !map.path);
    }
  }
  ///
}

function displayGrid() {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (newGrid[y][x].canPlace) { 
        image(grassIMG, newGrid[y][x].x, newGrid[y][x].y, cell.width, cell.height);
      }
      if (!newGrid[y][x].canPlace) {
        image(pathIMG, newGrid[y][x].x, newGrid[y][x].y, cell.width, cell.height);
      }
    }
  }
}