function updateMovement(x, y) {
    let speed = 5;
    if (keyIsDown('w'))  y = y - speed;
    if (keyIsDown('a'))  x = x - speed;
    if (keyIsDown('s'))  y = y + speed;
    if (keyIsDown('d'))  x = x + speed;
}