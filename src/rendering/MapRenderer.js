class MapRenderer {

    constructor(gameMap, sprite) {
        this.gameMap = gameMap;
        console.log(this.gameMap);
        this.sprite = sprite;
    }

    render(ctx) {
        let fovMap = this.gameMap.player.vision(this.gameMap);
        for (let y = 0; y < this.gameMap.height; y++) {
            for (let x = 0; x < this.gameMap.width; x++) {
                let wall = this.gameMap.tiles[x][y].blockSight;
                let visible = fovMap[x][y];
                if (visible || (this.gameMap.player.x === x && this.gameMap.player.y === y)) {
                    ctx.globalAlpha = 1.0;
                    // ctx.fillStyle = '#826e32';
                    // ctx.fillRect(x*16, y*16, 16, 16);

                    this.gameMap.tiles[x][y].explored = true;
                }
                else {
                    ctx.globalAlpha = 0.4;
                }
                if (this.gameMap.tiles[x][y].explored) {
                    if (wall) {
                        if (this.gameMap.tiles[x][y].type === 1) {
                            this.sprite.draw(ctx, 1, 0, x, y);
                            // console.log('drawing');
                            // ctx.drawImage(this.entitySprite, 16, 0, 16, 16, x*16, y*16, 16, 16);
                        }
                        if (this.gameMap.tiles[x][y].type === 2) {
                            this.sprite.draw(ctx, 2, 0, x, y);
                            // ctx.drawImage(this.entitySprite, 32, 0, 16, 16, x*16, y*16, 16, 16);
                        }
                        if (this.gameMap.tiles[x][y].type === 3) {
                            this.sprite.draw(ctx, 4, 0, x, y);
                            // ctx.drawImage(this.entitySprite, 16*4, 0, 16, 16, x*16, y*16, 16, 16);
                        }
                        if (this.gameMap.tiles[x][y].type === 4) {
                            this.sprite.draw(ctx, 5, 0, x, y);
                            // ctx.drawImage(this.entitySprite, 16*5, 0, 16, 16, x*16, y*16, 16, 16);
                        }
                        if (this.gameMap.tiles[x][y].type === 5) {
                            this.sprite.draw(ctx, 6, 0, x, y);
                            // ctx.drawImage(this.entitySprite, 16*6, 0, 16, 16, x*16, y*16, 16, 16);
                        }
                        if (this.gameMap.tiles[x][y].type === 6) {
                            this.sprite.draw(ctx, 3, 0, x, y);
                            // ctx.drawImage(this.entitySprite, 16*3, 0, 16, 16, x*16, y*16, 16, 16);
                        }
                    }
                    else {
                        this.sprite.draw(ctx, 7, 0, x, y);
                        // ctx.drawImage(this.entitySprite, 16 * 7, 0, 16, 16, x*16, y*16, 16, 16);
                    }
                }
                ctx.globalAlpha = 1;
            }
        }
    }
}

export default MapRenderer;