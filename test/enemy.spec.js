describe("spawnEnemies", function () {
  it("spawns between one and three enemies with supported types", function () {
    let dungeon = generateDungeon(12);
    let room = dungeon.rooms[dungeon.startRow][dungeon.startCol];
    let enemies = spawnEnemies(room, MIDDLE_ROW + 0.5, MIDDLE_COL + 0.5);

    expect(enemies.length).toBeGreaterThanOrEqual(1);
    expect(enemies.length).toBeLessThanOrEqual(3);
    for (let i = 0; i < enemies.length; i++) {
      expect(ENEMY_TYPES).toContain(enemies[i].type);
    }
  });

  it("places enemies on distinct walkable tiles away from the player", function () {
    let dungeon = generateDungeon(24);
    let room = dungeon.rooms[dungeon.startRow][dungeon.startCol];
    let playerRow = MIDDLE_ROW + 0.5;
    let playerCol = MIDDLE_COL + 0.5;
    let enemies = spawnEnemies(room, playerRow, playerCol);
    let positions = [];

    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      let row = Math.floor(enemy.row);
      let col = Math.floor(enemy.col);
      let key = row + "," + col;
      expect(room.tiles[row][col]).not.toBe(WALL);
      expect(room.tiles[row][col]).not.toBe(EXIT);
      expect(key).not.toBe(Math.floor(playerRow) + "," + Math.floor(playerCol));
      expect(positions.indexOf(key)).toBe(-1);
      positions.push(key);
    }
  });
});
