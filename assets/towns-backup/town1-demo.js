// Standalone Mage Quest Town 1 demo. The only walkable space is
// inside polygons or rectangles drawn on Tiled's Walkable object layer.
let mapImage, townData;
let player = { x: 2291, y: 1844 };
let debug = false;
let dialogOpen = false;
const SCALE = 2;
const PLAYER_RADIUS = 7;
const SPEED = 2.7;

function preload()
{
    mapImage = loadImage('Town1Artwork.png');
    townData = loadJSON('town1.json');
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    const spawn = objects('Spawn')[0];
    if (spawn)
    {
        player.x = spawn.x;
        player.y = spawn.y;
    }
}

function objects(name)
{
    const layer = townData.layers.find(l => l.name === name);
    return layer ? layer.objects || [] : [];
}

function pointInPolygon(x, y, points)
{
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++)
    {
        const a = points[i];
        const b = points[j];
        if ((a.y > y) !== (b.y > y) &&
            x < (b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x)
        {
            inside = !inside;
        }
    }
    return inside;
}

function insideObject(x, y, o)
{
    if (o.polygon)
    {
        const points = o.polygon.map(p => ({x: o.x + p.x, y: o.y + p.y}));
        return pointInPolygon(x, y, points);
    }
    if (o.ellipse)
    {
        const rx = o.width / 2;
        const ry = o.height / 2;
        if (!rx || !ry) return false;
        const nx = (x - o.x - rx) / rx;
        const ny = (y - o.y - ry) / ry;
        return nx * nx + ny * ny <= 1;
    }
    return x >= o.x && x <= o.x + o.width &&
           y >= o.y && y <= o.y + o.height;
}

function isWalkable(x, y)
{
    const samples = [
        [x, y],
        [x - PLAYER_RADIUS, y],
        [x + PLAYER_RADIUS, y],
        [x, y - PLAYER_RADIUS],
        [x, y + PLAYER_RADIUS]
    ];
    return samples.every(([sx, sy]) =>
        sx >= 0 && sy >= 0 &&
        sx < mapImage.width && sy < mapImage.height &&
        objects('Walkable').some(o => insideObject(sx, sy, o)));
}

function draw()
{
    const dx = Number(keyIsDown(68) || keyIsDown(RIGHT_ARROW)) -
               Number(keyIsDown(65) || keyIsDown(LEFT_ARROW));
    const dy = Number(keyIsDown(83) || keyIsDown(DOWN_ARROW)) -
               Number(keyIsDown(87) || keyIsDown(UP_ARROW));
    const length = Math.hypot(dx, dy) || 1;
    if (!dialogOpen)
    {
        const newX = player.x + dx / length * SPEED;
        const newY = player.y + dy / length * SPEED;
        if (isWalkable(newX, player.y)) player.x = newX;
        if (isWalkable(player.x, newY)) player.y = newY;
    }

    background(16);
    const vw = width / SCALE;
    const vh = height / SCALE;
    const cx = constrain(player.x - vw / 2, 0,
                         max(0, mapImage.width - vw));
    const cy = constrain(player.y - vh / 2, 0,
                         max(0, mapImage.height - vh));
    push();
    scale(SCALE);
    translate(-cx, -cy);
    image(mapImage, 0, 0);
    if (debug)
    {
        for (const o of objects('Walkable'))
        {
            push();
            fill(30, 220, 245, 75);
            stroke(0, 210, 240);
            strokeWeight(2);
            if (o.polygon)
            {
                beginShape();
                for (const p of o.polygon) vertex(o.x + p.x, o.y + p.y);
                endShape(CLOSE);
            }
            else if (o.ellipse)
            {
                ellipse(o.x + o.width / 2, o.y + o.height / 2,
                        o.width, o.height);
            }
            else rect(o.x, o.y, o.width, o.height);
            pop();
        }
        noStroke();
        fill(30, 160, 255, 95);
        for (const o of objects('Interactions'))
            rect(o.x, o.y, o.width, o.height);
    }
    noStroke();
    fill(15, 15, 25, 180);
    ellipse(player.x, player.y + 11, 22, 10);
    fill(255, 218, 130);
    ellipse(player.x, player.y - 5, 16, 18);
    fill(76, 48, 168);
    rect(player.x - 8, player.y + 3, 16, 14, 3);
    pop();

    // The map starts blocked until Walkable areas are drawn in Tiled.
    const hint = document.getElementById('hint');
    if (objects('Walkable').length === 0)
        hint.textContent = 'Draw Walkable polygons in Tiled, export town1.json, then refresh.';
    else if (!isWalkable(player.x, player.y))
        hint.textContent = 'Spawn is outside Walkable! Draw a polygon around the portal spawn.';
    else
        hint.textContent = 'WASD / Arrows: move · E: interact · T: show walkable · Esc: close';
}

function keyPressed()
{
    if (key === 't' || key === 'T') debug = !debug;
    if (keyCode === ESCAPE)
    {
        hideDialog();
        return;
    }
    if (key === 'e' || key === 'E')
    {
        if (dialogOpen)
        {
            hideDialog();
            return;
        }
        const nearest = objects('Interactions')
            .map(o => ({o, d: Math.hypot(
                player.x - (o.x + o.width / 2),
                player.y - (o.y + o.height / 2))}))
            .sort((a, b) => a.d - b.d)[0];
        if (nearest && nearest.d < 120)
        {
            const name = nearest.o.name === 'DungeonPortal'
                ? 'Dungeon portal'
                : nearest.o.name.replace('Shop', ' shop');
            showDialog(name + '<p>Interaction zone is connected. ' +
                'Hook your team’s shop menu or dungeon transition here.</p>');
        }
    }
}

function showDialog(msg)
{
    dialogOpen = true;
    const e = document.getElementById('dialog');
    e.innerHTML = '<strong>' + msg + '</strong><p>' +
        '<button onclick="hideDialog()">Close (Esc)</button></p>';
    e.style.display = 'block';
}

function hideDialog()
{
    dialogOpen = false;
    document.getElementById('dialog').style.display = 'none';
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}
