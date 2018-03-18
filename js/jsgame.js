class Brick {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
    }
    fall () {
        this.y += 1;
    }
}

let bricks = [];
let interval = null;
let img = null;
let assetsLoaded = false;

window.addEventListener('keydown', function (e) {
    console.log("push",e.keyCode);
});

window.addEventListener('keyup', function (e) {
    console.log("release",e.keyCode)
});

function startGame() {
    if (!assetsLoaded) {
        img = new Image();
        img.src = "png/Rocky_Idle.png";
        assetsLoaded = true;
    }
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    bricks.push(new Brick(30, 30, "red", 10, 120));
    bricks.push(new Brick(50, 30, "red", 10, 120));
    bricks.push(new Brick(90, 90, "red", 100, 120));
    interval = setInterval(()=>{update(ctx)}, 20);
}

function update(ctx) {
    bricks.forEach((brick) => brick.fall());
    drawAll(ctx);
}

function drawAll(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    bricks.forEach((brick) => {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
    });
    ctx.drawImage(img,35,35,125,250,    10,10,30,60);
}
