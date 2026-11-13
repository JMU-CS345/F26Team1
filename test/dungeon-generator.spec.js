describe("makeEmptyRoom", function () {
  it("is the right size", function () {
    let tiles = makeEmptyRoom();
    expect(tiles.length).toBe(ROOM_ROWS);
    expect(tiles[0].length).toBe(ROOM_COLS);
  });

  it("has walls around the edge and floor inside", function () {
    let tiles = makeEmptyRoom();
    expect(tiles[0][3]).toBe(WALL);
    expect(tiles[ROOM_ROWS - 1][3]).toBe(WALL);
    expect(tiles[3][0]).toBe(WALL);
    expect(tiles[3][ROOM_COLS - 1]).toBe(WALL);
    expect(tiles[3][3]).toBe(FLOOR);
  });
});

describe("isWalkable", function () {
  it("treats anything off the grid as a wall", function () {
    let tiles = makeEmptyRoom();
    expect(isWalkable(tiles, -1, 3)).toBe(false);
    expect(isWalkable(tiles, 3, ROOM_COLS)).toBe(false);
  });

  it("lets you stand on floor but not walls", function () {
    let tiles = makeEmptyRoom();
    expect(isWalkable(tiles, 3, 3)).toBe(true);
    expect(isWalkable(tiles, 0, 0)).toBe(false);
  });
});

describe("generateDungeon", function () {
  it("gives the same dungeon for the same seed", function () {
    let a = generateDungeon(42);
    let b = generateDungeon(42);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it("gives a different layout for a different seed", function () {
    let a = generateDungeon(1);
    let b = generateDungeon(2);
    expect(JSON.stringify(a.rooms)).not.toBe(JSON.stringify(b.rooms));
  });

  it("makes between MIN_ROOMS and MAX_ROOMS rooms", function () {
    for (let seed = 1; seed <= 20; seed++) {
      let d = generateDungeon(seed);
      expect(countRooms(d)).toBe(d.roomCount);
      expect(d.roomCount).toBeGreaterThanOrEqual(MIN_ROOMS);
      expect(d.roomCount).toBeLessThanOrEqual(MAX_ROOMS);
    }
  });

  it("lets you reach every room from the start room", function () {
    for (let seed = 1; seed <= 20; seed++) {
      expect(allRoomsReachable(generateDungeon(seed))).toBe(true);
    }
  });

  it("puts the exit in a different room than the start", function () {
    for (let seed = 1; seed <= 20; seed++) {
      let d = generateDungeon(seed);
      let sameRoom = d.startRow === d.exitRow && d.startCol === d.exitCol;
      expect(sameRoom).toBe(false);
      expect(d.rooms[d.exitRow][d.exitCol].tiles[MIDDLE_ROW][MIDDLE_COL]).toBe(EXIT);
    }
  });

  it("only puts a door where there is a room on the other side", function () {
    let d = generateDungeon(7);
    for (let r = 0; r < DUNGEON_GRID_ROWS; r++) {
      for (let c = 0; c < DUNGEON_GRID_COLS; c++) {
        let room = d.rooms[r][c];
        if (room === null) continue;
        for (let i = 0; i < DIRECTIONS.length; i++) {
          let dir = DIRECTIONS[i];
          if (room.doors[dir.name]) {
            let neighbor = d.rooms[r + dir.rowStep][c + dir.colStep];
            expect(neighbor).not.toBe(null);
            expect(neighbor.doors[dir.opposite]).toBe(true);
          }
        }
      }
    }
  });

  it("never cuts off part of a room with obstacles", function () {
    for (let seed = 1; seed <= 20; seed++) {
      let d = generateDungeon(seed);
      for (let r = 0; r < DUNGEON_GRID_ROWS; r++) {
        for (let c = 0; c < DUNGEON_GRID_COLS; c++) {
          let room = d.rooms[r][c];
          if (room === null) continue;
          let reachable = countReachableTiles(room.tiles, MIDDLE_ROW, MIDDLE_COL);
          expect(reachable).toBe(countWalkableTiles(room.tiles));
        }
      }
    }
  });

  it("picks one of the known themes", function () {
    let d = generateDungeon(3);
    expect(DUNGEON_THEMES.indexOf(d.theme)).toBeGreaterThanOrEqual(0);
  });
});
