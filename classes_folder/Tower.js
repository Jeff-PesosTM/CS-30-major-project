// let towerArray = [];
// let testTower;

// function mouseReleased() {
//   testTower = new Tower(mouseX, mouseY, 50, 1);
//   towerArray.push(testTower);
// }

// function showTowers() {
//   for (let theTower of towerArray) {
//     theTower.displayTower();
//     theTower.displayTowerRange();
//   }
// }

class Tower {
  constructor(x, y, size, type) {
    this.towerType = type;
    this.x = x;
    this.y = y;
    this.size = size;
    this.range = 300;
    this.lastShot = 0;
    this.cd = 1000; // cooldown on shooting
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
    line(0, 0, this.size*2, 0);
    pop();
    this.shootAtTarget();
  }

  //collideCircleCircle(theEnemy.x, theEnemy.y, theEnemy.size, someTower.x, someTower.y, someTower.range);
  shootAtTarget() {
    if (millis() - this.lastShot >= this.cd) {
      this.lastShot = millis();
      projectileArray.push(new Projectile(this.x, this.y, 10, this.aimAngle));
    }
  }
}