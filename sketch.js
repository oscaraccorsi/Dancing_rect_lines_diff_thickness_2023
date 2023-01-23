let baseUrlPictures = 'https://oscaraccorsi.github.io/pictures/';
let img, logo;
let palette = [];
//let palettes = [];
let pictureList = ['riley57.jpeg', 
                   'Rothko01.jpg', 
                   'Rothko04.jpg', 
                   'Rothko06.jpg',
                   'Rothko07.jpg', 
                   'Rothko09.jpg', 
                   'klee.jpg',  
                   'riley5.jpeg', 
                   'riley6.jpeg',
                   'veronesi04.jpeg',
                   'mond.jpg', 
                   'schneiderMio.png',
                   'munariluce.png',
                   'munariluce.png', 
                   'munariluce02.png',
                   'munariluce03.png'];
let dy, hou;
let bgColor;
let boxes = [];
let speedArray = [0.01, 0.02, 0.03, 0.05, 0.08, 0.13, 0.21, 0.34]
let speedy;
let fibo = [3, 5, 8, 13, 21, 34, 55, 89, 144, 233];
let numbArray = [3, 5, 8, 13, 21, 34, 55, 89, 144, 233];
let spessArray = [1, 2, 3, 5, 8, 13, 21];

//----------------------------------PRELOAD
function preload() {
  dy = hour()%12;
  img = loadImage(baseUrlPictures + pictureList[dy]);
  console.log(dy);
}

//------------------------------------------SETUP

function setup() {
  createCanvas(windowWidth, windowHeight);
  numb = random(numbArray);
                                   //-------setInterval
  setInterval(reloadPage, 1000*60);
  
                             //---------speed
  speedy = random(speedArray);
  
                              //------------------palette
  img.resize(200, 0);
  img.loadPixels();
                            
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2];
    let alpha = round(random(50, 150));
    let c = color(r, g, b, alpha);
    palette.push(c);    
  }
    bgColor = random(palette);
  
                              //---------------object loop
   for (let i = 0; i < numb; i++) {
    boxes[i] = {
      x: random(100, width-100),
      y: random(100, height-100),
      w: random(fibo),
      h: random(fibo),
      speedX: random(-speedy, speedy),
      speedY: random(-speedy, speedy),
      col: random(palette),
      corner: random(round(15)),
      spess: random(spessArray)
    };
  }
  console.log(numb)
}

//------------------------------------------RESIZE WINDOW
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//------------------------------------------DRAW

function draw() {
  background(bgColor);

  rectMode(CENTER);
  noFill();
                    
                        //--------------loop display
  
  for (b of boxes) {   
    rect(b.x, b.y, b.w, b.h, b.corner);
    noFill();
    strokeWeight(b.spess);
    stroke(b.col);
    b.x += b.speedX;
    b.y += b.speedY;
    b.w += b.speedX;
    b.h += b.speedY;
    
    if (b.x < 0 || b.x > width) {
      b.speedX = -b.speedX;
    }
    
    if (b.y < 0 || b.y > height) {
      b.speedY = -b.speedY;
    }
    
  } 
}
//---------------------------------RELOAD
function reloadPage() {
   window.location.reload();
}