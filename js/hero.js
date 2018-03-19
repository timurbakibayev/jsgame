class Hero {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.dx = 0;
        this.img = new Image();
        this.img.src = "png/rocky_left_right.png";
        this.pic = 0;
        this.width = c;
        this.height = this.width * 10 / 7;
        this.going_left = false;
        this.going_right = false;
        this.looking = 1;
        this.jumping = false;
    }

    jump() {
        this.dy = - gravity * 10;
    }

    update() {
        if (this.looking === 1) {
            this.pic = 0;
        } else {
            this.pic = 1;
        }

        this.dy = Math.min(this.dy + gravity, 10);
        this.y += this.dy;
        bricks.forEach((brick)=> {
            if ((brick.x <= this.x && this.x < brick.x + c) ||
                (brick.x <= this.x + this.width && this.x + this.width < brick.x + c)) {
                if (this.y + this.height > brick.y) {
                    this.y = brick.y - this.height;
                    this.dy = 0;
                }
            }
        });

        if (this.going_left) {
            this.dx = Math.max(this.dx - 1, -10);
        } else if (this.dx < 0) {
            this.dx += 1;
        }
        if (this.going_right) {
            this.dx = Math.min(this.dx + 1, 10);
        } else if (this.dx > 0) {
            this.dx -= 1;
        }
        this.x += this.dx;
    }
    draw () {
        ctx.drawImage(this.img,145 * this.pic,0,138,200,  this.x, this.y, this.width, this.height);
    }
}