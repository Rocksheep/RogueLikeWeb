/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(1);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', init);

function init() {
    var canvas = document.getElementById('canvas');
    var game = new _Game2.default(canvas);
    game.start();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = __webpack_require__(2);

var _Player2 = _interopRequireDefault(_Player);

var _GameMap = __webpack_require__(3);

var _GameMap2 = _interopRequireDefault(_GameMap);

var _Sprite = __webpack_require__(6);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _MapRenderer = __webpack_require__(7);

var _MapRenderer2 = _interopRequireDefault(_MapRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(canvas) {
        _classCallCheck(this, Game);

        this.width = 50;
        this.height = 35;
        this.squareSize = 16;

        this.sprite = new _Sprite2.default('../assets/img/entities.png', 16, 16);
        console.log(this.sprite);
        this.quit = false;
        this.renderers = [];
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameMap = null;
        this.player = null;
    }

    _createClass(Game, [{
        key: 'start',
        value: function start() {
            var _this = this;

            this.player = new _Player2.default(0, 0, this.sprite);
            this.gameMap = new _GameMap2.default(this.width, this.height, this.player);
            this.gameMap.makeMap(20, 5, 10);
            this.renderers.push(new _MapRenderer2.default(this.gameMap, this.sprite));

            window.addEventListener('keydown', function (e) {
                return _this.keyPresses(e);
            });
            this.update();
        }
    }, {
        key: 'keyPresses',
        value: function keyPresses(e) {
            var movement = { x: 0, y: 0 };
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

            var destinationX = this.player.x + movement.x;
            var destinationY = this.player.y + movement.y;

            if (!this.gameMap.isBlocked(destinationX, destinationY)) {
                this.player.move(movement.x, movement.y);
            }
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            this.draw();

            if (!this.quit) {
                setTimeout(function () {
                    return _this2.update();
                }, 20);
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            this._clearScreen();

            for (var index in this.renderers) {
                this.renderers[index].render(this.ctx);
            }
            // console.log('draw');

            this.player.draw(this.ctx);
        }
    }, {
        key: '_clearScreen',
        value: function _clearScreen() {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, 800, 600);
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(x, y, sprite) {
        _classCallCheck(this, Player);

        this.x = x;
        this.y = y;
        this.visionRadius = 9;
        this.sprite = sprite;
        this.visionVectors = this.computeVisionVectors();
    }

    _createClass(Player, [{
        key: "move",
        value: function move(dx, dy) {
            this.x += dx;
            this.y += dy;
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            this.sprite.draw(ctx, 0, 0, this.x, this.y);
        }
    }, {
        key: "vision",
        value: function vision(gameMap) {
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
                    var vx = Math.round(this.x + vectorUnit.x * j);
                    var vy = Math.round(this.y + vectorUnit.y * j);
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
    }, {
        key: "computeVisionVectors",
        value: function computeVisionVectors() {
            var visionVectors = [];
            var radians = 0;
            var iterations = 56;
            for (var i = 0; i < iterations; i++) {
                radians += 2 * Math.PI / iterations;
                var x = Math.round(this.visionRadius * Math.cos(radians)) + this.x;
                var y = Math.round(this.visionRadius * Math.sin(radians)) + this.y;

                var dx = x - this.x;
                var dy = y - this.y;
                var vectorLength = Math.sqrt(dx * dx + dy * dy);
                var vectorUnit = { x: dx / vectorLength, y: dy / vectorLength, length: vectorLength };

                visionVectors.push(vectorUnit);
            }
            return visionVectors;
        }
    }]);

    return Player;
}();

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tile = __webpack_require__(4);

var _Tile2 = _interopRequireDefault(_Tile);

var _Rect = __webpack_require__(5);

var _Rect2 = _interopRequireDefault(_Rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameMap = function () {
    function GameMap(width, height, player) {
        _classCallCheck(this, GameMap);

        this.width = width;
        this.height = height;
        this.player = player;
        this.tiles = this.initializeTiles();
    }

    _createClass(GameMap, [{
        key: 'initializeTiles',
        value: function initializeTiles() {
            var tiles = [];
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (tiles[x] === undefined) {
                        tiles[x] = [];
                    }
                    tiles[x][y] = new _Tile2.default(true);
                }
            }
            return tiles;
        }
    }, {
        key: 'makeMap',
        value: function makeMap(maxRooms, minRoomSize, maxRoomSize) {
            this.rooms = [];
            var numberOfRooms = 0;

            for (var r = 0; r < maxRooms; r++) {
                var w = Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1) + minRoomSize);
                var h = Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1) + minRoomSize);

                var x = Math.floor(Math.random() * (this.width - w - 1));
                var y = Math.floor(Math.random() * (this.height - h - 1));

                var newRoom = new _Rect2.default(x, y, w, h);
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
                    } else {
                        var coin = Math.floor(Math.random() * 2) + 1;

                        var oldCenter = this.rooms[numberOfRooms - 1].center();
                        if (coin === 1) {
                            this.createHorizontalTunnel(center.x, oldCenter.x, center.y);
                            this.createVerticalTunnel(oldCenter.x, center.y, oldCenter.y);
                        } else {
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
                    if (x > 0 && x < this.width - 1 && y > 0 && y < this.height - 1) {
                        if (!this.tiles[x + 1][y].blockSight && !this.tiles[x][y - 1].blockSight && this.tiles[x - 1][y].blockSight && this.tiles[x][y + 1].blockSight) {
                            this.tiles[x][y].type = 4;
                            succeeded = true;
                        } else if (!this.tiles[x - 1][y].blockSight && !this.tiles[x][y + 1].blockSight && this.tiles[x + 1][y].blockSight && this.tiles[x][y - 1].blockSight) {
                            this.tiles[x][y].type = 6;
                            succeeded = true;
                        } else if (!this.tiles[x + 1][y].blockSight && !this.tiles[x][y + 1].blockSight && this.tiles[x - 1][y].blockSight && this.tiles[x][y - 1].blockSight) {
                            this.tiles[x][y].type = 5;
                            succeeded = true;
                        } else if (!this.tiles[x - 1][y].blockSight && !this.tiles[x][y - 1].blockSight && this.tiles[x + 1][y].blockSight && this.tiles[x][y + 1].blockSight) {
                            this.tiles[x][y].type = 3;
                            succeeded = true;
                        }
                    }
                    if (!succeeded) {
                        //vertical pieces
                        if (x < this.width - 1 && !this.tiles[x + 1][y].blockSight || x > 0 && !this.tiles[x - 1][y].blockSight) {
                            this.tiles[x][y].type = 1;
                        }

                        //horizontal pieces
                        else if (y < this.height - 1 && !this.tiles[x][y + 1].blockSight || y > 0 && !this.tiles[x][y - 1].blockSight) {
                                this.tiles[x][y].type = 2;
                            }

                            //upper left corner
                            else if (x < this.width - 1 && y < this.height - 1 && !this.tiles[x + 1][y + 1].blockSight) {
                                    this.tiles[x][y].type = 3;
                                }
                                //upper right corner
                                else if (x > 0 && y < this.height - 1 && !this.tiles[x - 1][y + 1].blockSight) {
                                        this.tiles[x][y].type = 4;
                                    }
                                    //bottom right corner
                                    else if (x > 0 && y > 0 && !this.tiles[x - 1][y - 1].blockSight) {
                                            this.tiles[x][y].type = 5;
                                        }
                                        //bottom left corner
                                        else if (x < this.width - 1 && y > 0 && !this.tiles[x + 1][y - 1].blockSight) {
                                                this.tiles[x][y].type = 6;
                                            } else {
                                                this.tiles[x][y].type = 0;
                                            }
                    }
                }
            }
        }
    }, {
        key: 'createRoom',
        value: function createRoom(room) {
            for (var x = room.x1 + 1; x < room.x2 - 1; x++) {
                for (var y = room.y1 + 1; y < room.y2 - 1; y++) {
                    this.tiles[x][y].blocked = false;
                    this.tiles[x][y].blockSight = false;
                }
            }
        }
    }, {
        key: 'createHorizontalTunnel',
        value: function createHorizontalTunnel(x1, x2, y) {
            for (var x = Math.min(x1, x2); x < Math.max(x1, x2) + 1; x++) {
                this.tiles[x][y].blocked = false;
                this.tiles[x][y].blockSight = false;
            }
        }
    }, {
        key: 'createVerticalTunnel',
        value: function createVerticalTunnel(x, y1, y2) {
            for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1; y++) {
                this.tiles[x][y].blocked = false;
                this.tiles[x][y].blockSight = false;
            }
        }
    }, {
        key: 'isBlocked',
        value: function isBlocked(x, y) {
            return this.tiles[x][y].blocked;
        }
    }]);

    return GameMap;
}();

