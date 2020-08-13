class Wall {


  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.half_w = w / 2.0;
    this.half_h = h / 2.0;
  }


  show() {
    rectMode(CENTER);
    noFill();
    // stroke(255);  // 0
    strokeWeight(0.5);  // 4
    rect(this.x, this.y, this.w, this.h);
  }
 
}
