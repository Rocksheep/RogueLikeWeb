import Player from './entities/Player';
import GameMap from './map/GameMap';
import Sprite from './rendering/Sprite';
import MapRenderer from './rendering/MapRenderer';

class Game {

    constructor(canvas) {
        this.width = 50;
        this.height = 35;
        this.squareSize = 16;
        this.sprite = new Sprite('../assets/img/entities.png', this.squareSize, this.squareSize);
        this.quit = false;
        this.renderers = [];
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameMap = null;
        this.player = null;
    }

    start() {
        this.player = new Player(0, 0, this.sprite);
        this.gameMap = new GameMap(this.width, this.height, this.player);
        this.gameMap.makeMap(20, 5, 10);
        this.renderers.push(new MapRenderer(this.gameMap, this.sprite));


        window.addEventListener('keydown', (e) => this.keyPresses(e));
        this.update();
    }

    keyPresses(e) {
        let movement = {x:0,y:0};
        switch (e.keyCode) {
            case 38:
                movement.y = -1;
                break;
            case 39:
                movement.x = 1;
                break;
            case 40:
                movement.y = 1;
                break;
            case 37:
                movement.x = -1;
                break;
        }

        let destinationX = this.player.x + movement.x;
        let destinationY = this.player.y + movement.y;

        if (!this.gameMap.isBlocked(destinationX, destinationY)) {
            this.player.move(movement.x, movement.y);
        }
    }

    update() {
        this.draw();

        if (!this.quit) {
            setTimeout(() => this.update(), 20);
        }
    }

    draw() {
        this._clearScreen()

        for (var index in this.renderers) {
            this.renderers[index].render(this.ctx);
        }
        // console.log('draw');

        this.player.draw(this.ctx);
    }

    _clearScreen() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0,0,800,600);
    }
}

export default Game;