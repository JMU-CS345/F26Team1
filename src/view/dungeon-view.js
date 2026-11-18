//Draws one dungeon room so it fills the screen, like a Zelda room.
//All the p5 drawing for dungeons lives here.

//Pictures for the walls and decor, loaded by loadDecorImages()
let decorImages = {};

//Colors for each dungeon theme
let THEME_COLORS = {
  stone: { wall: [70, 60, 80], floor: [150, 128, 96], floorAlt: [140, 118, 88], door: [40, 30, 40] },
  lava: { wall: [60, 20, 20], floor: [120, 60, 40], floorAlt: [110, 52, 34], door: [30, 10, 10] },
  ice: { wall: [60, 90, 130], floor: [170, 200, 225], floorAlt: [158, 190, 218], door: [30, 50, 80] },
};

//Loads the wall picture and every decor piece for every theme.
//Call this from preload() in sketch.js.
function loadDecorImages() {
  for (let theme in THEME_JOBS) {
    decorImages[theme] = {};
    decorImages[theme].wall = loadImage("assets/decor/" + theme + "-wall.png");
    let jobs = THEME_JOBS[theme];
    for (let i = 0; i < jobs.length; i++) {
      decorImages[theme][jobs[i]] = loadImage("assets/decor/" + theme + "-" + jobs[i] + ".png");
    }
  }
}

//How big one tile is on screen. The room always fits the window.
function getTileSize() {
  return Math.floor(Math.min(width / ROOM_COLS, height / ROOM_ROWS));
}

//Where the top left of the room is, so the room sits in the middle of the window
function getRoomOffsetX() {
  return (width - getTileSize() * ROOM_COLS) / 2;
}

function getRoomOffsetY() {
  return (height - getTileSize() * ROOM_ROWS) / 2;
}

//Turns a tile position into the pixel in the middle of that tile
function tileToPixelX(col) {
  return getRoomOffsetX() + col * getTileSize();
}

function tileToPixelY(row) {
  return getRoomOffsetY() + row * getTileSize();
}

//Draws every tile in the room using the theme's colors
function drawRoom(room, theme) {
  let colors = THEME_COLORS[theme];
  if (!colors) {
    colors = THEME_COLORS.stone;
  }

  let size = getTileSize();
  let offsetX = getRoomOffsetX();
  let offsetY = getRoomOffsetY();
  let pictures = decorImages[theme];

  push();
  rectMode(CORNER);
  imageMode(CORNER);
  noStroke();

  for (let row = 0; row < ROOM_ROWS; row++) {
    for (let col = 0; col < ROOM_COLS; col++) {
      let tile = room.tiles[row][col];
      let x = offsetX + col * size;
      let y = offsetY + row * size;

      if (tile === WALL) {
        //Brick picture if we have one, flat color if not
        if (pictures && pictures.wall) {
          image(pictures.wall, x, y, size, size);
          continue;
        }
        fill(colors.wall);
      } else if (tile === DOOR) {
        fill(colors.door);
      } else if ((row + col) % 2 === 0) {
        //FLOOR, SOLID and EXIT all get a floor square first
        fill(colors.floor);
      } else {
        fill(colors.floorAlt);
      }
      rect(x, y, size, size);

      //The exit is a dark doorway with a gold frame
      if (tile === EXIT) {
        fill(20, 15, 25);
        rect(x + size * 0.2, y + size * 0.1, size * 0.6, size * 0.8);
        stroke(230, 190, 70);
        strokeWeight(3);
        noFill();
        rect(x + size * 0.2, y + size * 0.1, size * 0.6, size * 0.8);
        noStroke();
      }
    }
  }

  drawRoomDecor(room, theme);
  pop();
}

//Draws every decor piece in the room on top of the tiles.
//SOLID tiles are drawn as floor first so the piece sits on floor, not on a wall color.
function drawRoomDecor(room, theme) {
  let pictures = decorImages[theme];
  if (!pictures || !room.decor) {
    return;
  }
  let size = getTileSize();
  let offsetX = getRoomOffsetX();
  let offsetY = getRoomOffsetY();

  for (let i = 0; i < room.decor.length; i++) {
    let piece = room.decor[i];
    let img = pictures[piece.job];
    if (!img) {
      continue;
    }
    let wide = DECOR_JOBS[piece.job].wide;
    let tall = DECOR_JOBS[piece.job].tall;
    image(img, offsetX + piece.col * size, offsetY + piece.row * size, size * wide, size * tall);
  }
}

//Small label in the corner so you can tell which dungeon you are in
function drawDungeonLabel(dungeonNumber, theme) {
  push();
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(NORMAL);
  text("Dungeon " + dungeonNumber + "  (" + theme + ")", 12, 10);
  pop();
}
