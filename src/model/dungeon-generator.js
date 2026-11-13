//Builds a random dungeon made of rooms laid out on a grid, like Zelda.
//Each room is one screen. Doors on the edges lead to the room next door.
//No p5 in this file so it can be tested with Jasmine.

//How many room slots the dungeon has and how many get used
let DUNGEON_GRID_ROWS = 4;
let DUNGEON_GRID_COLS = 5;
let MIN_ROOMS = 7;
let MAX_ROOMS = 10;

//Each dungeon gets a random look
let DUNGEON_THEMES = ["stone", "lava", "ice"];

//The four ways you can leave a room
let DIRECTIONS = [
  { name: "up", rowStep: -1, colStep: 0, opposite: "down" },
  { name: "down", rowStep: 1, colStep: 0, opposite: "up" },
  { name: "left", rowStep: 0, colStep: -1, opposite: "right" },
  { name: "right", rowStep: 0, colStep: 1, opposite: "left" },
];

//Simple seeded random so the same seed always builds the same dungeon.
//That makes the generator testable and lets us replay a dungeon later.
let randomState = 1;

function setRandomSeed(seed) {
  randomState = (Math.abs(Math.floor(seed)) % 2147483646) + 1;
}

//Gives a number from 0 up to (not including) 1
function nextRandom() {
  randomState = (randomState * 48271) % 2147483647;
  return randomState / 2147483647;
}

//Gives a whole number from min to max, both included
function randomInt(min, max) {
  return min + Math.floor(nextRandom() * (max - min + 1));
}

//Finds a direction by its name
function getDirection(name) {
  for (let i = 0; i < DIRECTIONS.length; i++) {
    if (DIRECTIONS[i].name === name) {
      return DIRECTIONS[i];
    }
  }
  return null;
}

//Makes one room with walls, floor and a few random obstacles.
function makeRoom(gridRow, gridCol) {
  let room = {
    row: gridRow,
    col: gridCol,
    tiles: makeEmptyRoom(),
    doors: { up: false, down: false, left: false, right: false },
    isStart: false,
    isExit: false,
  };
  addObstacles(room.tiles);
  return room;
}

//Drops a few wall blocks inside the room, never in the lane between the doors.
//If a block would cut off part of the room it is taken back out.
function addObstacles(tiles) {
  let howMany = randomInt(0, 3);
  for (let i = 0; i < howMany; i++) {
    let row = randomInt(2, ROOM_ROWS - 3);
    let col = randomInt(2, ROOM_COLS - 3);
    if (isInDoorLane(row, col)) {
      continue;
    }
    tiles[row][col] = WALL;
    //Make sure every floor tile can still be reached from the middle
    let reachable = countReachableTiles(tiles, MIDDLE_ROW, MIDDLE_COL);
    if (reachable !== countWalkableTiles(tiles)) {
      tiles[row][col] = FLOOR;
    }
  }
}

//Cuts a door into one edge of the room
function addDoor(room, directionName) {
  let half = Math.floor(DOOR_WIDTH / 2);
  room.doors[directionName] = true;
  for (let offset = -half; offset <= half; offset++) {
    if (directionName === "up") {
      room.tiles[0][MIDDLE_COL + offset] = DOOR;
    } else if (directionName === "down") {
      room.tiles[ROOM_ROWS - 1][MIDDLE_COL + offset] = DOOR;
    } else if (directionName === "left") {
      room.tiles[MIDDLE_ROW + offset][0] = DOOR;
    } else if (directionName === "right") {
      room.tiles[MIDDLE_ROW + offset][ROOM_COLS - 1] = DOOR;
    }
  }
}

//True if (row, col) is a real spot on the dungeon grid
function isOnGrid(row, col) {
  return row >= 0 && row < DUNGEON_GRID_ROWS && col >= 0 && col < DUNGEON_GRID_COLS;
}

