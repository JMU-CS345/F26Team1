//Decor for dungeon rooms, like statues, pillars and pools.
//Every room rolls one layout so rooms look designed instead of random.
//Solid pieces turn their tiles into SOLID so the player and enemies walk around them.
//No p5 in this file so it can be tested with Jasmine.

//Every theme has a piece for each job. The picture is assets/decor/<theme>-<job>.png.
//wide and tall are in tiles. solid means you cannot walk through it.
let DECOR_JOBS = {
  light: { wide: 1, tall: 1, solid: false, onWall: true },    //torch, lava crack, lantern. Goes next to doors.
  hanging: { wide: 1, tall: 1, solid: false, onWall: true },  //chain, cage, icicles. Top wall only.
  guardian: { wide: 1, tall: 2, solid: true, onWall: false }, //statue, colossus. Flanks the top of the room.
  corner: { wide: 1, tall: 2, solid: true, onWall: false },   //pillar, shards, crystals.
  center: { wide: 2, tall: 2, solid: true, onWall: false },   //pool, lava pool, pond.
  pair: { wide: 1, tall: 1, solid: true, onWall: false },     //brazier, vent.
  small: { wide: 1, tall: 1, solid: true, onWall: false },    //stone block, snow pile.
  skull: { wide: 1, tall: 1, solid: false, onWall: false },
  backwall: { wide: 1, tall: 2, solid: true, onWall: false }, //frozen skeleton, stands against the back wall.
};

//Which jobs each theme actually has pictures for
let THEME_JOBS = {
  stone: ["light", "hanging", "guardian", "corner", "center", "pair", "small", "skull"],
  lava: ["light", "hanging", "guardian", "corner", "center", "pair", "skull"],
  ice: ["light", "hanging", "guardian", "corner", "center", "pair", "small", "skull", "backwall"],
};

//Snow piles are soft, you can walk through them
let SOFT_SMALL_THEMES = ["ice"];

//Room layouts. Each one is a list of pieces and where they go (top left tile).
//Rooms with a center piece are never used for the start or exit room,
//because the player and the exit both sit in the middle.
let ROOM_LAYOUTS = [
  { name: "empty", usesCenter: false, pieces: [] },
  { name: "pillars", usesCenter: false, pieces: [
    { job: "corner", row: 1, col: 2 }, { job: "corner", row: 1, col: ROOM_COLS - 3 },
    { job: "corner", row: ROOM_ROWS - 3, col: 2 }, { job: "corner", row: ROOM_ROWS - 3, col: ROOM_COLS - 3 },
  ] },
  { name: "guarded", usesCenter: false, pieces: [
    { job: "guardian", row: 1, col: MIDDLE_COL - 2 }, { job: "guardian", row: 1, col: MIDDLE_COL + 2 },
  ] },
  { name: "pool", usesCenter: true, pieces: [
    { job: "center", row: MIDDLE_ROW - 1, col: MIDDLE_COL - 1 },
    { job: "pair", row: ROOM_ROWS - 4, col: 4 }, { job: "pair", row: ROOM_ROWS - 4, col: ROOM_COLS - 5 },
  ] },
  { name: "blocks", usesCenter: false, pieces: [
    { job: "small", row: 2, col: 3 }, { job: "small", row: 2, col: ROOM_COLS - 4 },
    { job: "small", row: ROOM_ROWS - 3, col: 3 }, { job: "small", row: ROOM_ROWS - 3, col: ROOM_COLS - 4 },
  ] },
  { name: "shrine", usesCenter: true, pieces: [
    { job: "guardian", row: 1, col: MIDDLE_COL - 2 }, { job: "guardian", row: 1, col: MIDDLE_COL + 2 },
    { job: "center", row: MIDDLE_ROW - 1, col: MIDDLE_COL - 1 },
    { job: "pair", row: ROOM_ROWS - 4, col: 4 }, { job: "pair", row: ROOM_ROWS - 4, col: ROOM_COLS - 5 },
  ] },
];

//True if the theme has a picture for this job
function themeHasJob(theme, job) {
  let jobs = THEME_JOBS[theme];
  if (!jobs) {
    return false;
  }
  return jobs.indexOf(job) >= 0;
}

//True if a piece is solid in this theme
function isSolidPiece(theme, job) {
  if (job === "small" && SOFT_SMALL_THEMES.indexOf(theme) >= 0) {
    return false;
  }
  return DECOR_JOBS[job].solid;
}

//True if every tile the piece would cover is plain floor
function pieceFits(room, job, row, col) {
  let size = DECOR_JOBS[job];
  for (let r = row; r < row + size.tall; r++) {
    for (let c = col; c < col + size.wide; c++) {
      if (r < 1 || r >= ROOM_ROWS - 1 || c < 1 || c >= ROOM_COLS - 1) {
        return false;
      }
      if (room.tiles[r][c] !== FLOOR) {
        return false;
      }
    }
  }
  return true;
}

//Puts one piece in the room. Solid pieces mark their tiles as SOLID.
function placePiece(room, theme, job, row, col) {
  room.decor.push({ job: job, row: row, col: col });
  if (!isSolidPiece(theme, job)) {
    return;
  }
  let size = DECOR_JOBS[job];
  for (let r = row; r < row + size.tall; r++) {
    for (let c = col; c < col + size.wide; c++) {
      room.tiles[r][c] = SOLID;
    }
  }
}

