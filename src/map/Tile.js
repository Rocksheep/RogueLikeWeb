class Tile {

    constructor(blocked, blockSight) {
        this.blocked = blocked;

        if (blockSight === undefined) {
            blockSight = blocked;
        }
        this.blockSight = blockSight;
        this.explored = false;
    }

}

export default Tile;