// Mage Quest Town 2 - standalone browser demo.
// Reads YOUR existing town2.json. Do not overwrite your saved Walkable polygons.
// No p5.js or external internet connection is needed for this demo.

"use strict";

const SCALE = 2;
const SPEED = 162;
const EDGE_TOLERANCE = 1.5;

const canvas = document.getElementById("town-canvas");
const ctx = canvas.getContext("2d", { alpha: false });
const hint = document.getElementById("hint");
const status = document.getElementById("status");
const errorBox = document.getElementById("error");
const dialog = document.getElementById("dialog");
const dialogText = document.getElementById("dialog-text");

let town = null;
let ground = null;
let sprites = {};
let missingSprites = [];
let player = { x: 780, y: 760 };
let debug = false;
let showScenery = true;
let dialogOpen = false;
let lastFrameTime = 0;
let lastHint = "";
const heldKeys = new Set();

function getLayer(name)
{
    if (!town || !town.layers)
    {
        return null;
    }

    return town.layers.find(layer => layer.name === name) || null;
}

function getObjects(name)
{
    const layer = getLayer(name);
    return layer && layer.objects ? layer.objects : [];
}

function loadImageFile(filename)
{
    return new Promise((resolve, reject) =>
    {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("Could not load " + filename));
        image.src = filename;
    });
}

function resizeCanvas()
{
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * ratio);
    canvas.height = Math.round(window.innerHeight * ratio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.imageSmoothingEnabled = false;
}

function showError(message)
{
    errorBox.style.display = "block";
    errorBox.textContent = message;
    console.error(message);
}

async function startGame()
{
    resizeCanvas();

    try
    {
        const response = await fetch("town2.json", { cache: "no-store" });

        if (!response.ok)
        {
            throw new Error("Could not load town2.json (" + response.status + ")");
        }

        town = await response.json();
        ground = await loadImageFile("Town2Ground.png");

        const spawn = getObjects("Spawn")[0];

        if (spawn)
        {
            player.x = spawn.x;
            player.y = spawn.y;
        }

        // Load sprites by their Tiled OBJECT NAMES, not by exported tileset data.
        // This still works when Tiled exports external .tsx tilesets differently.
        const scenery = getObjects("Scenery - Y Sorted");
        const names = [...new Set(scenery.map(object => object.name))];

        await Promise.all(names.map(async name =>
        {
            const filename = "town2_objects/" + name + ".png";

            try
            {
                sprites[name] = await loadImageFile(filename);
            }
            catch (error)
            {
                missingSprites.push(filename);
            }
        }));

        if (!getLayer("Scenery - Y Sorted"))
        {
            showError("Scenery layer missing from town2.json. In Tiled, save " +
                "town1.tmx and export it again as town2.json.");
        }
        else if (missingSprites.length > 0)
        {
            showError(missingSprites.length + " scenery PNG(s) are missing. " +
                "Copy the ENTIRE objects folder from the ZIP into assets/towns/. " +
                "First missing: " + missingSprites[0]);
        }

        status.textContent = "Scenery: " + scenery.length + " objects, " +
            Object.keys(sprites).length + "/" + names.length +
            " PNGs loaded | Walkable shapes: " + getObjects("Walkable").length;

        window.town2DemoDebug = {
            sceneryCount: scenery.length,
            loadedSprites: Object.keys(sprites).length,
            expectedSprites: names.length,
            missingSprites: missingSprites,
            canWalk: (x, y) => isWalkable(x, y),
            player: player
        };

        requestAnimationFrame(gameLoop);
    }
    catch (error)
    {
        showError(error.message + ". Open town2-demo.html using Live Server, " +
            "and keep town2.json and Town2Ground.png in assets/towns/.");
    }
}

function nearLine(x, y, ax, ay, bx, by)
{
    const dx = bx - ax;
    const dy = by - ay;
    const lengthSquared = dx * dx + dy * dy;

    if (lengthSquared === 0)
    {
        return Math.hypot(x - ax, y - ay) <= EDGE_TOLERANCE;
    }

    const t = Math.max(0, Math.min(1,
        ((x - ax) * dx + (y - ay) * dy) / lengthSquared));

    return Math.hypot(x - (ax + t * dx), y - (ay + t * dy)) <=
        EDGE_TOLERANCE;
}

