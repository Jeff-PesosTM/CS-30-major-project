//make the ui stuff in here with gui library

let ui = {
  width: 0,
  height: 0,
};

let button = {
  start: 0,
  tower: 0,
};

let towerSelected = false;

function setupGui() {
  button.start = createButton("Start", windowWidth-ui.width + 10, 50, ui.width-20, 50);
  button.tower = createButton("Tower", windowWidth-ui.width + 10, 100, ui.width-20, 50);
}

function doGui() {
  if (button.start.isPressed) {
    sendWave();
  }
  if (button.tower.isPressed) {
    towerSelected = true;
  }
}
