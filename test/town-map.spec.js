// Town movement and dungeon-to-town progression tests.

describe("town progression", function() {
  it("sends Dungeon 1 to Town 1", function() {
    expect(getTownAfterDungeon(1)).toBe(1);
  });

  it("sends Dungeons 2 and 3 to Town 2", function() {
    expect(getTownAfterDungeon(2)).toBe(2);
    expect(getTownAfterDungeon(3)).toBe(2);
  });

  it("sends Town 1 to Dungeon 2 and Town 2 to Dungeon 3", function() {
    expect(getNextDungeonFromTown(1, false)).toBe(2);
    expect(getNextDungeonFromTown(2, false)).toBe(3);
  });

  it("does not create Dungeon 4 after finishing Dungeon 3", function() {
    expect(getNextDungeonFromTown(2, true)).toBe(null);
  });
});

describe("town walkable areas", function() {
  let map;

  beforeEach(function() {
    map = {
      width: 4,
      height: 4,
      tilewidth: 64,
      tileheight: 64,
      layers: [{
        name: "Walkable",
        objects: [{
          x: 20,
          y: 20,
          polygon: [
            { x: 0, y: 0 },
            { x: 80, y: 0 },
            { x: 80, y: 80 },
            { x: 0, y: 80 }
          ]
        }, {
          x: 90,
          y: 20,
          width: 70,
          height: 80
        }]
      }]
    };
  });

  it("allows the inside of a walkable polygon", function() {
    expect(canWalkInTown(map, 50, 50)).toBe(true);
  });

  it("blocks the rest of the town", function() {
    expect(canWalkInTown(map, 190, 190)).toBe(false);
  });

  it("joins overlapping walkable areas", function() {
    expect(canWalkInTown(map, 95, 60)).toBe(true);
    expect(canWalkInTown(map, 140, 60)).toBe(true);
  });

  it("blocks movement outside the map", function() {
    expect(canWalkInTown(map, -1, 30)).toBe(false);
    expect(canWalkInTown(map, 256, 30)).toBe(false);
  });
});
