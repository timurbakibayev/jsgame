class Brick {
    constructor(width, height, color, x, y) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
    }
    draw () {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = "1";
        //ctx.rect(this.x, this.y, c, c);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.moveTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);

        ctx.moveTo(this.x, this.y + this.height/2);
        ctx.lineTo(this.x + this.width, this.y + this.height/2);
        ctx.lineTo(this.x + this.width/4, this.y + this.height/2);
        ctx.lineTo(this.x + this.width/4, this.y);
        ctx.lineTo(this.x + this.width/4, this.y + this.height/2);
        ctx.lineTo(this.x + this.width*3/4, this.y + this.height/2);
        ctx.lineTo(this.x + this.width*3/4, this.y + this.height);
        ctx.stroke();
    }
}
