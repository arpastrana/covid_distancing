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
  // colorVoronoi();
  updatePixels();
}


function colorVoronoi(){

  for (x = 0; x < width; x++) {

    for (y = 0; y < height; y++) {

      var min_dist = float("Infinity");
      var closest = -1;

      for (i = 0; i < blobs.length; i++) {

        let dx = x - blobs[i].x;
        let dy = y - blobs[i].y;
        let d = (dx * dx + dy * dy)

        if (d < min_dist){
          min_dist = d;
          closest = i;
        }
      }

      let c = blobs[closest].color
      set(x, y, color(c[0] * 255, c[1] * 255, c[2] * 255, 0.5 * 255));
    }
  }
}


function colorVoronoiGradient(){
  var blobsDist = []
  for (i = 0; i < blobs.length; i++) {
    blobsDist.push({})
  }

  for (x = 0; x < width; x++) {

    for (y = 0; y < height; y++) {

      var min_dist = float("Infinity");
      var closest = -1;

      for (i = 0; i < blobs.length; i++) {

        let dx = x - blobs[i].x;
        let dy = y - blobs[i].y;
        let d = (dx * dx + dy * dy)

        if (d < min_dist){
          min_dist = d;
          closest = i;
        }
      
      blobsDist[closest][[x, y].toString()] = min_dist;
      }
    }
  }

  for (i = 0; i < blobs.length; i++){
    
    let blobDict = blobsDist[i];
    let c = blobs[i].color;

    let keys = Object.keys(blobDict);
    let values = Object.values(blobDict);
    let min_d = min(values);
    let max_d = max(values) - min_d;

    for (j = 0; j < values.length; j++){
      let a = keys[j];
      let clos_d = blobDict[a];
      let light = (clos_d - min_d) / max_d

      light = 1 - light * light
      a = a.split(",")
      
      set(a[0], a[1], color(c[0] * 255, c[1] * 255, c[2] * 255, light * 255)); 
    }
  }
}


function colorBlobs(){
  for (x = 0; x < width; x++) {

    for (y = 0; y < height; y++) {

      let sum = 0;
      var screen = [0.0, 0.0, 0.0];
      
      for (i = 0; i < blobs.length; i++) {

        let dx = x - blobs[i].x;
        let dy = y - blobs[i].y;
        let light = blobs[i].r * blobs[i].r / (dx * dx + dy * dy);
  
        for (c = 0; c < 3; c++){
          screen[c] += blobs[i].color[c] * light * 255.0;
        }

        // this works nicely for bw
        // sum += light;
      }
      

      let max_color = max(screen);

      if (max_color > 255.0){
        for (let k = 0; k < screen.length; k++){
          screen[k] = screen[k] *  255.0 / max_color;
        }
      }
      else {
        for (let k = 0; k < screen.length; k++){
          screen[k] = screen[k] * screen[k] / max_color;
        }
      }

      set(x, y, color(screen[0], screen[1], screen[2]));
    }
    }
  }
