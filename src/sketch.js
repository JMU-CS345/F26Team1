
let screen = "title";
let titleOpacity = 0;
let titlePhase = 0;
let titleTimer = 0;
let x = 0;
let y = 0;

// Title screen images
let titleImage;
let backgroundImage;
let jellyImage;
let jellyBackground;

// Loads images before setup runs
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

    if (keyIsDown(87)) y -= speed;
    if (keyIsDown(65)) x -= speed;
    if (keyIsDown(83)) y += speed;
    if (keyIsDown(68)) x += speed;

    drawPlayer((width / 2) + x, (height / 2) + y,
               playerMage);
  }
}

function mouseClicked() {
  if (screen === "start" && mouseOverButton()) {
    screen = getNextScreen(screen, true);
    console.log("Game started!");
  }

  else if (screen === "mageSelect") {
    if (mouseOverFireSelectButton()) {
      mageSelectButtonPressed("fire");
    } else if (mouseOverIceSelectButton()) {
      mageSelectButtonPressed("ice");
    } else if (mouseOverMindSelectButton()) {
      mageSelectButtonPressed("mind");
    }
  }
}

// Called by the mage selection screen
function mageSelectButtonPressed(mage) {
  playerMage = mage;
  screen = "game";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawFreeMovement() {
  updateMovement(x, y);
  image(wizard, x, y, 100, 200);
}