//Builds a whole dungeon. Give it a seed to get the same dungeon back,
//or leave the seed out for a random one.
function generateDungeon(seed) {
  if (seed === undefined) {
    seed = Math.floor(Math.random() * 1000000);
  }
  setRandomSeed(seed);

  //Start with an empty grid of room slots
  let rooms = [];
  for (let row = 0; row < DUNGEON_GRID_ROWS; row++) {
    rooms.push([]);
    for (let col = 0; col < DUNGEON_GRID_COLS; col++) {
      rooms[row].push(null);
    }
  }

  //Wander around the grid making rooms until there are enough.
  //Because every new room touches the one before it, they are all connected.
  let wantRooms = randomInt(MIN_ROOMS, MAX_ROOMS);
  let row = randomInt(0, DUNGEON_GRID_ROWS - 1);
  let col = randomInt(0, DUNGEON_GRID_COLS - 1);
  let startRow = row;
  let startCol = col;
  rooms[row][col] = makeRoom(row, col);
  let madeRooms = 1;
  let tries = 0;

  while (madeRooms < wantRooms && tries < 1000) {
    tries++;
    let d = DIRECTIONS[randomInt(0, DIRECTIONS.length - 1)];
    let newRow = row + d.rowStep;
    let newCol = col + d.colStep;
    if (!isOnGrid(newRow, newCol)) {
      continue;
    }
    row = newRow;
    col = newCol;
    if (rooms[row][col] === null) {
      rooms[row][col] = makeRoom(row, col);
      madeRooms++;
    }
  }

  //Put doors between every pair of rooms that sit next to each other
  for (let r = 0; r < DUNGEON_GRID_ROWS; r++) {
    for (let c = 0; c < DUNGEON_GRID_COLS; c++) {
      let room = rooms[r][c];
      if (room === null) {
        continue;
      }
      for (let i = 0; i < DIRECTIONS.length; i++) {
        let d = DIRECTIONS[i];
        let nr = r + d.rowStep;
        let nc = c + d.colStep;
        if (isOnGrid(nr, nc) && rooms[nr][nc] !== null) {
          addDoor(room, d.name);
        }
      }
    }
  }

  //The exit goes in the room farthest from the start
  let exitRow = startRow;
  let exitCol = startCol;
  let farthest = -1;
  for (let r = 0; r < DUNGEON_GRID_ROWS; r++) {
    for (let c = 0; c < DUNGEON_GRID_COLS; c++) {
      if (rooms[r][c] === null) {
        continue;
      }
      let distance = Math.abs(r - startRow) + Math.abs(c - startCol);
      if (distance > farthest) {
        farthest = distance;
        exitRow = r;
        exitCol = c;
      }
    }
  }

  rooms[startRow][startCol].isStart = true;
  rooms[exitRow][exitCol].isExit = true;
  rooms[exitRow][exitCol].tiles[MIDDLE_ROW][MIDDLE_COL] = EXIT;

  return {
    seed: seed,
    theme: DUNGEON_THEMES[randomInt(0, DUNGEON_THEMES.length - 1)],
    rooms: rooms,
    roomCount: madeRooms,
    startRow: startRow,
    startCol: startCol,
    exitRow: exitRow,
    exitCol: exitCol,
  };
}

//Counts the rooms that actually exist in a dungeon
function countRooms(dungeon) {
  let count = 0;
  for (let r = 0; r < DUNGEON_GRID_ROWS; r++) {
    for (let c = 0; c < DUNGEON_GRID_COLS; c++) {
      if (dungeon.rooms[r][c] !== null) {
        count++;
      }
    }
  }
  return count;
}

//True if you can walk from the start room to every other room through doors
function allRoomsReachable(dungeon) {
  let seen = {};
  let toVisit = [[dungeon.startRow, dungeon.startCol]];
  seen[dungeon.startRow + "," + dungeon.startCol] = true;
  let reached = 0;

  while (toVisit.length > 0) {
    let spot = toVisit.pop();
    let room = dungeon.rooms[spot[0]][spot[1]];
    reached++;
    for (let i = 0; i < DIRECTIONS.length; i++) {
      let d = DIRECTIONS[i];
      if (!room.doors[d.name]) {
        continue;
      }
      let nr = spot[0] + d.rowStep;
      let nc = spot[1] + d.colStep;
      let key = nr + "," + nc;
      if (isOnGrid(nr, nc) && dungeon.rooms[nr][nc] !== null && !seen[key]) {
        seen[key] = true;
        toVisit.push([nr, nc]);
      }
    }
  }
  return reached === countRooms(dungeon);
}
