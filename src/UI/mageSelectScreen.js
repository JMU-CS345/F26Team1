var fireButton;
var iceButton;
var mindButton;

//Loads mage images for this script.
function loadMageSelectImages() {
  fire = loadImage("assets/mage-fire-sheet.png")
  ice = loadImage("assets/mage-ice-sheet.png")
  mind = loadImage("assets/mage-mind-sheet.png")
}

// Creates the UI for the mage select screen. 
function createMageSelect() {
  imgWidth = fire.width / 4;
  imgHeight = fire.height / 3;
  buttonHeight = fire.height / 3 * (height / 85);
  buttonWidth = fire.width / 4 * (height / 85);
  image(fire, width / 2 - (buttonWidth * 1.5), height / 4, buttonWidth, buttonHeight, 0, 0, imgWidth, imgHeight);
  image(ice, width / 2 - (buttonWidth * 0.5), height / 4, buttonWidth, buttonHeight, 0, 0, imgWidth, imgHeight);
  image(mind, width / 2 - (buttonWidth * -0.5), height / 4, buttonWidth, buttonHeight, 0, 0, imgWidth, imgHeight);
}

//Creates the colored background behind the mages images on the select screen.
function createMageSelectBackGround() {
    let buttonHeight = fire.height / 3 * (height / 85);
    let buttonWidth = fire.width / 4 * (height / 85);
    fill(color("#4f361b"));
    rect(width / 2, height / 2, buttonWidth * 3 + 50, buttonHeight + 50);
    if (mouseOverFireSelectButton()) {
        fill(color("#f28174"));
    } else {
        fill(color("#cf4b42"));
    }
    rect(width / 2 - (buttonWidth * 1), height / 2, buttonWidth, buttonHeight);
    if (mouseOverIceSelectButton()) {
        fill(color("#95e2f0"));
    } else {
        fill(color("#6dacd6"));
    }
    rect(width / 2 - (buttonWidth * 0), height / 2, buttonWidth, buttonHeight);
    if (mouseOverMindSelectButton()) {
        fill(color("#e5b6f0"));
    } else {
        fill(color("#c875d9"));
    }
    rect(width / 2 - (buttonWidth * -1), height / 2, buttonWidth, buttonHeight);
}

function mouseOverFireSelectButton() {
    let buttonWidth = fire.width / 4 * (height / 85);
    return mouseX > width / 2 - (buttonWidth * 1.5) &&
         mouseX < width / 2 - (buttonWidth * 0.5) &&
         mouseY > height / 4 &&
         mouseY < height * 0.75;
}

function mouseOverIceSelectButton() {
    let buttonWidth = fire.width / 4 * (height / 85);
    return mouseX > width / 2 - (buttonWidth * 0.5) &&
         mouseX < width / 2 - (buttonWidth * -0.5) &&
         mouseY > height / 4 &&
         mouseY < height * 0.75;
}

function mouseOverMindSelectButton() {
    let buttonWidth = fire.width / 4 * (height / 85);
    return mouseX > width / 2 - (buttonWidth * -0.5) &&
         mouseX < width / 2 - (buttonWidth * -1.5) &&
         mouseY > height / 4 &&
         mouseY < height * 0.75;
}