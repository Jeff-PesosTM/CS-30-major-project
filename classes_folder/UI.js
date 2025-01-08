//make the ui stuff in here with gui library

let gui;

let button = {
  play: 0,
};

function setupGui() {
  button.play = createButton("Button", 100, 50, 200, 50);
}

function drawGui() {
  if (button.play.isPressed) {
    // Print a message when Button is pressed.
    print(button.play.label + " pressed.");
  }
  
  if (button.play.isHeld) {
    // Draw an ellipse when Button is held.
    fill(255, 0, 0);
    ellipse(200, 300, 100);
  }
}