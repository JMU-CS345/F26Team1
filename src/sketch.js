
let screen = "title";
let titleOpacity = 0;
let titlePhase = 0;
let titleTimer = 0;
let x = 0;
let y = 0;    

//Loads the mage pictures before setup runs
function preload() {
  loadMageSelectImages();
  loadMageImages();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  //Keeps the pixel art sharp when it is scaled up
  noSmooth();
}

function draw() {
  background(0);

  if (screen === "title") {
    drawIntro();
  }

  else if (screen === "start") {
    drawGameTitle();
    drawStartButton();
  }

  else if (screen === "mageSelect") {
    createMageSelectBackGround();
    createMageSelect();
  }

  else if (screen === "game") {
    //For now the player just stands in the middle of the screen
    let speed = 20;
    if (keyIsDown(87)) y -= speed;
    if (keyIsDown(65)) x -= speed;
    if (keyIsDown(83)) y += speed;
    if (keyIsDown(68)) x += speed;
    drawPlayer((width / 2) + x, (height / 2) + y, playerMage);
  }
}

function drawIntro() {
  // Fade in
  if (titlePhase === 0) {
    titleOpacity += 3;

    if (titleOpacity >= 255) {
      titleOpacity = 255;
      titlePhase = 1;
      titleTimer = millis();
    }
  }

  // Stay visible for 1 second
  else if (titlePhase === 1) {
    if (millis() - titleTimer >= 1000) {
      titlePhase = 2;
    }
  }

  // Fade out
  else if (titlePhase === 2) {
    titleOpacity -= 3;

    if (titleOpacity <= 0) {
      titleOpacity = 0;
      screen = "start";
    }
  }

  // Straight JELLY BISCUIT intro
  fill(255, titleOpacity);
  noStroke();
  textStyle(BOLD);
  textSize(min(width * 0.09, 90));
  text("JELLY BISCUIT", width / 2, height / 2);
}

function drawGameTitle() {
  let name = "MAGE QUEST";
  let fontSize = min(width * 0.09, 100);
  let spacing = fontSize * 0.58;
  let curve = fontSize * 0.35;

  textSize(fontSize);
  textStyle(BOLD);
  fill(255);
  noStroke();

  let middle = (name.length - 1) / 2;

  for (let i = 0; i < name.length; i++) {
    let offset = i - middle;

    // Position letters along a slight upward arc
    let x = width / 2 + offset * spacing;
    let y = height * 0.22 + curve * pow(offset / middle, 2);

    // Slightly rotate letters toward the center
    let angle = (offset / middle) * 0.15;

    push();
    translate(x, y);
    rotate(angle);
    text(name[i], 0, 0);
    pop();
  }
}

function drawStartButton() {
  let buttonWidth = width * 0.28;
  let buttonHeight = height * 0.12;

  // Enlarge when hovering
  if (mouseOverButton()) {
    buttonWidth *= 1.1;
    buttonHeight *= 1.1;
  }

  fill(255);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height * 0.75,
       buttonWidth, buttonHeight, 10);

  fill(0);
  textStyle(NORMAL);
  textSize(min(width * 0.045, 36));
  text("START", width / 2, height * 0.75);
}

function mouseOverButton() {
  let buttonWidth = width * 0.28;
  let buttonHeight = height * 0.12;

  return mouseX > width / 2 - buttonWidth / 2 &&
         mouseX < width / 2 + buttonWidth / 2 &&
         mouseY > height * 0.75 - buttonHeight / 2 &&
         mouseY < height * 0.75 + buttonHeight / 2;
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

// Called by the mage select screen. 
// Sets the player's mage type based on position of the mouse and then changes the screen to game
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