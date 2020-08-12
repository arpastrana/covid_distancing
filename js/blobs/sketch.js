var blobs = [];
var walls = [];


function setup() {
  let width = 400;
  let height = 200;
  let walls_t = 20;
  let num_blobs = 4;
  let blob_radius = 10.0;

  createCanvas(width, height);

  // create blobs
  for (i = 0; i < num_blobs; i++){
    var radius = blob_radius + random(0.0, 2.0);
    var x = random(5 * width / 6.0, width - 2 * radius);
    var y = random(radius, height - 2 * radius);    
    blobs.push(new Blob(x, y, radius, i));
  }

  // create walls  
  walls.push(new Wall(width / 3.0,  1 * height / 3.0, width / 3.0, walls_t));
  walls.push(new Wall(width / 3.0,  2 * height / 3.0, width / 3.0, walls_t));
  walls.push(new Wall(4.5 * width / 6.0,  height / 2.0, walls_t, (height -
  walls_t) / 2.0));

}

function draw() {
  background(0);  // 51
  colorPixels();
  updateBlobs(blobs, walls);
  showWalls(walls);
}


function updateBlobs(blobs, walls){
  for (i = 0; i < blobs.length; i++) {
    blobs[i].intersect_walls(walls);
    blobs[i].intersect_blobs(blobs);
    blobs[i].intersect_boundary();
    blobs[i].update();
    
  }
}


function showWalls(walls){
  for (i = 0; i < walls.length; i++) {
    walls[i].show();
  }
}


function colorPixels(){
  loadPixels();
  // colorize screen
  colorBlobs();
  updatePixels();
}


function colorBlobs(){
  for (x = 0; x < width; x++) {

    for (y = 0; y < height; y++) {

      let sum = 0;
      
      for (i = 0; i < blobs.length; i++) {

        let dx = x - blobs[i].x;
        let dy = y - blobs[i].y;
        let light = blobs[i].r * blobs[i].r / (dx * dx + dy * dy);

        // let d = sqrt(dx * dx + dy * dy);
        // sum += (scale * blobs[i].r) / d;
  
        // var screen = [];
        // for (c = 0; c < 3; c++){
        //   screen[c] = blobs[i].color[c] * 255 * light;
        // }
        sum += light;
      }

      // if (sum > 1.0){
      //   sum = 1.0;
      // }
      // else{
      //   sum = sum * sum / 2
      // }

      set(x, y, color(sum * 255, sum * 255, sum * 255)); 
      // set(x, y, color(sum * 255, 255, 255));
      // set(x, y, color(sum * 255, sum , sum));  // set(x, y, color
    }
  }
}
