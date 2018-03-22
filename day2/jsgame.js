let fruits = ["Apple", "Banana"];
let bricks = [];
let balls = [];
let interval = null;
let imageBoyRight = new Image();
let imageBoyLeft = new Image();
let imageBall = new Image();
let canvas = null;
let ctx = null;
let x = 50;
let y = 50;
let dx = 0;
let dy = 1;
let o = 0;
let mayJump = true;
let gameOver = false;
let looking = 1;

let level = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0],
];
for (let i = 0; i < level.length; i++)
    for (let j = 0; j < level[i].length; j++)
        if (level[i][j] === 1)
            bricks.push({x: j * 100, y: i * 50, w: 100, h: 50});

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    console.log("Push",e.keyCode);
    if (e.keyCode === 38) { //up
        if (mayJump)
            dy = -20;
    }
    if (e.keyCode === 37) { //left
        dx = -5;
        looking = -1;
    }
    if (e.keyCode === 39) { //right
        dx = 5;
        looking = 1;
    }
    if (e.keyCode === 32) {
        balls.push({
            x: x+25,
            y: y+35,
            dx: 10 * looking,
            dy: -10
        });
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 37 || e.keyCode === 39)
        dx = 0;
}

function startGame() {
    console.log("Hello world!");
    fruits.push("Grapefruit");
    console.log(fruits);
    interval = setInterval(update, 40);
    imageBoyRight.src = "png/rocky_right.png";
    imageBoyLeft.src = "png/rocky_left.png";
    imageBall.src = "png/ball.png";
    canvas = document.getElementById("mario");
    ctx = canvas.getContext("2d");
}

function update() {
    dy += 1;
    if (dy > 10)
        dy = 10;
    y += dy;

    if (y > canvas.height && !gameOver) {
        gameOver = true;
        alert("Game Over :(");
        window.location.reload();
    }

    mayJump = false;
    bricks.forEach((brick) => {
       if ((brick.x <= x && x <= brick.x + brick.w) ||
           (brick.x <= x + 50 && x + 50<= brick.x + brick.w)) {
           if (y + 70 > brick.y && y - dy + 70 <= brick.y) {
               y = brick.y - 70;
               mayJump = true;
           }
       }
    });

    x = x + dx;
    if (x + o > canvas.width * 0.75)
        o = canvas.width * 0.75 - x;
    if (x + o < canvas.width * 0.25)
        o = canvas.width * 0.25 - x;

    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (looking === 1)
        ctx.drawImage(imageBoyRight, x + o,y, 50, 70);
    else
        ctx.drawImage(imageBoyLeft, x + o,y, 50, 70);

    balls.forEach((ball)=> {
        ball.dy += 1;
        if (ball.dy > 15)
            ball.dy = 15;
        ball.y += ball.dy;
        // check everything for y coordinate
        bricks.forEach((brick) => {
           if (brick.x <= ball.x + 10 &&
               ball.x + 10 <= brick.x + brick.w)
               if (ball.y + 20 - ball.dy <= brick.y &&
                   ball.y + 20 > brick.y) {
                    ball.y = brick.y - 20;
                    ball.dy = - ball.dy / 1.2;
               }
        });

        ball.x += ball.dx;
        // check everything for x coordinate
        bricks.forEach((brick) => {
           if (brick.y <= ball.y + 10 &&
               ball.y + 10 <= brick.y + brick.h) {
               if (ball.x - ball.dx + 20 <= brick.x &&
                   ball.x + 20 > brick.x) {
                   ball.dx = - ball.dx;
               }
               if (ball.x - ball.dx >= brick.x + brick.w &&
                   ball.x < brick.x + brick.w) {
                   ball.dx = - ball.dx;
               }
           }
        });
        ctx.drawImage(imageBall, ball.x + o,ball.y, 20, 20);
    });

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = "2";
    bricks.forEach((brick)=> {
       ctx.moveTo(brick.x + o, brick.y);
       ctx.lineTo(brick.x + o + brick.w, brick.y);
       ctx.lineTo(brick.x + o + brick.w/3, brick.y);
       ctx.lineTo(brick.x + o + brick.w/3, brick.y + brick.h/2);
       ctx.lineTo(brick.x + o, brick.y + brick.h/2);
       ctx.lineTo(brick.x + o + brick.w, brick.y + brick.h/2);
       ctx.lineTo(brick.x + o + brick.w * 2/3, brick.y + brick.h/2);
       ctx.lineTo(brick.x + o + brick.w * 2/3, brick.y + brick.h);
       ctx.lineTo(brick.x + o, brick.y + brick.h);
       ctx.lineTo(brick.x + o + brick.w, brick.y + brick.h);
    });
    ctx.stroke();
}