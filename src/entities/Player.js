class Player {

    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.visionRadius = 9;
        this.sprite = sprite;
        this.visionVectors = this.computeVisionVectors();
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(ctx) {
        this.sprite.draw(ctx, 0, 0, this.x, this.y);
    }

    vision(gameMap) {
        let fovMap = [];
        for (let y = 0; y < gameMap.height; y++) {
            for (let x = 0; x < gameMap.width; x++) {
                if (fovMap[x] === undefined) {
                    fovMap[x] = [];
                }
                fovMap[x][y] = false;
            }
        }

        for (let i in this.visionVectors) {
            let vectorUnit = this.visionVectors[i];
            let distanceTravelled = 0;
            // draw line of vision
            let j = 1;
            while (distanceTravelled < vectorUnit.length) {
                let vx = Math.round(this.x + vectorUnit.x * j);
                let vy = Math.round(this.y + vectorUnit.y * j);
                distanceTravelled += Math.abs(vectorUnit.x) + Math.abs(vectorUnit.y);

                fovMap[vx][vy] = true;
                if (gameMap.tiles[vx][vy].blockSight) {
                    break;
                }
                j++;
            }
        }
        return fovMap;
    }

    computeVisionVectors() {
        let visionVectors = [];
        let radians = 0;
        let iterations = 56;
        for (let i = 0; i < iterations; i++) {
            radians += (2 * Math.PI) / iterations;
            let x = Math.round(this.visionRadius * Math.cos(radians)) + this.x;
            let y = Math.round(this.visionRadius * Math.sin(radians)) + this.y;

            let dx = x - this.x;
            let dy = y - this.y;
            let vectorLength = Math.sqrt(dx * dx + dy * dy);
            let vectorUnit = {x: dx / vectorLength, y: dy / vectorLength, length: vectorLength};

            visionVectors.push(vectorUnit);
        }
        return visionVectors;
    }
}

export default Player;
