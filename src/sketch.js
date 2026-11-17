// Main game screens and transitions.

let screen = "title";
let titleOpacity = 0;
let titlePhase = 0;
let titleTimer = 0;

// Dungeon player positions are in tiles, not pixels.
let dungeon = null;
let currentRoom = null;
let dungeonNumber = 1;
let playerRow = 0;
let playerCol = 0;
let playerMage = DEFAULT_MAGE_TYPE;
let PLAYER_SIZE = 0.6;
let PLAYER_SPEED = 0.09;

// Town progression is separate from the map artwork.
let currentTown = 1;
let finishedThreeDungeons = false;

// Title screen images
let titleImage;
let backgroundImage;
let jellyImage;
let jellyBackground;

function preload() {
  loadMageSelectImages();
  loadMageImages();
  loadEnemyImages();
  preloadTown();

  titleImage = loadImage("assets/title-image.png");
  backgroundImage = loadImage("assets/background-image.png");
  jellyImage = loadImage("assets/jelly-donut.png");
  jellyBackground = loadImage("assets/jelly-biscuit-background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  noSmooth();
  loadTownSprites();
}

function draw() {
  background(0);

  if (screen === "title") {
    drawIntro();
  } else if (screen === "start") {
    drawTitleBackground();
    drawGameTitle();
    drawStartButton();
  } else if (screen === "mageSelect") {
    createMageSelectBackGround();
    createMageSelect();
  } else if (screen === "game") {
    movePlayer();
    checkDoors();

    // checkDoors() might have switched us into a town.
    if (screen === "game") {
      drawEnemyMovement();
      drawRoom(currentRoom, dungeon.theme);
      drawRoomEnemies(currentRoom);
      drawPlayer(tileToPixelX(playerCol),
        tileToPixelY(playerRow), playerMage);
      drawDungeonLabel(dungeonNumber, dungeon.theme);
    }
  } else if (screen === "town") {
    drawTown();
  }
}

// Generate a new random dungeon. The mage type stays the same.
function startDungeon() {
  dungeon = generateDungeon();
  currentRoom = dungeon.rooms[dungeon.startRow][dungeon.startCol];
  playerRow = MIDDLE_ROW + 0.5;
  playerCol = MIDDLE_COL + 0.5;

  if (!currentRoom.enemies) {
    currentRoom.enemies = spawnEnemies(currentRoom,
      playerRow, playerCol);
  }
}

// Called when the player steps on the gold-framed EXIT tile.
function finishDungeon() {
  if (dungeonNumber >= 3) {
    finishedThreeDungeons = true;
  }

  currentTown = getTownAfterDungeon(dungeonNumber);
  selectTownMap(currentTown);
  resetTownPlayer();
  screen = "town";
}

// E near the town portal starts the next dungeon.
function useTownPortal(skipDistanceCheck) {
  if (screen !== "town") {
    return;
  }

  if (!skipDistanceCheck && !isTownPortalNearby()) {
    return;
  }

  let nextDungeon = getNextDungeonFromTown(currentTown,
    finishedThreeDungeons);

  if (nextDungeon === null) {
    return; // After Dungeon 3, stay in Town 2 for now.
  }

  dungeonNumber = nextDungeon;
  startDungeon();
  screen = "game";
}

// Move in dungeon tile coordinates. Wall collision is unchanged.
function movePlayer() {
  let newRow = playerRow;
  let newCol = playerCol;

  if (keyIsDown(87) || keyIsDown(UP_ARROW)) newRow -= PLAYER_SPEED;
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) newRow += PLAYER_SPEED;
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) newCol -= PLAYER_SPEED;
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) newCol += PLAYER_SPEED;

  if (canStandAt(newRow, playerCol)) playerRow = newRow;
  if (canStandAt(playerRow, newCol)) playerCol = newCol;
}

