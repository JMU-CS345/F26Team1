//Loads the mage pictures and draws the player on the canvas.
//All the p5 drawing for the player lives here.

let mageImages = {};
let MAGE_SCALE = 1.25;
let frame = 0;
let count = 0;
let direction = "";

//Loads one picture per mage type. Call this from preload() in sketch.js.
function loadMageImages() {
  for (let type in MAGE_TYPES) {
    mageImages[type] = loadImage("assets/" + MAGE_TYPES[type]);
  }
}

//Draws the player's mage with its center at (x, y).
function drawPlayer(x, y, mageType) {
  let file = getMageImageFile(mageType);
  let img = null;

  //Find the loaded image that matches the file name
  for (let type in MAGE_TYPES) {
    if (MAGE_TYPES[type] === file) {
      img = mageImages[type];
    }
  }

  charWidth = img.width / 4;
  charHeight = img.height / 3;

  //frames per second
  playerMovementFramerate = 4;
  
  push();
  imageMode(CENTER);

  // checking if the player is moving, doing frame calculations, then animating the player.
  if (checkPlayerMovingInDirection()) {
    count = (count + 1) % (60 / playerMovementFramerate);
    if (count === 14) {
      frame = (frame + 1) %4
    }
    if (direction === "up") {
      image(img, x, y, charWidth * MAGE_SCALE, charHeight * MAGE_SCALE, charWidth * frame, charHeight, charWidth, charHeight);
    } else if (direction === "left") {
      image(img, x, y, charWidth * MAGE_SCALE, charHeight * MAGE_SCALE, charWidth * frame, 2 * charHeight, charWidth, charHeight);
    } else if (direction === "down") {
      image(img, x, y, charWidth * MAGE_SCALE, charHeight * MAGE_SCALE, charWidth * frame, 0, charWidth, charHeight);
    } else {
      scale(-1, 1);
      image(img, -x , y, charWidth * MAGE_SCALE, charHeight * MAGE_SCALE, charWidth * frame, 2 * charHeight, charWidth, charHeight);
    }
  } else {
    count = 0;
    image(img, x, y, charWidth * MAGE_SCALE, charHeight * MAGE_SCALE, 0, 0, charWidth, charHeight);
  }
  pop();
}

// Checks if the any of the WASD keys are currently held down, 
// and sets direction and returns true if so. Otherwise returns false.
function checkPlayerMovingInDirection() {
  // W
  if (keyIsDown(87) && !keyIsDown(83)) {
    direction = "up";
  } //S
  else if (keyIsDown(83) && !keyIsDown(87)){
    direction = "down"
  } //A
  else if (keyIsDown(65) && !keyIsDown(68)) {
    direction = "left"
  } // D
  else if (keyIsDown(68) && !keyIsDown(65)) {
    direction = "right"
  }
  else {
    direction = "";
    return false;
  }
  return true;
}