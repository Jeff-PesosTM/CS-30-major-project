// let enemyArray = [];

// let testEnemy;

// function keyPressed() {
//   testEnemy = new Enemy(cellCenter(0, 3).x, cellCenter(0, 3).y);
//   enemyArray.push(testEnemy);
// }

// function showEnemies() {
//   for (let theEnemy of enemyArray) {
//     theEnemy.moveAlongTrack();
//     for (let someTower of towerArray) {
//       let inRange = collideCircleCircle(theEnemy.x, theEnemy.y, theEnemy.size, someTower.x, someTower.y, someTower.range);
//       if (inRange) {
//         someTower.aimAtTarget(theEnemy);
//       }
//     }
//   }
// }

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.width = 100;
    this.height = 100;
    this.waypointIndex = 0;
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
    this.health = 100;
  }

  moveAlongTrack() {
    //go to the coordinates provided by the waypoint list
    const waypoint = waypoints[this.waypointIndex];
    let speed = 3;
    if (this.x <= waypoint.x - speed) {
      this.x += speed;
    }
    else if (this.x >= waypoint.x + speed) {
      this.x -= speed;
    }
    else if (this.y <= waypoint.y - speed) {
      this.y += speed;
    }
    else if (this.y >= waypoint.y + speed) {
      this.y -= speed;
    }
    circle(this.x,this.y, 50); /// replace later
    if (
      Math.abs(Math.round(this.x) - Math.round(waypoint.x)) <= Math.abs(speed) && Math.abs(Math.round(this.y) - Math.round(waypoint.y)) <= Math.abs(speed) &&
      this.waypointIndex < waypoints.length - 1) { 
      this.waypointIndex++;
    }
  }
}