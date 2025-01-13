class Projectile {
  constructor(x, y, velocity, angle, id) {
    this.id = id,
    this.origin = {
      x: x,
      y: y,
    };
    this.dist = 0;
    this.velocity = velocity;
    this.size = 50;
    this.angle = angle;
    this.pierceCap = 3;
    this.pierced = 0;
    this.coords = {
      x: 0,
      y: 0,
    };
  }

  goToEnemy() {
    // oh my days this was a pain in the ass, translates the coordinate system to be rotated around the point of the tower that fired it,
    // and then just increases its distance away along the x axis, then it converts the aim angle and distance away into coordinates on the normal
    // system to allow for collision detection
    push();
    translate(this.origin.x, this.origin.y);
    rotate(this.angle);
    fill("red");
    this.dist += this.velocity;
    circle(this.dist, 0, this.size/2);
    pop();
    this.coords.x = this.origin.x + cos(this.angle) * this.dist;
    this.coords.y = this.origin.y + sin(this.angle) * this.dist;
  }
}