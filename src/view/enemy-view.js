//Loads an enemy's picture and draws the enemy on the canvas.

let ENEMY_SCALE = 1.25;
let enemyType = null;

//Draws the player's mage with its center at (x, y).
function drawEnemy(x, y, enemyType) {
    let file;

    if (enemyType == "skeleton") {
        file = "skeleton.png"
    }

    let img = file;

    push();
    imageMode(CENTER);
    image(img, x, y, img.width * ENEMY_SCALE, img.height * ENEMY_SCALE);
    pop();
}
