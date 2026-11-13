describe("spawnSkeletons", function () {
  it("spawns between one and three skeletons", function () {
    let dungeon = generateDungeon(12);
    let room = dungeon.rooms[dungeon.startRow][dungeon.startCol];
    let skeletons = spawnSkeletons(room, MIDDLE_ROW + 0.5, MIDDLE_COL + 0.5);

    expect(skeletons.length).toBeGreaterThanOrEqual(1);
    expect(skeletons.length).toBeLessThanOrEqual(3);
    for (let i = 0; i < skeletons.length; i++) {
      expect(skeletons[i].type).toBe("skeleton");
    }
  });

  it("places skeletons on distinct walkable tiles away from the player", function () {
    let dungeon = generateDungeon(24);
    let room = dungeon.rooms[dungeon.startRow][dungeon.startCol];
    let playerRow = MIDDLE_ROW + 0.5;
    let playerCol = MIDDLE_COL + 0.5;
    let skeletons = spawnSkeletons(room, playerRow, playerCol);
    let positions = [];

    for (let i = 0; i < skeletons.length; i++) {
      let skeleton = skeletons[i];
      let row = Math.floor(skeleton.row);
      let col = Math.floor(skeleton.col);
      let key = row + "," + col;
      expect(room.tiles[row][col]).not.toBe(WALL);
      expect(room.tiles[row][col]).not.toBe(EXIT);
      expect(key).not.toBe(Math.floor(playerRow) + "," + Math.floor(playerCol));
      expect(positions.indexOf(key)).toBe(-1);
      positions.push(key);
    }
  });
});
