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
  image(fire, width / 2 - (buttonWidth * 1.5), height * 0.15, buttonWidth, buttonHeight, 0, 0, imgWidth, imgHeight);
  image(ice, width / 2 - (buttonWidth * 0.5), height * 0.15, buttonWidth, buttonHeight, 0, 0, imgWidth, imgHeight);
  image(mind, width / 2 - (buttonWidth * -0.5), height * 0.15, buttonWidth, buttonHeight, 0, 0, imgWidth, imgHeight);
}

//Creates the colored background behind the mages images on the select screen, creates text that describes
// what the mage does when you hover over them.
function createMageSelectBackGround() {
    let buttonHeight = fire.height / 3 * (height / 85);
    let buttonWidth = fire.width / 4 * (height / 85);
    let buttonX = width / 2;
    let buttonY = height * 0.4;

    let fireDescriptionText = "Control the flames and burn your enemies to the ground.";
    let iceDescriptionText = "Use powers of ice to slow and freeze the monsters of the dungeon in place.";
    let mindDescriptionText = "Have a mastery over the minds of your opponents.";

    textRatio = height / 20;
    textSize(textRatio);
    fill(color("#ffffff"))
    text("Select a Mage", buttonX, height * 0.05);
    fill(color("#4f361b"));
    rect(buttonX, buttonY, buttonWidth * 3 + 50, buttonHeight + 50);
    if (mouseOverFireSelectButton()) {
        rect(buttonX, height * 0.85, buttonWidth * 2, height * 0.2);
        fill(color("#c7b09b"))
        rect(buttonX, height * 0.85, buttonWidth * 2 - 25, height * 0.2 - 25);
        textSize(textRatio - 10);
        fill(color("#000000"))
        text(fireDescriptionText, buttonX, height * 0.85, buttonWidth * 2 - 25, height * 0.2 - 25);
        fill(color("#f28174"));
    } else {
        fill(color("#cf4b42"));
    }
    rect(buttonX - (buttonWidth * 1), buttonY, buttonWidth, buttonHeight);
    fill(color("#b22222"));
    textSize(textRatio - 5);
    text("Fire Mage", buttonX - buttonWidth, height * 0.72);
    if (mouseOverIceSelectButton()) {
        fill(color("#4f361b"));
        rect(buttonX, height * 0.85, buttonWidth * 2, height * 0.2);
        fill(color("#c7b09b"))
        rect(buttonX, height * 0.85, buttonWidth * 2 - 25, height * 0.2 - 25);
        textSize(textRatio - 10);
        fill(color("#000000"))
        text(iceDescriptionText, buttonX, height * 0.85, buttonWidth * 2 - 25, height * 0.2 - 25);
        fill(color("#95e2f0"));
    } else {
        fill(color("#6dacd6"));
    }
    rect(buttonX - (buttonWidth * 0), buttonY, buttonWidth, buttonHeight);
    fill(color("#2e6ebe"));
    textSize(textRatio - 5);
    text("Ice Mage", buttonX, height * 0.72);
    if (mouseOverMindSelectButton()) {
        fill(color("#4f361b"));
        rect(buttonX, height * 0.85, buttonWidth * 2, height * 0.2);
        fill(color("#c7b09b"))
        rect(buttonX, height * 0.85, buttonWidth * 2 - 25, height * 0.2 - 25);
        textSize(textRatio - 10);
        fill(color("#000000"))
        text(mindDescriptionText, buttonX, height * 0.85, buttonWidth * 2 - 25, height * 0.2 - 25);
        fill(color("#e5b6f0"));
    } else {
        fill(color("#c875d9"));
    }
    rect(buttonX - (buttonWidth * -1), buttonY, buttonWidth, buttonHeight);
    fill(color("#7832a0"));
    textSize(textRatio - 5);
    text("Mind Mage", buttonX + buttonWidth, height * 0.72);
}

function mouseOverFireSelectButton() {
    let buttonWidth = fire.width / 4 * (height / 85);
    let buttonHeight = fire.height / 3 * (height / 85);
    return mouseX > width / 2 - (buttonWidth * 1.5) &&
         mouseX < width / 2 - (buttonWidth * 0.5) &&
         mouseY > height * 0.4 - (buttonHeight / 2) &&
         mouseY < height * 0.4 + (buttonHeight / 2);
}

function mouseOverIceSelectButton() {
    let buttonWidth = fire.width / 4 * (height / 85);
    let buttonHeight = fire.height / 3 * (height / 85);
    return mouseX > width / 2 - (buttonWidth * 0.5) &&
         mouseX < width / 2 - (buttonWidth * -0.5) &&
         mouseY > height * 0.4 - (buttonHeight / 2) &&
         mouseY < height * 0.4 + (buttonHeight / 2);
}

function mouseOverMindSelectButton() {
    let buttonWidth = fire.width / 4 * (height / 85);
    let buttonHeight = fire.height / 3 * (height / 85);
    return mouseX > width / 2 - (buttonWidth * -0.5) &&
         mouseX < width / 2 - (buttonWidth * -1.5) &&
         mouseY > height * 0.4 - (buttonHeight / 2) &&
         mouseY < height * 0.4 + (buttonHeight / 2);
}