function insidePolygon(x, y, object)
{
    const points = object.polygon;
    let inside = false;

    for (let i = 0, j = points.length - 1; i < points.length; j = i++)
    {
        const ax = object.x + points[j].x;
        const ay = object.y + points[j].y;
        const bx = object.x + points[i].x;
        const by = object.y + points[i].y;

        // Points directly on a shared polygon edge count as walkable.
        if (nearLine(x, y, ax, ay, bx, by))
        {
            return true;
        }

        if ((ay > y) !== (by > y))
        {
            const crossingX = ax + (y - ay) * (bx - ax) / (by - ay);

            if (x < crossingX)
            {
                inside = !inside;
            }
        }
    }

    return inside;
}

function insideObject(x, y, object)
{
    if (object.polygon)
    {
        return insidePolygon(x, y, object);
    }

    // A polyline is an OPEN line, not a filled walkable area.
    if (object.polyline)
    {
        return false;
    }

    if (object.ellipse)
    {
        const rx = object.width / 2;
        const ry = object.height / 2;

        if (rx <= 0 || ry <= 0)
        {
            return false;
        }

        const nx = (x - object.x - rx) / rx;
        const ny = (y - object.y - ry) / ry;
        return nx * nx + ny * ny <= 1;
    }

    return x >= object.x - EDGE_TOLERANCE &&
        x <= object.x + object.width + EDGE_TOLERANCE &&
        y >= object.y - EDGE_TOLERANCE &&
        y <= object.y + object.height + EDGE_TOLERANCE;
}

function isWalkable(x, y)
{
    if (!ground || x < 0 || y < 0 ||
        x >= ground.width || y >= ground.height)
    {
        return false;
    }

    // All walkable polygons form ONE continuous union.
    // Only the character's FEET need to be inside any one polygon.
    return getObjects("Walkable").some(object => insideObject(x, y, object));
}

function movePlayer(dx, dy)
{
    // Small steps prevent skipping across narrow polygon boundaries.
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / 2));

    for (let i = 0; i < steps; i++)
    {
        const stepX = dx / steps;
        const stepY = dy / steps;

        if (isWalkable(player.x + stepX, player.y))
        {
            player.x += stepX;
        }

        if (isWalkable(player.x, player.y + stepY))
        {
            player.y += stepY;
        }
    }
}

