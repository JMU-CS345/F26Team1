
let screen = "title";
let titleOpacity = 0;
let titlePhase = 0;
let titleTimer = 0;
let x = 0;
let y = 0;
let skeletonx = 100;
let skeletony = 100;

// Title screen images
let titleImage;
let backgroundImage;
let jellyImage;
let jellyBackground;

// Loads the mage pictures before setup runs
function preload() {
  loadMageSelectImages();
  loadMageImages();

  titleImage = loadImage("assets/title-image.png");
  backgroundImage = loadImage("assets/background-image.png");
  jellyImage = loadImage("assets/jelly-donut.png");
  jellyBackground = loadImage("assets/jelly-biscuit-background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  noSmooth();
}

function draw() {
  background(0);

  if (screen === "title") {
    drawIntro();
  }

  else if (screen === "start") {
    drawTitleBackground();
    drawGameTitle();
    drawStartButton();
  }

  else if (screen === "mageSelect") {
    createMageSelectBackGround();
    createMageSelect();
  }

  else if (screen === "game") {
    let speed = 20;

    if (y > -(height / 2) && keyIsDown(87)) y -= speed;
    if (x > -(width / 2) && keyIsDown(65)) x -= speed;
    if (y < height / 2 && keyIsDown(83)) y += speed;
    if (x < width / 2 && keyIsDown(68)) x += speed;

    drawPlayer((width / 2) + x, (height / 2) + y, playerMage);
    // drawEnemyMovement();
  }
}

function mouseClicked() {
  if (screen === "start" && mouseOverButton()) {
    screen = "mageSelect";
    console.log("Game started!");
  } else if (screen === "mageSelect") {
    if (mouseOverFireSelectButton()) {
      mageSelectButtonPressed("fire");
    } else if (mouseOverIceSelectButton()) {
      mageSelectButtonPressed("ice");
    } else if (mouseOverMindSelectButton()) {
      mageSelectButtonPressed("mind");
    }
  }
}

// Called by the mage select screen
function mageSelectButtonPressed(mage) {
  playerMage = mage;
  screen = "game";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawEnemyMovement() {
  let speed = 2;
  let randomness = 1.5;

  // Calculate direction toward player
  let dx = x - skeletonx;
  let dy = y - skeletony;

  // Add some random movement
  dx += (Math.random() - 0.5) * randomness;
  dy += (Math.random() - 0.5) * randomness;

  // Normalize direction so diagonal movement isn't faster
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0) {
      skeletonx += (dx / distance) * speed;
      skeletony += (dy / distance) * speed;
  }


  drawEnemy(skeletonx, skeletony, "skeleton");
}
