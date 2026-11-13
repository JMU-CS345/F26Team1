//Creates random enemy positions and types for a room entry.
let MIN_ROOM_SKELETONS = 1;
let MAX_ROOM_SKELETONS = 3;
let ENEMY_TYPES = ["skeleton", "slime", "zombie"];

function spawnEnemies(room, playerRow, playerCol) {
  let candidates = [];
  let playerTileRow = Math.floor(playerRow);
  let playerTileCol = Math.floor(playerCol);

  for (let row = 1; row < ROOM_ROWS - 1; row++) {
    for (let col = 1; col < ROOM_COLS - 1; col++) {
      if (room.tiles[row][col] !== WALL &&
          room.tiles[row][col] !== EXIT &&
          (row !== playerTileRow || col !== playerTileCol)) {
        candidates.push({ row: row, col: col });
      }
    }
  }

  let count = MIN_ROOM_SKELETONS +
    Math.floor(Math.random() * (MAX_ROOM_SKELETONS - MIN_ROOM_SKELETONS + 1));
  let enemies = [];

  for (let i = 0; i < count; i++) {
    let candidateIndex = Math.floor(Math.random() * candidates.length);
    let position = candidates.splice(candidateIndex, 1)[0];
    let type = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
    enemies.push({ row: position.row + 0.5, col: position.col + 0.5, type: type });
  }

  return enemies;
}
