
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

  // Background stays visible
  drawJellyBackground();

  // Text, biscuit, and decorations fade
  drawIntroText();
  drawIntroBiscuit();
}

// Draws the Jelly Biscuit background
function drawJellyBackground() {
  let scale = max(width / jellyBackground.width,
                  height / jellyBackground.height);

  let imageWidth = jellyBackground.width * scale;
  let imageHeight = jellyBackground.height * scale;

  imageMode(CENTER);
  image(jellyBackground, width / 2, height / 2,
        imageWidth, imageHeight);
  imageMode(CORNER);
}

// Draws the studio name and decorations
function drawIntroText() {
  let textY = height * 0.38;
  let fontSize = min(width * 0.075, height * 0.12, 85);

  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(fontSize);
  noStroke();

  // Dark shadow
  fill(18, 12, 32, titleOpacity);
  text("JELLY BISCUIT",
       width / 2 + 3, textY + 4);

  // Cream text
  fill(255, 240, 203, titleOpacity);
  text("JELLY BISCUIT", width / 2, textY);

  // Gold line below the title
  let lineWidth = width * 0.2;
  let lineY = height * 0.47;
  let lineThickness = max(2, height * 0.004);

  fill(234, 199, 128, titleOpacity);
  rectMode(CORNER);

  rect(width / 2 - lineWidth / 2,
       lineY, lineWidth, lineThickness);

  // Center diamond
  push();
  translate(width / 2, lineY + lineThickness / 2);
  rotate(PI / 4);
  rectMode(CENTER);
  rect(0, 0, lineThickness * 3,
       lineThickness * 3);
  pop();

  // Diamonds beside the title
  let diamondSize = min(width, height) * 0.015;

  push();
  translate(width * 0.18, textY);
  rotate(PI / 4);
  rectMode(CENTER);
  rect(0, 0, diamondSize, diamondSize);
  pop();

  push();
  translate(width * 0.82, textY);
  rotate(PI / 4);
  rectMode(CENTER);
  rect(0, 0, diamondSize, diamondSize);
  pop();

  rectMode(CORNER);
}

// Draws the biscuit without stretching it
function drawIntroBiscuit() {
  let maxWidth = width * 0.28;
  let maxHeight = height * 0.32;

  let scale = min(maxWidth / jellyImage.width,
                  maxHeight / jellyImage.height);

  let imageWidth = jellyImage.width * scale;
  let imageHeight = jellyImage.height * scale;

  push();
  tint(255, titleOpacity);
  imageMode(CENTER);

  image(jellyImage, width / 2, height * 0.68,
        imageWidth, imageHeight);

  noTint();
  pop();
}

// Draws the Mage Quest background
function drawTitleBackground() {
  let scale = max(width / backgroundImage.width,
                  height / backgroundImage.height);

  let imageWidth = backgroundImage.width * scale;
  let imageHeight = backgroundImage.height * scale;

  imageMode(CENTER);
  image(backgroundImage, width / 2, height / 2,
        imageWidth, imageHeight);
  imageMode(CORNER);
}

// Draws the Mage Quest logo
function drawGameTitle() {
  let imageWidth = width * 0.65;
  let imageHeight = imageWidth *
                    (titleImage.height / titleImage.width);

  imageMode(CENTER);
  image(titleImage, width / 2, height * 0.22,
        imageWidth, imageHeight);
  imageMode(CORNER);
}

// Draws the Start button
function drawStartButton() {
  let buttonWidth = width * 0.28;
  let buttonHeight = height * 0.12;
  let buttonX = width / 2;
  let buttonY = height * 0.75;

  let hovering = mouseOverButton();

  if (hovering) {
    buttonWidth *= 1.1;
    buttonHeight *= 1.1;
  }

  let left = buttonX - buttonWidth / 2;
  let top = buttonY - buttonHeight / 2;

  let border = min(buttonWidth, buttonHeight) * 0.08;

  noStroke();
  rectMode(CORNER);

  // Gold outer border
  fill(234, 199, 128);
  rect(left, top, buttonWidth, buttonHeight);

  // Darker bottom and right edges
  fill(157, 109, 67);
  rect(left, top + buttonHeight - border,
       buttonWidth, border);
  rect(left + buttonWidth - border, top,
       border, buttonHeight);

  // Purple inside
  fill(51, 32, 76);
  rect(left + border, top + border,
       buttonWidth - border * 2,
       buttonHeight - border * 2);

  // Inner panel
  fill(67, 42, 97);
  rect(left + border * 1.7, top + border * 1.7,
       buttonWidth - border * 3.4,
       buttonHeight - border * 3.4);

  // Highlight along the top
  fill(102, 71, 129);
  rect(left + border * 1.7, top + border * 1.7,
       buttonWidth - border * 3.4,
       border * 0.5);

  // Small gold decorations
  fill(234, 199, 128);
  rect(left + border * 2.5, buttonY - border / 2,
       border, border);
  rect(left + buttonWidth - border * 3.5,
       buttonY - border / 2, border, border);

  // START text
  fill(255, 240, 203);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(min(width * 0.045, 36));
  text("START", buttonX, buttonY);

  rectMode(CENTER);
}

// Checks whether the mouse is over Start
function mouseOverButton() {
  return isInsideStartButton(mouseX, mouseY, width, height);
}

// Checks a position without needing p5.js
function isInsideStartButton(x, y, w, h) {
  let buttonWidth = w * 0.28;
  let buttonHeight = h * 0.12;

  return x > w / 2 - buttonWidth / 2 &&
         x < w / 2 + buttonWidth / 2 &&
         y > h * 0.75 - buttonHeight / 2 &&
         y < h * 0.75 + buttonHeight / 2;
}

// Determines which screen should come next
function getNextScreen(currentScreen, startClicked) {
  if (currentScreen === "start" && startClicked) {
    return "mageSelect";
  }

  return currentScreen;
}