function canStandAt(row, col) {
  let half = PLAYER_SIZE / 2;
  let top = Math.floor(row - half);
  let bottom = Math.floor(row + half);
  let left = Math.floor(col - half);
  let right = Math.floor(col + half);

  return isWalkable(currentRoom.tiles, top, left) &&
    isWalkable(currentRoom.tiles, top, right) &&
    isWalkable(currentRoom.tiles, bottom, left) &&
    isWalkable(currentRoom.tiles, bottom, right);
}

// Regular DOOR tiles change rooms. EXIT tiles go to the town.
function checkDoors() {
  let row = Math.floor(playerRow);
  let col = Math.floor(playerCol);
  let tile = currentRoom.tiles[row][col];

  if (tile === EXIT) {
    finishDungeon();
  } else if (tile === DOOR) {
    if (row === 0) {
      goToRoom("up");
    } else if (row === ROOM_ROWS - 1) {
      goToRoom("down");
    } else if (col === 0) {
      goToRoom("left");
    } else {
      goToRoom("right");
    }
  }
}

// Enter the room on the other side of a dungeon door.
function goToRoom(directionName) {
  let d = getDirection(directionName);
  currentRoom = dungeon.rooms[
    currentRoom.row + d.rowStep][currentRoom.col + d.colStep];

  if (directionName === "up") {
    playerRow = ROOM_ROWS - 2 + 0.5;
    playerCol = MIDDLE_COL + 0.5;
  } else if (directionName === "down") {
    playerRow = 1 + 0.5;
    playerCol = MIDDLE_COL + 0.5;
  } else if (directionName === "left") {
    playerRow = MIDDLE_ROW + 0.5;
    playerCol = ROOM_COLS - 2 + 0.5;
  } else {
    playerRow = MIDDLE_ROW + 0.5;
    playerCol = 1 + 0.5;
  }

  if (!currentRoom.enemies) {
    currentRoom.enemies = spawnEnemies(currentRoom,
      playerRow, playerCol);
  }
}

function mouseClicked() {
  if (screen === "start" && mouseOverButton()) {
    screen = "mageSelect";
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

function mageSelectButtonPressed(mage) {
  playerMage = mage;
  dungeonNumber = 1;
  currentTown = 1;
  finishedThreeDungeons = false;
  startDungeon();
  screen = "game"; // The player ALWAYS starts in Dungeon 1.
}

function keyPressed() {
  if (screen === "town") {
    if (key === "e" || key === "E") {
      useTownPortal(false);
    }
    if (key === "t" || key === "T") {
      showTownWalkable = !showTownWalkable;
    }
  }

  // Optional quick testing: add ?testFlow=1 to the game's URL.
  // N simulates reaching a dungeon exit or using the town portal.
  // Without that URL parameter, N does nothing.
  let testMode = new URLSearchParams(
    window.location.search).has("testFlow");

  if (testMode && (key === "n" || key === "N")) {
    if (screen === "game") {
      finishDungeon();
    } else if (screen === "town") {
      useTownPortal(true);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawEnemyMovement() {
  let speed = 0.015;
  let randomness = 0.2;

  for (let i = 0; i < currentRoom.enemies.length; i++) {
    let enemy = currentRoom.enemies[i];
    let rowDifference = playerRow - enemy.row;
    let colDifference = playerCol - enemy.col;

    rowDifference += (Math.random() - 0.5) * randomness;
    colDifference += (Math.random() - 0.5) * randomness;

    let distance = Math.sqrt(
      rowDifference * rowDifference +
      colDifference * colDifference);
    if (distance === 0) {
      continue;
    }

    let nextRow = enemy.row + (rowDifference / distance) * speed;
    let nextCol = enemy.col + (colDifference / distance) * speed;

    if (canStandAt(nextRow, nextCol)) {
      enemy.row = nextRow;
      enemy.col = nextCol;
    } else {
      if (canStandAt(nextRow, enemy.col)) {
        enemy.row = nextRow;
      }
      if (canStandAt(enemy.row, nextCol)) {
        enemy.col = nextCol;
      }
    }
  }
}
