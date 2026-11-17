// Displays the Tiled town inside the main Mage Quest game.
// Town 2 temporarily reuses the Town 1 artwork and objects.

const TOWN_ZOOM = 2;
const TOWN_SPEED = 162; // Town pixels per second
const TOWN_INTERACT_DISTANCE = 40;
const TOWN_MAGE_SCALE = 1;

// To add Town 2 later, change only its three file paths here.
// Both entries deliberately point to Town 1 for the current sprint.
const TOWN_FILES = {
  1: {
    map: "assets/towns/town1.json",
    ground: "assets/towns/Town1Ground.png",
    objects: "assets/towns/objects/"
  },
  2: {
    map: "assets/towns/town1.json",
    ground: "assets/towns/Town1Ground.png",
    objects: "assets/towns/objects/"
  }
};

let townMaps = {};
let townGroundImages = {};
let townMap = null;
let townGroundImage = null;
let townSprites = {};
let townLoadingSprites = {};
let townPlayer = { x: 0, y: 0 };
let showTownWalkable = false;

// Called by the game's preload().
function preloadTown() {
  for (let number of [1, 2]) {
    let files = TOWN_FILES[number];

    // Town 1 and temporary Town 2 share the same loaded files.
    if (!townMaps[files.map]) {
      townMaps[files.map] = loadJSON(files.map);
    }
    if (!townGroundImages[files.ground]) {
      townGroundImages[files.ground] = loadImage(files.ground);
    }
  }
}

function selectTownMap(number) {
  let files = TOWN_FILES[number];
  townMap = townMaps[files.map];
  townGroundImage = townGroundImages[files.ground];
}

// Called by setup(). Scenery loads in the background while playing.
function loadTownSprites() {
  for (let number of [1, 2]) {
    let files = TOWN_FILES[number];
    let map = townMaps[files.map];
    let scenery = getTownObjects(map, TOWN_SCENERY_LAYER);

    for (let object of scenery) {
      if (!object.name) {
        continue;
      }

      let path = files.objects + object.name + ".png";
      if (townLoadingSprites[path]) {
        continue;
      }
      townLoadingSprites[path] = true;

      loadImage(path, function(img) {
        townSprites[path] = img;
      }, function() {
        console.warn("Could not load town scenery: " + path);
      });
    }
  }
}

function resetTownPlayer() {
  let spawns = getTownObjects(townMap, "Spawn");
  if (spawns.length > 0) {
    townPlayer.x = spawns[0].x;
    townPlayer.y = spawns[0].y;
  } else {
    townPlayer.x = 789;
    townPlayer.y = 819;
  }

  if (!canWalkInTown(townMap, townPlayer.x, townPlayer.y)) {
    console.warn("Town spawn is outside the Walkable area.");
  }
}

function moveTownPlayer() {
  let dx = 0;
  let dy = 0;

  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) dx--;
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) dx++;
  if (keyIsDown(87) || keyIsDown(UP_ARROW)) dy--;
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) dy++;

  if (dx === 0 && dy === 0) {
    return;
  }

  let length = Math.hypot(dx, dy);
  let amount = TOWN_SPEED * Math.min(deltaTime, 50) / 1000;
  dx = dx / length * amount;
  dy = dy / length * amount;

  // Small steps prevent skipping over narrow polygon boundaries.
  let steps = Math.max(1,
    Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / 2));

  for (let i = 0; i < steps; i++) {
    let stepX = dx / steps;
    let stepY = dy / steps;

    if (canWalkInTown(townMap, townPlayer.x + stepX, townPlayer.y)) {
      townPlayer.x += stepX;
    }
    if (canWalkInTown(townMap, townPlayer.x, townPlayer.y + stepY)) {
      townPlayer.y += stepY;
    }
  }
}

