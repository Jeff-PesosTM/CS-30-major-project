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
    this.health = 3;
    this.ignore = [];
    this.lead = {
      y: 0,
      x: 0,
    };
  }

  moveAlongTrack() {
    imageMode(CENTER);
    //go to the coordinates provided by the waypoint list
    const waypoint = waypoints[this.waypointIndex];
    let speed = 3;
    if (this.x <= waypoint.x - speed) { // right
      sprite.skeleton.play();
      image(sprite.skeleton, this.x , this.y, 64, 64, 0, 192, 64, 64);
      this.x += speed;
      this.lead.x = speed * 10;
      this.lead.y = 0;
    }
    else if (this.x >= waypoint.x + speed) { // left
      sprite.skeleton.play();
      image(sprite.skeleton, this.x , this.y, 64, 64, 0, 64, 64, 64);
      this.x -= speed;
      this.lead.x = -speed * 10;
      this.lead.y = 0;
    }
    else if (this.y <= waypoint.y - speed) { // down
      sprite.skeleton.play();
      image(sprite.skeleton, this.x , this.y, 64, 64, 0, 128, 64, 64);
      this.y += speed;
      this.lead.x = 0;
      this.lead.y = speed * 10;
    }
    else if (this.y >= waypoint.y + speed) { // up
      sprite.skeleton.play();
      image(sprite.skeleton, this.x , this.y, 64, 64, 0, 0, 64, 64);
      this.y -= speed;
      this.lead.x = 0;
      this.lead.y = -speed * 10;
    }
    circle(this.x,this.y, 5); /// replace later
    if (sprite.skeleton.getCurrentFrame() > 7) {
      sprite.skeleton.pause();
      sprite.skeleton.reset();
    }
    if (
      Math.abs(Math.round(this.x) - Math.round(waypoint.x)) <= Math.abs(speed) && Math.abs(Math.round(this.y) - Math.round(waypoint.y)) <= Math.abs(speed) &&
      this.waypointIndex < waypoints.length - 1) { 
      this.waypointIndex++;
    }
  }
}