//Takes a piece back out if it broke the room
function removePiece(room, theme, job, row, col) {
  room.decor.pop();
  let size = DECOR_JOBS[job];
  for (let r = row; r < row + size.tall; r++) {
    for (let c = col; c < col + size.wide; c++) {
      if (room.tiles[r][c] === SOLID) {
        room.tiles[r][c] = FLOOR;
      }
    }
  }
}

//True if every walkable tile can still be reached from every other one.
//Starts the flood fill from the first floor tile it finds, since the middle
//might be covered by a pool.
function roomStillConnected(room) {
  let start = findWalkableTile(room.tiles);
  if (start === null) {
    return false;
  }
  return countReachableTiles(room.tiles, start.row, start.col) === countWalkableTiles(room.tiles);
}

//Tries to place a piece. Gives it back if it does not fit or cuts the room off.
function tryPlacePiece(room, theme, job, row, col) {
  if (!themeHasJob(theme, job)) {
    return false;
  }
  if (!pieceFits(room, job, row, col)) {
    return false;
  }
  placePiece(room, theme, job, row, col);
  if (!roomStillConnected(room)) {
    removePiece(room, theme, job, row, col);
    return false;
  }
  return true;
}

//Puts a light on each side of every door
function addDoorLights(room, theme) {
  if (!themeHasJob(theme, "light")) {
    return;
  }
  let gap = Math.floor(DOOR_WIDTH / 2) + 1;
  if (room.doors.up) {
    room.decor.push({ job: "light", row: 0, col: MIDDLE_COL - gap });
    room.decor.push({ job: "light", row: 0, col: MIDDLE_COL + gap });
  }
  if (room.doors.down) {
    room.decor.push({ job: "light", row: ROOM_ROWS - 1, col: MIDDLE_COL - gap });
    room.decor.push({ job: "light", row: ROOM_ROWS - 1, col: MIDDLE_COL + gap });
  }
  if (room.doors.left) {
    room.decor.push({ job: "light", row: MIDDLE_ROW - gap, col: 0 });
    room.decor.push({ job: "light", row: MIDDLE_ROW + gap, col: 0 });
  }
  if (room.doors.right) {
    room.decor.push({ job: "light", row: MIDDLE_ROW - gap, col: ROOM_COLS - 1 });
    room.decor.push({ job: "light", row: MIDDLE_ROW + gap, col: ROOM_COLS - 1 });
  }
}

//True if some decor already sits on this wall tile
function wallSpotTaken(room, row, col) {
  for (let i = 0; i < room.decor.length; i++) {
    if (room.decor[i].row === row && room.decor[i].col === col) {
      return true;
    }
  }
  return false;
}

//Hangs 0 to 2 things from the top wall, never over a door or a light
function addHangingDecor(room, theme) {
  if (!themeHasJob(theme, "hanging")) {
    return;
  }
  let howMany = randomInt(0, 2);
  for (let i = 0; i < howMany; i++) {
    let col = randomInt(1, ROOM_COLS - 2);
    if (room.tiles[0][col] !== WALL || wallSpotTaken(room, 0, col)) {
      continue;
    }
    room.decor.push({ job: "hanging", row: 0, col: col });
  }
}

//Stands 0 to 2 back wall pieces (frozen skeletons) against the top wall
function addBackWallDecor(room, theme) {
  if (!themeHasJob(theme, "backwall")) {
    return;
  }
  let howMany = randomInt(0, 2);
  for (let i = 0; i < howMany; i++) {
    let col = randomInt(1, ROOM_COLS - 2);
    if (isInDoorLane(1, col)) {
      continue;
    }
    tryPlacePiece(room, theme, "backwall", 1, col);
  }
}

//Drops a skull somewhere on the floor about one room in three
function addSkull(room, theme) {
  if (!themeHasJob(theme, "skull") || randomInt(1, 3) !== 1) {
    return;
  }
  let row = randomInt(2, ROOM_ROWS - 3);
  let col = randomInt(2, ROOM_COLS - 3);
  if (isInDoorLane(row, col)) {
    return;
  }
  tryPlacePiece(room, theme, "skull", row, col);
}

//Picks a layout and fills the room with decor.
//The start and exit rooms only get layouts that leave the middle open.
function addRoomDecor(room, theme) {
  room.decor = [];
  let keepMiddleOpen = room.isStart || room.isExit;

  let choices = [];
  for (let i = 0; i < ROOM_LAYOUTS.length; i++) {
    let layout = ROOM_LAYOUTS[i];
    if (keepMiddleOpen && layout.usesCenter) {
      continue;
    }
    choices.push(layout);
  }
  let layout = choices[randomInt(0, choices.length - 1)];
  room.layoutName = layout.name;

  for (let i = 0; i < layout.pieces.length; i++) {
    let piece = layout.pieces[i];
    let job = piece.job;
    //Lava has no blocks, so the blocks layout uses fire vents instead
    if (job === "small" && !themeHasJob(theme, "small")) {
      job = "pair";
    }
    tryPlacePiece(room, theme, job, piece.row, piece.col);
  }

  addDoorLights(room, theme);
  addHangingDecor(room, theme);
  addBackWallDecor(room, theme);
  addSkull(room, theme);
}
