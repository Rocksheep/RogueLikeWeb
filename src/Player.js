var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.visionRadius = 9;
    this.visionMap = [];
    this.sprite = sprite;
    this.visionVectors = this.computeVisionVectors();
};

Player.prototype.move = function(dx, dy) {
    this.x += dx;
    this.y += dy;
};

Player.prototype.draw = function(ctx) {
    var x = this.x * 16;
    var y = this.y * 16;

    ctx.drawImage(this.sprite, 0, 0, 16, 16, x, y, 16, 16);
    // ctx.fillStyle = 'pink';
    // ctx.fillRect(x, y, 16, 16);
};

Player.prototype.vision = function(gameMap, ctx) {
    var fovMap = [];
    for (var y = 0; y < gameMap.height; y++) {
        for (var x = 0; x < gameMap.width; x++) {
            if (fovMap[x] === undefined) {
                fovMap[x] = [];
            }
            fovMap[x][y] = false;
        }
    }

    for (var i in this.visionVectors) {
        var vectorUnit = this.visionVectors[i];
        var distanceTravelled = 0;
        // draw line of vision
        var j = 1;
        while (distanceTravelled < vectorUnit.length) {
            var vx = Math.round(player.x + vectorUnit.x * j);
            var vy = Math.round(player.y + vectorUnit.y * j);
            distanceTravelled += Math.abs(vectorUnit.x) + Math.abs(vectorUnit.y);

            fovMap[vx][vy] = true;
            if (gameMap.tiles[vx][vy].blockSight) {
                break;
            }
            j++;
        }
    }
    return fovMap;
};

Player.prototype.computeVisionVectors = function() {
    var visionVectors = [];
    var radians = 0;
    var iterations = 56;
    for (var i = 0; i < iterations; i++) {
        radians += (2 * Math.PI) / iterations;
        var x = Math.round(this.visionRadius * Math.cos(radians)) + this.x;
        var y = Math.round(this.visionRadius * Math.sin(radians)) + this.y;

        var dx = x - this.x;
        var dy = y - this.y;
        var vectorLength = Math.sqrt(dx * dx + dy * dy);
        var vectorUnit = {x: dx / vectorLength, y: dy / vectorLength, length: vectorLength};

        visionVectors.push(vectorUnit);
    }
    return visionVectors;
};