function drawTownScenery(object) {
  if (object.visible === false) {
    return;
  }

  let path = TOWN_FILES[currentTown].objects + object.name + ".png";
  let img = townSprites[path];
  if (!img) {
    return;
  }

  let objectWidth = object.width || img.width;
  let objectHeight = object.height || img.height;

  // Tiled rotates tile objects around their bottom-left corner.
  push();
  translate(object.x, object.y);
  rotate(radians(Number(object.rotation) || 0));
  imageMode(CORNER);
  image(img, 0, -objectHeight, objectWidth, objectHeight);
  pop();
}

function drawTownMage() {
  let img = mageImages[playerMage];
  if (!img) {
    img = mageImages[DEFAULT_MAGE_TYPE];
  }
  if (!img) {
    return;
  }

  let playerWidth = img.width * TOWN_MAGE_SCALE;
  let playerHeight = img.height * TOWN_MAGE_SCALE;

  push();
  imageMode(CORNER);
  image(img, townPlayer.x - playerWidth / 2,
    townPlayer.y - playerHeight, playerWidth, playerHeight);
  pop();
}

function drawTownWalkableAreas() {
  let areas = getTownObjects(townMap, "Walkable");

  push();
  fill(0, 200, 255, 40);
  stroke(0, 220, 255);
  strokeWeight(2);

  for (let area of areas) {
    if (area.polygon) {
      beginShape();
      for (let point of area.polygon) {
        vertex(area.x + point.x, area.y + point.y);
      }
      endShape(CLOSE);
    } else if (!area.polyline) {
      rect(area.x, area.y, area.width, area.height);
    }
  }
  pop();
}

function isTownPortalNearby() {
  return isNearTownObject(getTownPortal(townMap),
    townPlayer.x, townPlayer.y, TOWN_INTERACT_DISTANCE);
}

function drawTown() {
  if (!townMap || !townGroundImage) {
    return;
  }

  moveTownPlayer();

  let mapWidth = townGroundImage.width;
  let mapHeight = townGroundImage.height;
  let viewWidth = width / TOWN_ZOOM;
  let viewHeight = height / TOWN_ZOOM;

  let cameraX = constrain(townPlayer.x - viewWidth / 2,
    0, max(0, mapWidth - viewWidth));
  let cameraY = constrain(townPlayer.y - viewHeight / 2,
    0, max(0, mapHeight - viewHeight));

  push();
  translate(-cameraX * TOWN_ZOOM, -cameraY * TOWN_ZOOM);
  scale(TOWN_ZOOM);
  imageMode(CORNER);
  image(townGroundImage, 0, 0);

  // Draw everything from north to south, including the player.
  let things = [];
  let scenery = getTownObjects(townMap, TOWN_SCENERY_LAYER);

  for (let object of scenery) {
    things.push({ y: object.y, object: object });
  }
  things.push({ y: townPlayer.y, player: true });
  things.sort(function(a, b) {
    return a.y - b.y;
  });

  for (let thing of things) {
    if (thing.player) {
      drawTownMage();
    } else {
      drawTownScenery(thing.object);
    }
  }

  if (showTownWalkable) {
    drawTownWalkableAreas();
  }
  pop();

  drawTownHUD();
}

function drawTownHUD() {
  let label = "Town " + currentTown;
  if (currentTown === 2) {
    label += " (using Town 1 map for now)";
  }

  let message = "WASD / arrows: move  |  E: portal  |  T: paths";
  if (finishedThreeDungeons) {
    message = "All 3 dungeons complete! Ending screen coming later.";
  } else if (isTownPortalNearby()) {
    let next = getNextDungeonFromTown(currentTown, false);
    message = "Press E to enter Dungeon " + next;
  }

  push();
  rectMode(CORNER);
  noStroke();
  fill(0, 0, 0, 180);
  rect(8, 8, Math.min(width - 16, 560), 63, 6);
  fill(255);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  textSize(18);
  text(label, 18, 14);
  textSize(14);
  text(message, 18, 43);
  pop();
}
