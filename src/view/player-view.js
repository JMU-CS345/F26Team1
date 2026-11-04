//Loads the mage pictures and draws the player on the canvas.
//All the p5 drawing for the player lives here.

let mageImages = {};
let MAGE_SCALE = 1.25;

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

  push();
  imageMode(CENTER);
  image(img, x, y, img.width * MAGE_SCALE, img.height * MAGE_SCALE);
  pop();
}
