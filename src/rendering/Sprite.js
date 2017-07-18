class Sprite {

    constructor(image, spriteWidth, spriteHeight) {
        if (!(image instanceof Image)) {
            var tmpImage = new Image();
            tmpImage.src = image;
            image = tmpImage;
        }
        this.image = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
    }

    draw(ctx, spriteX, spriteY, x, y) {
        ctx.drawImage(this.image, spriteX*16, spriteY*16, this.spriteWidth, this.spriteHeight, x*16, y*16, this.spriteWidth, this.spriteHeight);
    }

}

export default Sprite;