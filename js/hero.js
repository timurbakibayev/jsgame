class Hero {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.dx = 0;
        this.img_left = new Image();
        this.img_left.src = "png/rocky_left.png";
        this.img_right = new Image();
        this.img_right.src = "png/rocky_right.png";
        this.img_sit_left = new Image();
        this.img_sit_left.src = "png/rocky_sit_left.png";
        this.img_sit_right = new Image();
        this.img_sit_right.src = "png/rocky_sit_right.png";
        this.pic = 0;
        this.width = c;
        this.height = this.width * 10 / 7;
        this.going_left = false;
        this.going_right = false;
        this.looking = 1;
        this.sitting = false;
        this.jumping = false;
    }

    sit() {
        this.sitting = true;
        this.height = this.width * 5 / 7;
    }

    standUp() {
        this.sitting = false;
        this.y -= this.width * 5 / 7;
        this.height = this.width * 10 / 7;
    }

    jump() {
        if (!this.jumping)
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
        this.jumping = true;
        bricks.forEach((brick)=> {
            if ((brick.x <= this.x && this.x < brick.x + c) ||
                (brick.x <= this.x + this.width && this.x + this.width < brick.x + c)) {
                if ((this.y + this.height > brick.y) && (this.y - this.dy + this.height <= brick.y)) {
                    this.y = brick.y - this.height;
                    this.dy = 0;
                    this.jumping = false;
                }
            }
        });
        if (this.y > canvas.height) {
            alert("Game Over :(");
            document.location.reload();
        }


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

        bricks.forEach((brick)=> {
            if ((this.y <= brick.y && brick.y < this.y + this.height) ||
                (this.y < brick.y + brick.height && brick.y + brick.height < this.y + c)) {
                if ((this.x + this.width > brick.x) && (this.x - this.dx + this.width <= brick.x)) {
                    this.x = brick.x - this.width;
                    this.dx = 0;
                }
            }

            if ((this.y <= brick.y && brick.y < this.y + this.height) ||
                (this.y < brick.y + brick.height && brick.y + brick.height < this.y + c)) {
                if ((this.x < brick.x + brick.width) && (this.x - this.dx >= brick.x + brick.width)) {
                    this.x = brick.x + brick.width;
                    this.dx = 0;
                }
            }
        });


    }
    draw () {
        if (!this.sitting) {
            if (this.looking === 1)
                ctx.drawImage(this.img_right, this.x, this.y, this.width, this.height);
            else
                ctx.drawImage(this.img_left, this.x, this.y, this.width, this.height);
        } else {
            if (this.looking === 1)
                ctx.drawImage(this.img_sit_right, this.x, this.y, this.width, this.height);
            else
                ctx.drawImage(this.img_sit_left, this.x, this.y, this.width, this.height);
        }
    }
}