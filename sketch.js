// Bazinga Tower Defence
// Grady chovan
// start date: 11/19/2024

let grid = [];
let newGrid = [];

let enemyArray = [];
let towerArray = [];
let projectileArray = [];

let cell = {
  width: 0,
  height: 0,
};

let waypoints = [
  {x: 156.40625, y: 301.7777777777778}, //1
  {x: 156.40625, y: 129.33333333333334}, //2
  {x: 406.65625, y: 129.33333333333334}, //3
  {x: 406.65625, y: 474.2222222222223}, //4
  {x: 281.53125, y: 474.2222222222223}, //5
  {x: 281.53125, y: 646.6666666666667}, //6
  {x: 782.03125, y: 646.6666666666667}, //7
  {x: 782.03125, y: 388}, //8
  {x: 656.90625, y: 388}, //9
  {x: 656.90625, y: 215.55555555555557}, //10
  {x: 969.71875, y: 215.55555555555557}, //11
];

let testEnemy;
let testTower;

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

//16 by 9 grid
function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  cell.width = windowWidth / map.width;
  cell.height = windowHeight / map.height;
  grid = map.easy;
  console.clear();
  setupWaypoints();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cell.width = windowWidth / map.width;
  cell.height = windowHeight / map.height;
  setupWaypoints();
}

function draw() {
  background(0);
  startGame();
  showGrid();
  showEnemies();
  showTowers();
  showProjectiles();
}

function keyPressed() {
  testEnemy = new Enemy(cellCenter(0, 3).x, cellCenter(0, 3).y);
  enemyArray.push(testEnemy);
}

function mouseReleased() {
  testTower = new Tower(mouseX, mouseY, 50, 1);
  towerArray.push(testTower);
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

function setupWaypoints() {
  waypoints[0].x = cellCenter(2, 3).x;
  waypoints[0].y = cellCenter(2, 3).y;

  waypoints[1].x = cellCenter(2, 1).x;
  waypoints[1].y = cellCenter(2, 1).y;

  waypoints[2].x = cellCenter(6, 1).x;
  waypoints[2].y = cellCenter(6, 1).y;

  waypoints[3].x = cellCenter(6, 5).x;
  waypoints[3].y = cellCenter(6, 5).y;

  waypoints[4].x = cellCenter(4, 5).x;
  waypoints[4].y = cellCenter(4, 5).y;

  waypoints[5].x = cellCenter(4, 7).x;
  waypoints[5].y = cellCenter(4, 7).y;

  waypoints[6].x = cellCenter(12, 7).x;
  waypoints[6].y = cellCenter(12, 7).y;

  waypoints[7].x = cellCenter(12, 4).x;
  waypoints[7].y = cellCenter(12, 4).y;

  waypoints[8].x = cellCenter(10, 4).x;
  waypoints[8].y = cellCenter(10, 4).y;

  waypoints[9].x = cellCenter(10, 2).x;
  waypoints[9].y = cellCenter(10, 2).y;

  waypoints[10].x = cellCenter(15, 2).x;
  waypoints[10].y = cellCenter(15, 2).y;
}

function showEnemies() {
  for (let theEnemy of enemyArray) {
    theEnemy.moveAlongTrack();
    for (let someTower of towerArray) {
      let inRange = collideCircleCircle(theEnemy.x, theEnemy.y, theEnemy.size, someTower.x, someTower.y, someTower.range);
      if (inRange) {
        someTower.aimAtTarget(theEnemy);
      }
    }
  }
}

function showTowers() {
  for (let theTower of towerArray) {
    theTower.displayTower();
    theTower.displayTowerRange();
  }
}

function showProjectiles() {
  for (let thing of projectileArray) {
    //thing.displayProjectile();
    thing.goToEnemy();
  }
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
  }

  moveAlongTrack() {
    //go to the coordinates provided by the waypoint list
    const waypoint = waypoints[this.waypointIndex];
    let speed = 3;
    if (this.x <= waypoint.x - speed) {
      this.x += speed;
    }
    else if (this.x >= waypoint.x + speed) {
      this.x -= speed;
    }
    else if (this.y <= waypoint.y - speed) {
      this.y += speed;
    }
    else if (this.y >= waypoint.y + speed) {
      this.y -= speed;
    }
    circle(this.x,this.y, 50); /// replace later
    if (
      Math.abs(Math.round(this.x) - Math.round(waypoint.x)) <= Math.abs(speed) && Math.abs(Math.round(this.y) - Math.round(waypoint.y)) <= Math.abs(speed) &&
      this.waypointIndex < waypoints.length - 1) { 
      this.waypointIndex++;
    }
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

class Tower {
  constructor(x, y, size, type) {
    this.towerType = type;
    this.x = x;
    this.y = y;
    this.size = size;
    this.range = 300;
    this.lastShot = 0;
    this.cd = 100; // cooldown on shooting
    this.aimAngle = 0;
  }

  displayTower() {
    circle(this.x, this.y, this.size);
  }

  displayTowerRange() {
    fill(150, 150, 150, 30);
    circle(this.x, this.y, this.range);
    fill(255);
  }

  aimAtTarget(target) {
    this.aimAngle = atan2(target.y - this.y, target.x - this.x);
    push();
    translate(this.x, this.y);
    rotate(this.aimAngle);
    line(0, 0, this.size*2, this.size/2);
    pop();
    this.shootAtTarget();
  }

  spawnNewProjectile(angle) {
    this.lastShot = millis();
    projectileArray.push(new Projectile(this.x, this.y, 10, angle));
  }

  shootAtTarget() {
    if (millis() - this.lastShot >= this.cd) {
      console.log("test");
      this.spawnNewProjectile(this.aimAngle);
    }
  }
}

class Projectile {
  constructor(x, y, velocity, angle) {
    this.origin = {
      x: x,
      y: y,
    };
    this.x = 0;
    this.y = 0;
    this.velocity = velocity;
    this.size = 50;
    this.angle = angle;
  }

  displayProjectile() {
    fill("red");
    circle(this.x, this.y, this.size/2);
    fill("white");
  }
  
  goToEnemy() {
    push();
    translate(this.origin.x, this.origin.y);
    rotate(this.angle);
    fill("red");
    this.x += this.velocity;
    circle(this.x, this.y, this.size/2);
    fill("white");
    pop();
  }
}





//////////////////////////////////////////////////////////////////////

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

function showGrid() {
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