exports.default = GameMap;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function Tile(blocked, blockSight) {
    _classCallCheck(this, Tile);

    this.blocked = blocked;

    if (blockSight === undefined) {
        blockSight = blocked;
    }
    this.blockSight = blockSight;
    this.explored = false;
};

exports.default = Tile;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = function () {
    function Rect(x, y, width, height) {
        _classCallCheck(this, Rect);

        this.x1 = x;
        this.y1 = y;
        this.x2 = x + width;
        this.y2 = y + height;
    }

    _createClass(Rect, [{
        key: "center",
        value: function center() {
            var centerX = Math.floor((this.x1 + this.x2) / 2);
            var centerY = Math.floor((this.y1 + this.y2) / 2);
            return { x: centerX, y: centerY };
        }
    }, {
        key: "intersects",
        value: function intersects(other) {
            return this.x1 <= other.x2 && this.x2 >= other.x1 && this.y1 <= other.y2 && this.y2 >= other.y1;
        }
    }]);

    return Rect;
}();

exports.default = Rect;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function () {
    function Sprite(image, spriteWidth, spriteHeight) {
        _classCallCheck(this, Sprite);

        if (!(image instanceof Image)) {
            var tmpImage = new Image();
            tmpImage.src = image;
            image = tmpImage;
        }
        this.image = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
    }

    _createClass(Sprite, [{
        key: "draw",
        value: function draw(ctx, spriteX, spriteY, x, y) {
            ctx.drawImage(this.image, spriteX * 16, spriteY * 16, this.spriteWidth, this.spriteHeight, x * 16, y * 16, this.spriteWidth, this.spriteHeight);
        }
    }]);

    return Sprite;
}();

