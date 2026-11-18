describe("addRoomDecor", function () {
  //Builds a few dungeons and hands back every room with its theme
  function allRooms() {
    let rooms = [];
    for (let seed = 1; seed <= 30; seed++) {
      let d = generateDungeon(seed);
      for (let r = 0; r < DUNGEON_GRID_ROWS; r++) {
        for (let c = 0; c < DUNGEON_GRID_COLS; c++) {
          if (d.rooms[r][c] !== null) {
            rooms.push({ room: d.rooms[r][c], theme: d.theme });
          }
        }
      }
    }
    return rooms;
  }

  it("gives every room a decor list and a layout name", function () {
    let rooms = allRooms();
    for (let i = 0; i < rooms.length; i++) {
      expect(Array.isArray(rooms[i].room.decor)).toBe(true);
      expect(typeof rooms[i].room.layoutName).toBe("string");
    }
  });

  it("only uses pieces the theme has pictures for", function () {
    let rooms = allRooms();
    for (let i = 0; i < rooms.length; i++) {
      let decor = rooms[i].room.decor;
      for (let j = 0; j < decor.length; j++) {
        expect(themeHasJob(rooms[i].theme, decor[j].job)).toBe(true);
      }
    }
  });

  it("never covers a door, the exit or the middle of the start room", function () {
    let rooms = allRooms();
    for (let i = 0; i < rooms.length; i++) {
      let room = rooms[i].room;
      let tiles = room.tiles;
      if (room.isExit) {
        expect(tiles[MIDDLE_ROW][MIDDLE_COL]).toBe(EXIT);
      }
      if (room.isStart) {
        expect(tiles[MIDDLE_ROW][MIDDLE_COL]).toBe(FLOOR);
      }
      for (let r = 0; r < ROOM_ROWS; r++) {
        for (let c = 0; c < ROOM_COLS; c++) {
          let onEdge = r === 0 || r === ROOM_ROWS - 1 || c === 0 || c === ROOM_COLS - 1;
          if (onEdge) {
            expect(tiles[r][c] === WALL || tiles[r][c] === DOOR).toBe(true);
          }
        }
      }
    }
  });

  it("keeps every walkable tile reachable after decor is placed", function () {
    let rooms = allRooms();
    for (let i = 0; i < rooms.length; i++) {
      let tiles = rooms[i].room.tiles;
      let start = findWalkableTile(tiles);
      expect(start).not.toBe(null);
      expect(countReachableTiles(tiles, start.row, start.col)).toBe(countWalkableTiles(tiles));
    }
  });

  it("only hangs things from the top wall", function () {
    let rooms = allRooms();
    for (let i = 0; i < rooms.length; i++) {
      let decor = rooms[i].room.decor;
      for (let j = 0; j < decor.length; j++) {
        if (decor[j].job === "hanging") {
          expect(decor[j].row).toBe(0);
        }
      }
    }
  });

  it("marks solid pieces as SOLID tiles and leaves soft ones as floor", function () {
    let room = makeRoom(0, 0);
    room.decor = [];
    placePiece(room, "stone", "corner", 1, 2);
    expect(room.tiles[1][2]).toBe(SOLID);
    expect(room.tiles[2][2]).toBe(SOLID);
    placePiece(room, "stone", "skull", 5, 10);
    expect(room.tiles[5][10]).toBe(FLOOR);
    placePiece(room, "ice", "small", 7, 10);
    expect(room.tiles[7][10]).toBe(FLOOR);
  });

  it("will not place a piece on top of another one", function () {
    let room = makeRoom(0, 0);
    room.decor = [];
    expect(tryPlacePiece(room, "stone", "corner", 1, 2)).toBe(true);
    expect(tryPlacePiece(room, "stone", "corner", 2, 2)).toBe(false);
    expect(room.decor.length).toBe(1);
  });

  it("puts a light on both sides of every door", function () {
    let d = generateDungeon(5);
    let room = d.rooms[d.startRow][d.startCol];
    let lights = 0;
    let doorCount = 0;
    for (let i = 0; i < room.decor.length; i++) {
      if (room.decor[i].job === "light") lights++;
    }
    for (let name in room.doors) {
      if (room.doors[name]) doorCount++;
    }
    expect(lights).toBe(doorCount * 2);
  });
});
