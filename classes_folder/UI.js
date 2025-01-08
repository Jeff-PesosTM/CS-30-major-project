//make the ui stuff in here with gui library

let ui = {
  width: 0,
  height: 0,
};

let btn;

function setupGui() {
  btn = createButton("Button", 100, 50, 200, 50);
}

function doGui() {
  if (btn.isPressed) {
    // Print a message when Button is pressed.
    console.log("thingamobob");
    circle(0, 0, 50);
  }
}