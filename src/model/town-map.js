// Town map helpers. These do not use p5.js, so they can be tested.
// Town 1 and temporary Town 2 both use the same Tiled map for now.

const TOWN_SCENERY_LAYER = "Scenery - Y Sorted";
const TOWN_EDGE_TOLERANCE = 1.5;

function getTownLayer(map, name) {
  if (!map || !map.layers) {
    return null;
  }

  for (let layer of map.layers) {
    if (layer.name === name) {
      return layer;
    }
  }
  return null;
}

function getTownObjects(map, name) {
  let layer = getTownLayer(map, name);
  if (layer && layer.objects) {
    return layer.objects;
  }
  return [];
}

// A point directly on a polygon edge should count as inside.
function isOnTownEdge(x, y, ax, ay, bx, by) {
  let dx = bx - ax;
  let dy = by - ay;
  let length = dx * dx + dy * dy;

  if (length === 0) {
    return Math.hypot(x - ax, y - ay) <= TOWN_EDGE_TOLERANCE;
  }

  let t = ((x - ax) * dx + (y - ay) * dy) / length;
  t = Math.max(0, Math.min(1, t));

  let closestX = ax + t * dx;
  let closestY = ay + t * dy;
  return Math.hypot(x - closestX, y - closestY) <=
    TOWN_EDGE_TOLERANCE;
}

function isInsideTownPolygon(object, x, y) {
  let points = object.polygon;
  let inside = false;

  for (let i = 0, j = points.length - 1;
       i < points.length; j = i++) {
    let ax = object.x + points[j].x;
    let ay = object.y + points[j].y;
    let bx = object.x + points[i].x;
    let by = object.y + points[i].y;

    if (isOnTownEdge(x, y, ax, ay, bx, by)) {
      return true;
    }

    if ((ay > y) !== (by > y)) {
      let crossingX = ax + (y - ay) * (bx - ax) / (by - ay);
      if (x < crossingX) {
        inside = !inside;
      }
    }
  }
  return inside;
}

function isInsideTownObject(object, x, y) {
  if (object.polygon) {
    return isInsideTownPolygon(object, x, y);
  }

  // A polyline is not a filled walkable shape.
  if (object.polyline) {
    return false;
  }

  if (object.ellipse) {
    let rx = object.width / 2;
    let ry = object.height / 2;
    if (rx <= 0 || ry <= 0) {
      return false;
    }
    let nx = (x - object.x - rx) / rx;
    let ny = (y - object.y - ry) / ry;
    return nx * nx + ny * ny <= 1;
  }

  return x >= object.x - TOWN_EDGE_TOLERANCE &&
    x <= object.x + object.width + TOWN_EDGE_TOLERANCE &&
    y >= object.y - TOWN_EDGE_TOLERANCE &&
    y <= object.y + object.height + TOWN_EDGE_TOLERANCE;
}

// All Walkable polygons combine into one area. Only feet are checked.
function canWalkInTown(map, x, y) {
  if (!map || x < 0 || y < 0 ||
      x >= map.width * map.tilewidth ||
      y >= map.height * map.tileheight) {
    return false;
  }

  let areas = getTownObjects(map, "Walkable");
  for (let area of areas) {
    if (isInsideTownObject(area, x, y)) {
      return true;
    }
  }
  return false;
}

function getTownPortal(map) {
  let interactions = getTownObjects(map, "Interactions");
  for (let object of interactions) {
    if (object.name === "DungeonPortal") {
      return object;
    }
  }
  return null;
}

// Find the distance to the nearest edge of an interaction rectangle.
function isNearTownObject(object, x, y, distance) {
  if (!object) {
    return false;
  }

  let nearestX = Math.max(object.x,
    Math.min(x, object.x + object.width));
  let nearestY = Math.max(object.y,
    Math.min(y, object.y + object.height));

  return Math.hypot(x - nearestX, y - nearestY) <= distance;
}

// These two functions keep game progression separate from town artwork.
function getTownAfterDungeon(number) {
  if (number === 1) {
    return 1;
  }
  return 2;
}

function getNextDungeonFromTown(townNumber, completedThree) {
  if (completedThree) {
    return null;
  }
  if (townNumber === 1) {
    return 2;
  }
  if (townNumber === 2) {
    return 3;
  }
  return null;
}
