//Loads and draws enemies on the canvas.

let ENEMY_SCALE = 0.8;
let enemyImages = {};

function loadEnemyImages() {
  enemyImages.skeleton = loadImage("assets/skeleton.png");
}

function drawRoomEnemies(room) {
  for (let i = 0; i < room.skeletons.length; i++) {
    let skeleton = room.skeletons[i];
    drawEnemy(tileToPixelX(skeleton.col), tileToPixelY(skeleton.row), skeleton.type);
  }
}

function drawEnemy(x, y, enemyType) {
  let img = enemyImages[enemyType];
  let size = getTileSize() * ENEMY_SCALE;

  push();
  imageMode(CENTER);
  image(img, x, y, size, size);
  pop();
}
