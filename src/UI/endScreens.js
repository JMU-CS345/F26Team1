// Portal confirmation, victory, credits, and replay screens.
// All the art here is drawn with p5.js, not image files.

let victoryStartedAt = 0;
let creditsStartedAt = 0;

const VICTORY_HOLD_TIME = 3400;
const VICTORY_FADE_TIME = 1300;
const CREDIT_SCROLL_SPEED = 75;
const BUTTON_HOVER_SCALE = 1.10; // Grow 10% when hovered

function getPortalDialogLayout() {
  let panelWidth = min(width - 28, 810);
  let panelHeight = min(height - 24, 285);
  let centerX = width / 2;
  let centerY = height / 2;
  let buttonWidth = min(panelWidth * 0.3, 235);
  let buttonHeight = min(63, panelHeight * 0.23);
  let buttonY = centerY + panelHeight * 0.22;

  return {
    x: centerX,
    y: centerY,
    w: panelWidth,
    h: panelHeight,
    yes: {
      x: centerX - panelWidth * 0.19,
      y: buttonY,
      w: buttonWidth,
      h: buttonHeight
    },
    no: {
      x: centerX + panelWidth * 0.19,
      y: buttonY,
      w: buttonWidth,
      h: buttonHeight
    }
  };
}

function isInsideScreenButton(x, y, button) {
  // Use the enlarged size for both hovering and clicking.
  // This avoids losing the hover effect near the button edges.
  let halfWidth = button.w * BUTTON_HOVER_SCALE / 2;
  let halfHeight = button.h * BUTTON_HOVER_SCALE / 2;
  return x >= button.x - halfWidth &&
    x <= button.x + halfWidth &&
    y >= button.y - halfHeight &&
    y <= button.y + halfHeight;
}

function getPortalDialogChoice(x, y) {
  let dialog = getPortalDialogLayout();
  if (isInsideScreenButton(x, y, dialog.yes)) {
    return "yes";
  }
  if (isInsideScreenButton(x, y, dialog.no)) {
    return "no";
  }
  return null;
}

// Dark purple buttons with gold edging, like the approved preview.
function drawFantasyButton(label, button) {
  let hovering = isInsideScreenButton(mouseX, mouseY, button);
  let scaleAmount = hovering ? BUTTON_HOVER_SCALE : 1;
  let w = button.w * scaleAmount;
  let h = button.h * scaleAmount;
  let x = button.x - w / 2;
  let y = button.y - h / 2;

  push();
  rectMode(CORNER);
  noStroke();
  fill(12, 9, 22);
  rect(x + 4, y + 6, w, h, 5);

  if (hovering) {
    fill(238, 190, 91);
  } else {
    fill(108, 91, 111);
  }
  rect(x, y, w, h, 5);

  fill(hovering ? 76 : 40,
    hovering ? 42 : 34,
    hovering ? 110 : 54);
  rect(x + 5, y + 5, w - 10, h - 10, 3);

  fill(hovering ? 106 : 58,
    hovering ? 65 : 47,
    hovering ? 141 : 71);
  rect(x + 9, y + 9, w - 18, 5);

  // Four small decorative gold corner accents.
  fill(hovering ? 248 : 144,
    hovering ? 206 : 122, 113);
  rect(x + 9, y + 9, 11, 3);
  rect(x + w - 20, y + 9, 11, 3);
  rect(x + 9, y + h - 12, 11, 3);
  rect(x + w - 20, y + h - 12, 11, 3);

  fill(hovering ? 255 : 206,
    hovering ? 241 : 192,
    hovering ? 214 : 189);
  textAlign(CENTER, CENTER);
  textFont("Georgia");
  textStyle(BOLD);
  textSize(min(29, h * 0.5));
  text(label, button.x, button.y - 2);
  pop();
}

function drawPortalConfirmation() {
  let dialog = getPortalDialogLayout();
  let x = dialog.x - dialog.w / 2;
  let y = dialog.y - dialog.h / 2;

  push();
  rectMode(CORNER);
  noStroke();
  fill(0, 0, 0, 175);
  rect(0, 0, width, height);

  // Panel shadow and double gold border.
  fill(7, 6, 13, 210);
  rect(x + 10, y + 12, dialog.w, dialog.h, 7);
  fill(232, 183, 91);
  rect(x - 5, y - 5, dialog.w + 10, dialog.h + 10, 7);
  fill(57, 38, 37);
  rect(x, y, dialog.w, dialog.h, 5);
  fill(28, 22, 29);
  rect(x + 6, y + 6, dialog.w - 12, dialog.h - 12, 4);

  // Inner frame and corner flourishes.
  noFill();
  stroke(159, 112, 65);
  strokeWeight(2);
  rect(x + 13, y + 13, dialog.w - 26, dialog.h - 26, 3);
  noStroke();
  fill(236, 188, 104);
  for (let dx of [20, dialog.w - 20]) {
    for (let dy of [20, dialog.h - 20]) {
      push();
      translate(x + dx, y + dy);
      rotate(PI / 4);
      rectMode(CENTER);
      rect(0, 0, 11, 11);
      pop();
    }
  }

  // The little gold emblem centered over the top edge.
  push();
  translate(dialog.x, y);
  fill(18, 15, 27);
  stroke(233, 184, 95);
  strokeWeight(3);
  ellipse(0, 0, 48, 48);
  noStroke();
  fill(239, 196, 109);
  push();
  rotate(PI / 4);
  rectMode(CENTER);
  rect(0, 0, 18, 18);
  pop();
  fill(56, 38, 81);
  ellipse(0, 0, 10, 10);
  pop();

  fill(255, 239, 210);
  textAlign(CENTER, CENTER);
  textFont("Georgia");
  textStyle(BOLD);
  textSize(min(30, dialog.w * 0.044));
  text("Are you sure you want to continue?",
    x + 25, y + dialog.h * 0.23,
    dialog.w - 50, dialog.h * 0.3);
  pop();

  drawFantasyButton("Yes", dialog.yes);
  drawFantasyButton("No", dialog.no);
}

