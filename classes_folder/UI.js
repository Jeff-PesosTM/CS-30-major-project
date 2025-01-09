//make the ui stuff in here with gui library

let ui = {
  width: 0,
  height: 0,
};

let btn;

function setupGui() {
  btn = createButton("Start", windowWidth-ui.width + 10, 50, ui.width-20, 50);
}

function doGui() {
  if (btn.isPressed) {
    // Print a message when Button is pressed.
    sendWave();
  }
}