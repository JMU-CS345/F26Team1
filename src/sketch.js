
let screen = "title";
let titleOpacity = 0;
let titlePhase = 0;
let titleTimer = 0;
let x = 0;
let y = 0;
let skeletonx = 100;
let skeletony = 100;

//Dungeon stuff. The player position is in tiles, not pixels,
//so it still works when the window changes size.
let dungeon = null;
let currentRoom = null;
let dungeonNumber = 1;
let playerRow = 0;
let playerCol = 0;
let PLAYER_SIZE = 0.6; //how wide the player is in tiles when bumping into walls
let PLAYER_SPEED = 0.09; //tiles per frame

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
    movePlayer();
    checkDoors();
    drawRoom(currentRoom, dungeon.theme);
    drawPlayer(tileToPixelX(playerCol), tileToPixelY(playerRow), playerMage);
    drawDungeonLabel(dungeonNumber, dungeon.theme);
  }
}

//Builds a new dungeon and puts the player in the middle of the start room
function startDungeon() {
  dungeon = generateDungeon();
  currentRoom = dungeon.rooms[dungeon.startRow][dungeon.startCol];
  playerRow = MIDDLE_ROW + 0.5;
  playerCol = MIDDLE_COL + 0.5;
}

    drawPlayer((width / 2) + x, (height / 2) + y, playerMage);
    // drawEnemyMovement();
//Moves the player with WASD and stops them at walls.
//Rows and columns are checked separately so the player slides along walls.
function movePlayer() {
  let newRow = playerRow;
  let newCol = playerCol;

  if (keyIsDown(87)) newRow -= PLAYER_SPEED;
  if (keyIsDown(83)) newRow += PLAYER_SPEED;
  if (keyIsDown(65)) newCol -= PLAYER_SPEED;
  if (keyIsDown(68)) newCol += PLAYER_SPEED;

  if (canStandAt(newRow, playerCol)) playerRow = newRow;
  if (canStandAt(playerRow, newCol)) playerCol = newCol;
}

//True if all four corners of the player are on walkable tiles
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

//Looks at the tile under the player. Doors move you to the next room
//and the exit takes you to a brand new dungeon.
function checkDoors() {
  let row = Math.floor(playerRow);
  let col = Math.floor(playerCol);
  let tile = currentRoom.tiles[row][col];

  if (tile === EXIT) {
    //For now the next dungeon starts right away. The town goes here later.
    dungeonNumber++;
    startDungeon();
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

//Switches to the room next door and puts the player just inside the matching door
function goToRoom(directionName) {
  let d = getDirection(directionName);
  currentRoom = dungeon.rooms[currentRoom.row + d.rowStep][currentRoom.col + d.colStep];

  //Come in on the opposite side, one tile in from the door
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
  dungeonNumber = 1;
  startDungeon();
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
