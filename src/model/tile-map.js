//Shared tile grid stuff for dungeon rooms and towns.
//A room is a 2D array of tiles, tiles[row][col].
//No p5 in this file so it can be tested with Jasmine.

//Every room is the same size so one room fills the screen like Zelda
let ROOM_COLS = 15;
let ROOM_ROWS = 11;

//Tile types
let FLOOR = 0;
let WALL = 1;
let DOOR = 2;
let EXIT = 3;

//Doors sit in the middle of each edge and are 3 tiles wide
let DOOR_WIDTH = 3;
let MIDDLE_ROW = Math.floor(ROOM_ROWS / 2);
let MIDDLE_COL = Math.floor(ROOM_COLS / 2);

//Makes a room with walls around the edge and floor in the middle.
function makeEmptyRoom() {
  let tiles = [];
  for (let row = 0; row < ROOM_ROWS; row++) {
    tiles.push([]);
    for (let col = 0; col < ROOM_COLS; col++) {
      if (row === 0 || row === ROOM_ROWS - 1 || col === 0 || col === ROOM_COLS - 1) {
        tiles[row].push(WALL);
      } else {
        tiles[row].push(FLOOR);
      }
    }
  }
  return tiles;
}

//True if the player can stand on this tile.
//Anything off the grid counts as a wall.
function isWalkable(tiles, row, col) {
  if (row < 0 || row >= ROOM_ROWS || col < 0 || col >= ROOM_COLS) {
    return false;
  }
  return tiles[row][col] !== WALL;
}

//True if the tile is in the strip down the middle of the room
//that connects all four doors. We never put obstacles there.
function isInDoorLane(row, col) {
  let half = Math.floor(DOOR_WIDTH / 2);
  let inMiddleRow = row >= MIDDLE_ROW - half && row <= MIDDLE_ROW + half;
  let inMiddleCol = col >= MIDDLE_COL - half && col <= MIDDLE_COL + half;
  return inMiddleRow || inMiddleCol;
}

//Counts how many walkable tiles you can reach from (row, col)
//without crossing a wall. Used to make sure a room has no cut off spots.
function countReachableTiles(tiles, row, col) {
  let seen = [];
  for (let r = 0; r < ROOM_ROWS; r++) {
    seen.push([]);
    for (let c = 0; c < ROOM_COLS; c++) {
      seen[r].push(false);
    }
  }

  let toVisit = [[row, col]];
  seen[row][col] = true;
  let count = 0;

  while (toVisit.length > 0) {
    let spot = toVisit.pop();
    let r = spot[0];
    let c = spot[1];
    count++;

    let neighbors = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];
    for (let i = 0; i < neighbors.length; i++) {
      let nr = neighbors[i][0];
      let nc = neighbors[i][1];
      if (isWalkable(tiles, nr, nc) && !seen[nr][nc]) {
        seen[nr][nc] = true;
        toVisit.push([nr, nc]);
      }
    }
  }
  return count;
}

//Counts every walkable tile in the room.
function countWalkableTiles(tiles) {
  let count = 0;
  for (let row = 0; row < ROOM_ROWS; row++) {
    for (let col = 0; col < ROOM_COLS; col++) {
      if (tiles[row][col] !== WALL) {
        count++;
      }
    }
  }
  return count;
}
