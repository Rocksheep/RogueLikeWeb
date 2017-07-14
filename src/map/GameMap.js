var GameMap = function(width, height, player) {
    this.width = width;
    this.height = height;
    this.player = player;
    this.tiles = this.initializeTiles();
};

GameMap.prototype.initializeTiles = function() {
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
};

GameMap.prototype.makeMap = function(maxRooms, minRoomSize, maxRoomSize) {
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
};

GameMap.prototype.createRoom = function(room) {
    for (var x = room.x1 + 1; x < room.x2 - 1; x++) {
        for (var y = room.y1 + 1; y < room.y2 - 1; y++) {
            this.tiles[x][y].blocked = false;
            this.tiles[x][y].blockSight = false;
        }
    }
};

GameMap.prototype.createHorizontalTunnel = function(x1, x2, y) {
    for (var x = Math.min(x1, x2); x < Math.max(x1, x2) + 1; x++) {
        this.tiles[x][y].blocked = false;
        this.tiles[x][y].blockSight = false;
    }
};

GameMap.prototype.createVerticalTunnel = function(x, y1, y2) {
    for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1; y++) {
        this.tiles[x][y].blocked = false;
        this.tiles[x][y].blockSight = false;
    }
};

GameMap.prototype.isBlocked = function(x, y) {
    return this.tiles[x][y].blocked;
};

GameMap.prototype.draw = function(ctx, colors) {
    var fovMap = this.player.vision(this);
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var wall = this.tiles[x][y].blockSight;
            var visible = fovMap[x][y];
            if (visible) {
                if (wall) {
                    ctx.fillStyle = colors.lightWall;
                }
                else {
                    ctx.fillStyle = colors.lightGround;
                }
                this.tiles[x][y].explored = true;
                ctx.fillRect(x*16, y*16, 16, 16);
            }
            else if (this.tiles[x][y].explored) {
                if (wall) {
                    ctx.fillStyle = colors.darkWall;
                }
                else {
                    ctx.fillStyle = colors.darkGround;
                }
                ctx.fillRect(x*16, y*16, 16, 16);
            }
        }
    }
};