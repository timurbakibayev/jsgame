class Ball {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.dx = 0;
        this.img = new Image();
        this.img.src = "png/ball.png";
        this.pic = 0;
        this.width = c/4;
        this.height = this.width;
    }

    update() {
        this.dy = Math.min(this.dy + gravity, 10);
        this.y += this.dy;
        this.jumping = true;
        bricks.forEach((brick)=> {
            if ((brick.x <= this.x && this.x < brick.x + brick.height) ||
                (brick.x <= this.x + this.width && this.x + this.width < brick.x + brick.height)) {
                if ((this.y + this.height > brick.y) && (this.y - this.dy + this.height <= brick.y)) {
                    this.y = brick.y - this.height;
                    this.dy = - this.dy/1.1;
                }
            }
        });
        this.dx = this.dx / 1.03;
        this.x += this.dx;
        bricks.forEach((brick) => {
            if ((brick.y <= this.y) && (this.y <= brick.y + brick.height)) {
                if ((this.x + this.width >= brick.x) && (this.x + this.width - this.dx < brick.x))
                    this.dx = -this.dx / 1.1;
                if ((this.x <= brick.x + brick.width) && (this.x - this.dx > brick.x + brick.width))
                    this.dx = -this.dx / 1.1;
            }
        })
    }
    draw () {
        ctx.drawImage(this.img,0,0,38,38,this.x, this.y, this.width, this.height);
    }
}