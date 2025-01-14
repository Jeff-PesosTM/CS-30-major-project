// Bazinga Tower Defence
// Grady chovan
// start date: 11/19/2024

let game = {
  state: "playing",
};

let enemyArray = [];
let towerArray = [];
let projectileArray = [];

let intervalID;
let i = 0; // used to count enemies spawned by a wave
let wave = 0;
let spawning = false; // prevents sending multiple waves at once
let id = 0; // enemy id to prevent one projectile damaging it multiple times

let money = 50;
let lives = 10;

let gui;

let testEnemy;
let testTower;

let tower = {
  selected: false,
  pick: 0,
  cost: 50,
};

function preload() {
  grassIMG = loadImage("assets/grass.png");
  pathIMG = loadImage("assets/pavement.png");
  map.easy = loadJSON("assets/easy_map.json");
}

//16 by 9 grid
function setup() {
  angleMode(DEGREES);
  textAlign(LEFT);
  createCanvas(windowWidth, windowHeight);
  ui.width = windowWidth/15;
  ui.height = windowHeight;
  cell.width = (windowWidth - ui.width) / map.width;
  cell.height = windowHeight / map.height;
  grid = map.easy;
  console.clear();
  setupWaypoints();
  gui = createGui(); // neccessary library function
  setupGui(); // makes the gui buttons
  startGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cell.width = windowWidth / map.width;
  cell.height = windowHeight / map.height;
  setupWaypoints(); // calculates where the waypoints should be according to cell size
}

function draw() {
  background(0);
  if (game.state === "playing") {
    showGrid();
    showEnemies();
    showTowers();
    showProjectiles();
    checkRemoval(); //removes redundant objects like dead enemies and off screen projectiles
    doGui(); // gui logic
    drawGui(); // required library func
  }
  else if (game.state === "gameover") {
    gameOverScreen();
  }
}

function mouseReleased() {
  //places a tower on mouse release
  if (newGrid[Math.floor(mouseY/cell.height)][Math.floor(mouseX/cell.width)].canPlace && tower.selected && money >= tower.cost) {
    tower.selected = false;
    testTower = new Tower(mouseX, mouseY, 50, tower.pick);
    towerArray.push(testTower);
    money -= tower.cost;
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
    //displays tower range when the tower is pressed
    if (mouseIsPressed && mouseX-theTower.size/2 <= theTower.x && mouseX+theTower.size/2 >= theTower.x &&
                          mouseY-theTower.size/2 <= theTower.y && mouseY+theTower.size/2 >= theTower.y) {
      theTower.displayTowerRange();
    }
  }
  //circle that follows the mouse when placing a tower
  if (tower.selected) {
    circle(mouseX, mouseY, 50);
  }
}

function showProjectiles() {
  for (let thing of projectileArray) {
    thing.goToEnemy();
  }
}

function sendWave() {
  // spawns and enemy every second using the send enemy function
  if (spawning === false) {
    spawning = true;
    intervalID = setInterval(sendEnemy, 1000);
    wave++;
  }
}

function sendEnemy() {
  //used in the send wave function
  i++;
  if (i >= wave) {
    clearInterval(intervalID);
    spawning = false;
    i = 0;
  }
  testEnemy = new Enemy(cellCenter(0, 3).x, cellCenter(0, 3).y);
  enemyArray.push(testEnemy);
}

function checkRemoval() {
  //cleans up redundant stuff to maintain performance
  for (let i = 0; i < enemyArray.length; i++) {
    // dealth deletion
    if (enemyArray[i].health <= 0) {
      enemyArray.splice(i, 1);
      money += 5;
    }
    //end of map deletion
    else if (enemyArray[i].x >= waypoints[10].x - 5) {
      enemyArray.splice(i, 1);
      lives--;
      if (lives <= 0) {
        game.state = "gameover";
      }
    }
  }
  for (let i = 0; i < projectileArray.length; i++) {
    // pierce cap deletion
    if (projectileArray[i].pierced >= projectileArray[i].pierceCap) {
      projectileArray.splice(i, 1);
    }
    //out of bounds deletion
    else if (projectileArray[i].coords.x >= windowWidth.x - ui.width || projectileArray[i].coords.x <= 0 || projectileArray[i].coords.y <= 0 || projectileArray[i].coords.y >= windowWidth) {
      projectileArray.splice(i, 1);
    }
  }
}