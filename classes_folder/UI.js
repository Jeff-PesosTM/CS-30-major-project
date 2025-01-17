//make the ui stuff in here with gui library

let ui = {
  width: 0,
  height: 0,
};

let button = {
  start: 0,
  basic: 0,
  sniper: 0,
  ambush: 0,
};

function setupGui() {
  button.start = createButton("Start", windowWidth-ui.width + 10, 50, ui.width-20, 50);
  button.basic = createButton("basic", windowWidth-ui.width + 10, 100, ui.width-20, 50);
  button.sniper = createButton("sniper", windowWidth-ui.width + 10, 150, ui.width-20, 50);
  button.ambush = createButton("ambush", windowWidth-ui.width + 10, 200, ui.width-20, 50);
}

function doGui() {
  textSize(ui.width/5);
  fill(255);
  text('money: ' + money , windowWidth-ui.width + 10, 275);
  text('lives: ' + lives , windowWidth-ui.width + 10, 300);

  if (button.start.isPressed) {
    sendWave();
  }
  if (money >= 25) {
    if (button.basic.isPressed) {
      tower.pick = "basic";
      tower.selected = true;
      tower.cost = 25;
    }
    if (button.sniper.isPressed) {
      tower.pick = "sniper";
      tower.selected = true;
      tower.cost = 50;
    }
    if (button.ambush.isPressed) {
      tower.pick = "ambush";
      tower.selected = true;
      tower.cost = 100;
    }
  }
}
