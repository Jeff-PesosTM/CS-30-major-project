class Tower {
  constructor(x, y, size, type) {
    this.towerType = type; // 1 = basic, 2 = sniper, 3 = ambush
    this.x = x;
    this.y = y;
    this.size = size;
    this.range = 300;
    this.lastShot = 0;
    this.cd = 1000; // cooldown on shooting
    this.aimAngle = 0;
  }

  displayTower() {
    if (this.towerType === 1) {
      this.range = 300;
      this.cd = 1000;
    }
    if (this.towerType === 2) {
      this.range = 900;
      this.cd = 3000;
    }
    if (this.towerType === 3) {
      this.range = 150;
      this.cd = 250;
    }
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

  shootAtTarget() {
    if (millis() - this.lastShot >= this.cd) {
      this.lastShot = millis();
      projectileArray.push(new Projectile(this.x, this.y, 10, this.aimAngle, id));
      id++;
    }
  }
}