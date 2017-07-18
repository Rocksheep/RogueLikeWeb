import Tile from './Tile';
import Rect from './Rect';

class GameMap {

    constructor(width, height, player) {
        this.width = width;
        this.height = height;
        this.player = player;
        this.tiles = this.initializeTiles();
    }

    initializeTiles() {
        var tiles = [];
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (tiles[x] === undefined) {
                    tiles[x] = [];
                }
                tiles[x][y] = new Tile(true);
            }
        }
        return tiles;
    }

    makeMap(maxRooms, minRoomSize, maxRoomSize) {
        this.rooms = [];
        var numberOfRooms = 0;

        for (var r = 0; r < maxRooms; r++ ) {
            var w = Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1) + minRoomSize);
            var h = Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1) + minRoomSize);

            var x = Math.floor(Math.random() * (this.width - w -1));
            var y = Math.floor(Math.random() * (this.height - h - 1));

            var newRoom = new Rect(x, y, w, h);
            var intersected = false;

            for (var index in this.rooms) {
                if (newRoom.intersects(this.rooms[index])) {
                    intersected = true;
                    break;
                }
            }
            if (!intersected) {
                var center = newRoom.center();
                if (numberOfRooms === 0) {
                    this.player.x = center.x;
                    this.player.y = center.y;
                }
                else {
                    var coin = Math.floor(Math.random() * 2) + 1;

                    var oldCenter = this.rooms[numberOfRooms-1].center();
                    if (coin === 1) {
                        this.createHorizontalTunnel(center.x, oldCenter.x, center.y);
                        this.createVerticalTunnel(oldCenter.x, center.y, oldCenter.y);
                    }
                    else {
                        this.createVerticalTunnel(center.x, center.y, oldCenter.y);
                        this.createHorizontalTunnel(center.x, oldCenter.x, oldCenter.y);
                    }
                }

                this.createRoom(newRoom);
                this.rooms.push(newRoom);
                numberOfRooms++;
            }
        }


        // determine tile types
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {

                //inner corner pieces
                var succeeded = false;
                if ((x > 0 && x < this.width - 1 && y > 0 && y < this.height - 1)) {
                    if (!this.tiles[x+1][y].blockSight && !this.tiles[x][y-1].blockSight &&
                        this.tiles[x-1][y].blockSight && this.tiles[x][y+1].blockSight) {
                        this.tiles[x][y].type = 4;
                        succeeded = true;
                    }
                    else if (!this.tiles[x-1][y].blockSight && !this.tiles[x][y+1].blockSight &&
                        this.tiles[x+1][y].blockSight && this.tiles[x][y-1].blockSight) {
                        this.tiles[x][y].type = 6;
                        succeeded = true;
                    }
                    else if (!this.tiles[x+1][y].blockSight && !this.tiles[x][y+1].blockSight &&
                        this.tiles[x-1][y].blockSight && this.tiles[x][y-1].blockSight) {
                        this.tiles[x][y].type = 5;
                        succeeded = true;
                    }
                    else if (!this.tiles[x-1][y].blockSight && !this.tiles[x][y-1].blockSight &&
                        this.tiles[x+1][y].blockSight && this.tiles[x][y+1].blockSight) {
                        this.tiles[x][y].type = 3;
                        succeeded = true;
                    }
                }
                if (!succeeded) {
                    //vertical pieces
                    if ((x < this.width - 1 && !this.tiles[x+1][y].blockSight) ||
                        (x > 0 && !this.tiles[x-1][y].blockSight)) {
                        this.tiles[x][y].type = 1;
                    }

                    //horizontal pieces
                    else if((y < this.height - 1 && !this.tiles[x][y+1].blockSight) ||
                        (y > 0 && !this.tiles[x][y-1].blockSight)) {
                        this.tiles[x][y].type = 2;
                    }

                    //upper left corner
                    else if(x < this.width - 1 && y < this.height - 1 && !this.tiles[x+1][y+1].blockSight) {
                        this.tiles[x][y].type = 3;
                    }
                    //upper right corner
                    else if(x > 0 && y < this.height - 1 && !this.tiles[x-1][y+1].blockSight) {
                        this.tiles[x][y].type = 4;
                    }
                    //bottom right corner
                    else if(x > 0 && y > 0 && !this.tiles[x-1][y-1].blockSight) {
                        this.tiles[x][y].type = 5;
                    }
                    //bottom left corner
                    else if(x < this.width - 1 && y > 0 && !this.tiles[x+1][y-1].blockSight) {
                        this.tiles[x][y].type = 6;
                    }
                    else {
                        this.tiles[x][y].type = 0;
                    }
                }
            }
        }
    }

    createRoom(room) {
        for (var x = room.x1 + 1; x < room.x2 - 1; x++) {
            for (var y = room.y1 + 1; y < room.y2 - 1; y++) {
                this.tiles[x][y].blocked = false;
                this.tiles[x][y].blockSight = false;
            }
        }
    }

    createHorizontalTunnel(x1, x2, y) {
        for (var x = Math.min(x1, x2); x < Math.max(x1, x2) + 1; x++) {
            this.tiles[x][y].blocked = false;
            this.tiles[x][y].blockSight = false;
        }
    }

    createVerticalTunnel(x, y1, y2) {
        for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1; y++) {
            this.tiles[x][y].blocked = false;
            this.tiles[x][y].blockSight = false;
        }
    }

    isBlocked(x, y) {
        return this.tiles[x][y].blocked;
    }
}

export default GameMap;