exports.default = Sprite;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapRenderer = function () {
    function MapRenderer(gameMap, sprite) {
        _classCallCheck(this, MapRenderer);

        this.gameMap = gameMap;
        console.log(this.gameMap);
        this.sprite = sprite;
    }

    _createClass(MapRenderer, [{
        key: "render",
        value: function render(ctx) {
            var fovMap = this.gameMap.player.vision(this.gameMap);
            for (var y = 0; y < this.gameMap.height; y++) {
                for (var x = 0; x < this.gameMap.width; x++) {
                    var wall = this.gameMap.tiles[x][y].blockSight;
                    var visible = fovMap[x][y];
                    if (visible || this.gameMap.player.x === x && this.gameMap.player.y === y) {
                        ctx.globalAlpha = 1.0;
                        // ctx.fillStyle = '#826e32';
                        // ctx.fillRect(x*16, y*16, 16, 16);

                        this.gameMap.tiles[x][y].explored = true;
                    } else {
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
                        } else {
                            this.sprite.draw(ctx, 7, 0, x, y);
                            // ctx.drawImage(this.entitySprite, 16 * 7, 0, 16, 16, x*16, y*16, 16, 16);
                        }
                    }
                    ctx.globalAlpha = 1;
                }
            }
        }
    }]);

    return MapRenderer;
}();

exports.default = MapRenderer;

/***/ })
/******/ ]);
//# sourceMappingURL=game.js.map