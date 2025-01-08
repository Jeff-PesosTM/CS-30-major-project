// Bazinga Tower Defence
// Grady chovan
// start date: 11/19/2024

let enemyArray = [];
let towerArray = [];
let projectileArray = [];

let id = 0;

let testEnemy;
let testTower;

function preload() {
  grassIMG = loadImage("assets/grass.png");
  pathIMG = loadImage("assets/pavement.png");
  map.easy = loadJSON("assets/easy_map.json");
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
  gui = createGui();
  setupGui();
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
  checkRemoval();
  drawGui();
}

function keyPressed() {
  testEnemy = new Enemy(cellCenter(0, 3).x, cellCenter(0, 3).y);
  enemyArray.push(testEnemy);
}

function mouseReleased() {
  if (newGrid[Math.floor(mouseY/cell.height)][Math.floor(mouseX/cell.width)].canPlace) {
    testTower = new Tower(mouseX, mouseY, 50, 1);
    towerArray.push(testTower);
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

function showEnemies() {
  for (let theEnemy of enemyArray) {
    theEnemy.moveAlongTrack();

    for (let someProj of projectileArray) {
      let isTouching = collideCircleCircle(theEnemy.x, theEnemy.y, theEnemy.size, someProj.coords.x, someProj.coords.y, someProj.size/2);
      if (isTouching && !theEnemy.ignore.includes(someProj.id)) {
        theEnemy.health--;
        someProj.pierced++;
        console.log("health--");
        theEnemy.ignore.push(someProj.id);
      }
    }

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
    thing.goToEnemy();
  }
}

function checkRemoval() {
  for (let i = 0; i < enemyArray.length; i++) {
    // dealth deletion
    if (enemyArray[i].health <= 0) {
      enemyArray.splice(i, 1);
    }
  }
  for (let i = 0; i < projectileArray.length; i++) {
    // pierce cap deletion
    if (projectileArray[i].pierced >= projectileArray[i].pierceCap) {
      projectileArray.splice(i, 1);
    }
    //else if (projectileArray[i].)
  }
}