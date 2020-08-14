class Blob {


  constructor(x, y, r, id) {
    this.x = x;
    this.y = y;
    this.r = r;  // 120, 240
    this.id = id;
  
    let max_vel = 2.0;
    let angle = random(0, 2 * PI);  // (0, 2 * PI)
    this.xvel = random(1, max_vel) * Math.cos(angle);
    this.yvel = random(1, max_vel) * Math.sin(angle);

    this.color = [random(1, 0), random(0, 1), random(0, 1)];
  }


  show() {
    noFill();
    noStroke();
    // stroke(0);  // 0
    // strokeWeight(0.5);  // 4
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }


  update() {
    this.show()
    this.x += this.xvel;
    this.y += this.yvel;
  }


  intersect_boundary(){
    if (this.intersects_boundary_on_x()){
      this.xvel *= -1;
    }
    else if (this.intersects_boundary_on_y()){
      this.yvel *= -1;
    }
  }


  intersects_boundary_on_x(){
    if (this.x > width - this. r || this.x < this.r){
      return true;
    }
    return false;
  }


  intersects_boundary_on_y(){
    if (this.y > height - this.r || this.y < this.r){
      return true;
    }
    return false;
  }


  intersect_blob(other){
    let dx = this.x - other.x;
    let dy = this.y - other.y;
    let dist_sq = dx * dx + dy * dy;
    let radii = this.r + other.r + 10.0;
    
    if (dist_sq < radii * radii){
      let dmax = max([abs(dx), abs(dy)])
      this.xvel = dx / dmax;
      this.yvel = dy / dmax;
    }
  }

  
  intersect_blobs(others){
    for (let j = 0; j < others.length; j++){
      let other = others[j];
      if (other.id == this.id){
        continue;
      }
      this.intersect_blob(other);
      }
    }


  intersects_wall_on_x(wall){
    if (this.x + this.r > wall.x - wall.half_w && this.x - this.r < wall.x + wall.half_w){
      return true;
    }
    return false;
  }


  intersects_wall_on_y(wall){
    if (this.y + this.r > wall.y - wall.half_h && this.y - this.r < wall.y + wall.half_h){
      return true;
    }
    return false;
  }

 
  intersects_wall(wall){
    if (this.intersects_wall_on_x(wall) && this.intersects_wall_on_y(wall)){
      // left, right edges
      if (this.x <= wall.x - wall.half_w ||
          this.x >= wall.x + wall.half_w)
          {
          this.xvel *= -1;
          } 
      // top, bottom edges
      else if (this.y <= wall.y - wall.half_h || 
               this.y >= wall.y + wall.half_h)
               {
               this.yvel *= -1;
               } 
    }
  }


  intersect_walls(walls){
    for (let k = 0; k < walls.length; k++){
      this.intersects_wall(walls[k]);
      }
    }
}
