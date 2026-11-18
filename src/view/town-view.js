// Displays the Tiled town inside the main Mage Quest game.
// Town 1 and Town 2 use separate Tiled maps and sprite folders.

const TOWN_ZOOM = 1.6; // Slightly zoomed out in both towns
const TOWN_SPEED = 162; // Town pixels per second

// The two towns use different artwork but the same movement and portal code.
const TOWN_FILES = {
  1: {
    map: "assets/towns/town1.json",
    ground: "assets/towns/Town1Ground.png",
    objects: "assets/towns/objects/"
  },
  2: {
    map: "assets/towns/town2.json",
    ground: "assets/towns/Town2Ground.png",
    objects: "assets/towns/town2_objects/"
  }
};

// Tiled may leave the Name field blank when you place a new sprite.
// Town 2 can also find the correct PNG from its tileset tile ID.
const TOWN2_TILE_NAMES = [
  "town2_blacksmith_shop",
  "town2_fern_01",
  "town2_fern_02",
  "town2_fern_03",
  "town2_moss_rock_01",
  "town2_moss_rock_02",
  "town2_mushrooms_01",
  "town2_mushrooms_02",
  "town2_mushrooms_03",
  "town2_portal",
  "town2_prop_01",
  "town2_prop_02",
  "town2_prop_03",
  "town2_prop_04",
  "town2_prop_05",
  "town2_prop_06",
  "town2_prop_07",
  "town2_prop_08",
  "town2_prop_09",
  "town2_prop_10",
  "town2_prop_11",
  "town2_prop_12",
  "town2_prop_13",
  "town2_prop_14",
  "town2_prop_15",
  "town2_prop_16",
  "town2_prop_17",
  "town2_prop_18",
  "town2_prop_19",
  "town2_runestone",
  "town2_sell_shop",
  "town2_spell_shop",
  "town2_stump",
  "town2_tree_01",
  "town2_tree_02",
  "town2_tree_03",
  "town2_tree_04",
  "town2_tree_05",
  "town2_tree_06",
  "town2_tree_07",
  "town2_tree_08",
  "town2_tree_09",
  "town2_tree_10",
  "town2_tree_11",
  "town2_tree_12",
  "town2_upgrade_shop"
];

function getTownSpritePath(object, number) {
  let name = object.name;

  if (number === 2 && object.gid) {
    // Ignore Tiled's flip flags when looking up the tile number.
    let tileId = (object.gid & 0x1FFFFFFF) - 385;
    if (tileId >= 0 && tileId < TOWN2_TILE_NAMES.length) {
      name = TOWN2_TILE_NAMES[tileId];
    }
  }

  if (!name) {
    return null;
  }
  return TOWN_FILES[number].objects + name + ".png";
}

let townMaps = {};
let townGroundImages = {};
let townMap = null;
let townGroundImage = null;
let townSprites = {};
let townLoadingSprites = {};
let townPlayer = { x: 0, y: 0 };

// Called by the game's preload().
function preloadTown() {
  for (let number of [1, 2]) {
    let files = TOWN_FILES[number];

    // Share a file only when both town entries point to the same path.
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
      let path = getTownSpritePath(object, number);
      if (!path || townLoadingSprites[path]) {
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
  portalConfirmationOpen = false;
  portalNeedsExit = false;
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

  let path = getTownSpritePath(object, currentTown);
  let img = path ? townSprites[path] : null;
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

  // The mage pictures are now 4-column, 3-row animation sheets.
  // drawPlayer() chooses one frame and animates it using WASD / arrows.
  // drawPlayer() centers the sprite, but townPlayer marks the feet.
  let frameHeight = img.height / 3;
  let playerHeight = frameHeight * MAGE_SCALE;

  drawPlayer(townPlayer.x, townPlayer.y - playerHeight / 2, playerMage);
}

function drawTown() {
  if (!townMap || !townGroundImage) {
    return;
  }

  if (!portalConfirmationOpen) {
    moveTownPlayer();
    checkTownPortalEntry();
  }

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

  pop();

  if (portalConfirmationOpen) {
    drawPortalConfirmation();
  }
}