function beginVictory() {
  victoryStartedAt = millis();
  screen = "victory";
}

// Plain black ending background. The text and transitions are unchanged.
function drawEndingBackground() {
  background(0);
}

function drawEndingDiamond(x, y, size) {
  push();
  translate(x, y);
  rotate(PI / 4);
  noStroke();
  fill(239, 192, 107);
  rectMode(CENTER);
  rect(0, 0, size, size);
  pop();
}

function drawVictoryScreen() {
  drawEndingBackground();

  let elapsed = millis() - victoryStartedAt;
  let centerX = width / 2;
  let centerY = height / 2;

  push();
  textAlign(CENTER, CENTER);
  textFont("Georgia");
  textStyle(BOLD);
  fill(245, 200, 116);
  textSize(min(width * 0.095, height * 0.15, 102));
  text("VICTORY!", centerX, centerY - height * 0.15);

  stroke(197, 150, 81);
  strokeWeight(3);
  line(centerX - min(width * 0.27, 270), centerY - 14,
    centerX + min(width * 0.27, 270), centerY - 14);
  noStroke();
  drawEndingDiamond(centerX, centerY - 14, 13);

  textStyle(NORMAL);
  fill(255, 239, 210);
  textSize(min(35, width * 0.052));
  text("You beat Mage Quest!", centerX, centerY + 49);
  fill(189, 184, 209);
  textSize(min(21, width * 0.037));
  text("All three dungeons conquered.",
    centerX, centerY + 100);
  pop();

  if (elapsed >= VICTORY_HOLD_TIME) {
    let fade = (elapsed - VICTORY_HOLD_TIME) / VICTORY_FADE_TIME;
    push();
    rectMode(CORNER); // Cover the entire canvas, not just one side.
    noStroke();
    fill(0, 0, 0, constrain(fade * 255, 0, 255));
    rect(0, 0, width, height);
    pop();
  }

  if (elapsed >= VICTORY_HOLD_TIME + VICTORY_FADE_TIME) {
    creditsStartedAt = millis();
    screen = "credits";
  }
}

function drawCreditsScreen() {
  drawEndingBackground();

  let elapsed = millis() - creditsStartedAt;
  let distance = elapsed / 1000 * CREDIT_SCROLL_SPEED;
  let spacing = min(83, max(52, height * 0.09));
  let y = height + 80 - distance;

  let lines = [
    { text: "MAGE QUEST", type: "title" },
    { text: "A GAME BY JELLY BISCUIT", type: "subtitle" },
    { text: "", type: "space" },
    { text: "CREATED BY", type: "heading" },
    { text: "Devin Shifflett", type: "name" },
    { text: "Callie DuBois", type: "name" },
    { text: "Zaina Olibah", type: "name" },
    { text: "Aiden Kleen", type: "name" },
    { text: "", type: "space" },
    { text: "THANK YOU FOR PLAYING", type: "heading" }
  ];

  push();
  textAlign(CENTER, CENTER);
  textFont("Georgia");
  noStroke();

  for (let line of lines) {
    if (line.type === "title") {
      fill(245, 200, 116);
      textStyle(BOLD);
      textSize(min(55, width * 0.08));
    } else if (line.type === "heading") {
      fill(236, 194, 118);
      textStyle(BOLD);
      textSize(min(28, width * 0.055));
    } else if (line.type === "subtitle") {
      fill(190, 181, 207);
      textStyle(NORMAL);
      textSize(min(20, width * 0.04));
    } else {
      fill(255, 239, 213);
      textStyle(NORMAL);
      textSize(min(32, width * 0.055));
    }

    if (line.text && y > -80 && y < height + 80) {
      text(line.text, width / 2, y);
    }
    y += spacing;
  }
  pop();

  // Fade in from black after the victory screen.
  if (elapsed < 1000) {
    push();
    rectMode(CORNER); // Keep the credits fade even across the screen.
    noStroke();
    fill(0, 0, 0, 255 * (1 - elapsed / 1000));
    rect(0, 0, width, height);
    pop();
  }

  // Only show Play Again after every credit has left the screen.
  if (y - spacing < -60) {
    screen = "playAgain";
  }
}

function getPlayAgainButtons() {
  let buttonWidth = min(220, width * 0.28);
  let buttonHeight = 62;
  return [
    { x: width / 2 - buttonWidth * 0.65,
      y: height * 0.65, w: buttonWidth, h: buttonHeight },
    { x: width / 2 + buttonWidth * 0.65,
      y: height * 0.65, w: buttonWidth, h: buttonHeight }
  ];
}

function clickedPlayAgainButton(x, y) {
  let buttons = getPlayAgainButtons();
  return isInsideScreenButton(x, y, buttons[0]) ||
    isInsideScreenButton(x, y, buttons[1]);
}

function drawPlayAgainScreen() {
  drawEndingBackground();

  push();
  textAlign(CENTER, CENTER);
  textFont("Georgia");
  textStyle(BOLD);
  fill(245, 200, 116);
  textSize(min(70, width * 0.095));
  text("PLAY AGAIN?", width / 2, height * 0.37);
  drawEndingDiamond(width / 2, height * 0.48, 15);
  fill(223, 213, 224);
  textStyle(NORMAL);
  textSize(min(24, width * 0.04));
  text("There's only one answer.", width / 2, height * 0.54);
  pop();

  let buttons = getPlayAgainButtons();
  drawFantasyButton("Yes", buttons[0]);
  drawFantasyButton("Yes", buttons[1]);
}
