class Brick {
    constructor(width, height, color, x, y) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
    }
    draw () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, c, c);
    }
}
