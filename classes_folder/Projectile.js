// let projectileArray = [];

// function showProjectiles() {
//   for (let thing of projectileArray) {
//     thing.goToEnemy();
//   }
// }

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

  goToEnemy() {
    push();
    translate(this.origin.x, this.origin.y);
    rotate(this.angle);
    fill("red");
    this.x += this.velocity;
    circle(this.x, this.y, this.size/2);
    pop();
  }
}