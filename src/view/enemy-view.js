//Loads and draws enemies on the canvas.

let ENEMY_SCALE = 1;
let enemyImages = {};

function loadEnemyImages() {
  enemyImages.skeleton = loadImage("assets/skeleton.png");
  enemyImages.slime = loadImage("assets/slime.png");
  enemyImages.zombie = loadImage("assets/zombie.png");
}

function drawRoomEnemies(room) {
  for (let i = 0; i < room.enemies.length; i++) {
    let enemy = room.enemies[i];
    drawEnemy(tileToPixelX(enemy.col), tileToPixelY(enemy.row), enemy.type);
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