function drawPlayer()
{
    ctx.fillStyle = "rgba(15, 18, 30, 0.45)";
    ctx.beginPath();
    ctx.ellipse(player.x, player.y - 2, 11, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#6842ad";
    ctx.fillRect(player.x - 8, player.y - 23, 16, 19);
    ctx.fillStyle = "#eec38c";
    ctx.beginPath();
    ctx.ellipse(player.x, player.y - 28, 8, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#392779";
    ctx.beginPath();
    ctx.moveTo(player.x - 11, player.y - 31);
    ctx.lineTo(player.x, player.y - 47);
    ctx.lineTo(player.x + 11, player.y - 31);
    ctx.closePath();
    ctx.fill();
}

function drawSceneryObject(object)
{
    const sprite = sprites[object.name];

    if (!sprite || object.visible === false)
    {
        return;
    }

    const width = object.width || sprite.naturalWidth;
    const height = object.height || sprite.naturalHeight;

    // Tiled tile objects use their bottom-left corner as the rotation origin.
    // Tiled exports clockwise rotation in degrees; canvas also rotates
    // clockwise with its downward-pointing Y axis.
    const degrees = Number(object.rotation) || 0;

    ctx.save();
    ctx.translate(object.x, object.y);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.drawImage(sprite, 0, -height, width, height);
    ctx.restore();
}

function drawWalkableOverlay()
{
    const shapes = getObjects("Walkable");

    for (const object of shapes)
    {
        ctx.beginPath();

        if (object.polygon || object.polyline)
        {
            const points = object.polygon || object.polyline;

            if (!points.length)
            {
                continue;
            }

            ctx.moveTo(object.x + points[0].x, object.y + points[0].y);

            for (let i = 1; i < points.length; i++)
            {
                ctx.lineTo(object.x + points[i].x,
                    object.y + points[i].y);
            }

            if (object.polygon)
            {
                ctx.closePath();
            }
        }
        else if (object.ellipse)
        {
            ctx.ellipse(object.x + object.width / 2,
                object.y + object.height / 2,
                object.width / 2, object.height / 2, 0, 0, Math.PI * 2);
        }
        else
        {
            ctx.rect(object.x, object.y, object.width, object.height);
        }

        if (!object.polyline)
        {
            ctx.fillStyle = "rgba(0, 205, 255, 0.16)";
            ctx.fill();
        }

        ctx.strokeStyle = object.polyline ? "#ff6666" : "#00d7ff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    for (const object of getObjects("Interactions"))
    {
        ctx.fillStyle = "rgba(45, 80, 245, 0.23)";
        ctx.strokeStyle = "rgba(55, 95, 245, 0.9)";
        ctx.lineWidth = 1;
        ctx.fillRect(object.x, object.y, object.width, object.height);
        ctx.strokeRect(object.x, object.y, object.width, object.height);
    }
}

function drawGame()
{
    const ratio = window.devicePixelRatio || 1;
    const viewWidth = window.innerWidth / SCALE;
    const viewHeight = window.innerHeight / SCALE;
    const cameraX = Math.max(0, Math.min(
        ground.width - viewWidth, player.x - viewWidth / 2));
    const cameraY = Math.max(0, Math.min(
        ground.height - viewHeight, player.y - viewHeight / 2));

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.setTransform(ratio * SCALE, 0, 0, ratio * SCALE,
        -cameraX * ratio * SCALE, -cameraY * ratio * SCALE);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(ground, 0, 0);

    const sorted = [];

    if (showScenery)
    {
        for (const object of getObjects("Scenery - Y Sorted"))
        {
            sorted.push({
                y: object.y,
                draw: () => drawSceneryObject(object)
            });
        }
    }

    sorted.push({ y: player.y, draw: drawPlayer });
    sorted.sort((a, b) => a.y - b.y);

    for (const item of sorted)
    {
        item.draw();
    }

    if (debug)
    {
        drawWalkableOverlay();
    }
}

function updateHint()
{
    let message = "WASD / arrows: move | E: interact | T: paths | O: scenery";

    if (getObjects("Walkable").length === 0)
    {
        message = "No Walkable polygons in town2.json. Export your Tiled map.";
    }
    else if (!isWalkable(player.x, player.y))
    {
        message = "Player spawn is OUTSIDE Walkable area. Fix in Tiled and export.";
    }
    else if (debug)
    {
        message = "Blue outlines are guides, NOT walls. Overlapping interiors connect.";
    }

    if (message !== lastHint)
    {
        hint.textContent = message;
        lastHint = message;
    }
}

function gameLoop(timestamp)
{
    const elapsed = lastFrameTime ? (timestamp - lastFrameTime) / 1000 : 0;
    const dt = Math.min(elapsed, 0.04);
    lastFrameTime = timestamp;

    if (!dialogOpen)
    {
        let dx = 0;
        let dy = 0;

        if (heldKeys.has("d") || heldKeys.has("ArrowRight")) dx++;
        if (heldKeys.has("a") || heldKeys.has("ArrowLeft")) dx--;
        if (heldKeys.has("s") || heldKeys.has("ArrowDown")) dy++;
        if (heldKeys.has("w") || heldKeys.has("ArrowUp")) dy--;

        if (dx || dy)
        {
            const length = Math.hypot(dx, dy);
            movePlayer(dx / length * SPEED * dt,
                dy / length * SPEED * dt);
        }
    }

    drawGame();
    updateHint();
    requestAnimationFrame(gameLoop);
}

function openInteraction()
{
    if (dialogOpen)
    {
        closeDialog();
        return;
    }

    let nearest = null;
    let distance = Infinity;

    for (const object of getObjects("Interactions"))
    {
        const centerX = object.x + object.width / 2;
        const centerY = object.y + object.height / 2;
        const currentDistance = Math.hypot(
            player.x - centerX, player.y - centerY);

        if (currentDistance < distance)
        {
            distance = currentDistance;
            nearest = object;
        }
    }

    if (nearest && distance < 115)
    {
        dialogOpen = true;
        dialog.style.display = "block";
        dialogText.textContent = nearest.name === "DungeonPortal"
            ? "Portal detected! In the main Mage Quest game, E takes you " +
              "from Town 2 into Dungeon 3."
            : nearest.name + " — shop is a placeholder for now.";
    }
}

function closeDialog()
{
    dialogOpen = false;
    dialog.style.display = "none";
}

window.addEventListener("keydown", event =>
{
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    heldKeys.add(key);

    if (key.startsWith("Arrow") || key === " ")
    {
        event.preventDefault();
    }

    if (event.repeat)
    {
        return;
    }

    if (key === "t") debug = !debug;
    if (key === "o") showScenery = !showScenery;
    if (key === "e") openInteraction();
    if (key === "Escape") closeDialog();
});

window.addEventListener("keyup", event =>
{
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    heldKeys.delete(key);
});

window.addEventListener("blur", () => heldKeys.clear());
window.addEventListener("resize", resizeCanvas);
document.getElementById("close-dialog").addEventListener("click", closeDialog);

startGame();
