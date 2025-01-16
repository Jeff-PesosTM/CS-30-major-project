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
    this.shotPower = 10;
    this.pierce = 3;
  }

  displayTower() {
    if (this.towerType === tower.pick.basic) { // basic
      this.range = 300;
      this.cd = 1000;
      this.shotPower = 10;
      this.pierce = 2;
    }
    if (this.towerType === tower.pick.sniper) { // sniper
      this.range = 900;
      this.cd = 3000;
      this.shotPower = 20;
      this.pierce = 3;
      image(sprite.tank, this.x, this.y);
    }
    if (this.towerType === tower.pick.ambush) { // ambush
      this.range = 250;
      this.cd = 250;
      this.shotPower = 8;
      this.pierce = 1;
    }
    circle(this.x, this.y, 5);
  }

  displayTowerRange() {
    fill(150, 150, 150, 30);
    circle(this.x, this.y, this.range);
    fill(255);
  }

  aimAtTarget(target) {
    this.aimAngle = atan2(target.y + target.lead.y - this.y, target.x + target.lead.x - this.x);
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
      projectileArray.push(new Projectile(this.x, this.y, this.shotPower, this.aimAngle, id, this.pierce));
      id++;
    }
  }
}