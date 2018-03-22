let canvas = null;
let ctx = null;
let gameOver = false;
let level = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,1,1,1,0,0,0,1,0],
    [0,0,1,0,0,0,0,0,1,0,0,0,1,0],
    [0,0,0,0,1,1,0,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
];
let bricks = [];
let b = -150;
for (let i = 0; i < level.length; i++)
    for (let j = 0; j < level[i].length; j++)
        if (level[i][j] === 1) {
            bricks.push({x:j * 70, y:i * 50,
                width: 70, height: 50})
        }
let balls = [];
let image_left = null;
let image_right = null;
let image_ball = null;
let interval = null;
let y = 50;
let x = 150;
let dy = 1;
let dx = 0;
let gravity = 1;
let looking = 1;
let jumping = false;

function startGame() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    console.log("Everything is fine!");
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    image_left = new Image();
    image_right = new Image();
    image_ball = new Image();
    image_left.src = "png/rocky_left.png";
    image_right.src = "png/rocky_right.png";
    image_ball.src = "png/ball.png";
    interval = setInterval(update,40);
}

function keyDownHandler(e) {
    console.log(e.keyCode);
    if (e.keyCode === 37) {
        dx = -5;
        looking = -1;
    }
    if (e.keyCode === 39) {
        dx = 5;
        looking = 1;
    }

    if (e.keyCode === 32) {
        let ball = {x: x + 25, y: y + 30,
            width: 20,
            height: 20,
            dx: 15 * looking,
            dy: -10
        };
        balls.push(ball);
    }
    if (e.keyCode === 38) {
        if (!jumping)
            dy = -20;
    }
}

function keyUpHandler(e) {
    console.log(e.keyCode);
    if (e.keyCode === 37) {
        dx = 0;
    }
    if (e.keyCode === 39) {
        dx = 0;
    }
}



function update() {
    dy = dy + gravity;
    if (dy > 15)
        dy = 15;
    y = y + dy;

    if (x + b > canvas.width*0.75)
        b = canvas.width*0.75 - x;
    if (x + b < canvas.width*0.25)
        b = canvas.width*0.25 - x;

    jumping = true;
    if (y > canvas.height && !gameOver) {
        gameOver = true;
        alert("Game over :(");
        window.location.reload();
    }
    bricks.forEach((brick) => {
        if ((brick.x <= x) &&
            (x <= brick.x + brick.width) ||
            (brick.x <= x + 50) &&
            (x + 50 <= brick.x + brick.width))
            if ((y > brick.y - 70) &&
                (y - dy <= brick.y - 70)
                ) {
                y = brick.y - 70;
                jumping = false;
            }
    });

    x = x + dx;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = "2";

    bricks.forEach((brick) => {
        ctx.moveTo(brick.x + b, brick.y);
        ctx.lineTo(brick.x + b + brick.width, brick.y);
        ctx.lineTo(brick.x + b + brick.width/3, brick.y);
        ctx.lineTo(brick.x + b + brick.width/3, brick.y + brick.height/2);
        ctx.lineTo(brick.x + b, brick.y + brick.height/2);
        ctx.lineTo(brick.x + b + brick.width, brick.y + brick.height/2);
        ctx.lineTo(brick.x + b + brick.width * 2/3, brick.y + brick.height/2);
        ctx.lineTo(brick.x + b + brick.width * 2/3, brick.y + brick.height);
        ctx.lineTo(brick.x + b, brick.y + brick.height);
        ctx.lineTo(brick.x + b + brick.width, brick.y + brick.height);
    });
    ctx.stroke();
    if (looking === 1)
        ctx.drawImage(image_right,x + b,y,50,70);
    else
        ctx.drawImage(image_left,x + b,y,50,70);

    balls.forEach((ball) => {
       ball.dx = ball.dx / 1.02;
       ball.dy = ball.dy + gravity;
       if (ball.dy > 10)
           ball.dy = 10;

        ball.y = ball.y + ball.dy;

        bricks.forEach((brick) => {
            if ((brick.x <= ball.x) &&
                (ball.x <= brick.x + brick.width) ||
                (brick.x <= ball.x + ball.width) &&
                (ball.x + ball.width <= brick.x + brick.width))
                if ((ball.y > brick.y - ball.height) &&
                    (ball.y - ball.dy <= brick.y - ball.height)
                ) {
                    ball.y = brick.y - ball.height;
                    ball.dy = -ball.dy/1.2;
                }
        });

        ball.x = ball.x + ball.dx;
        bricks.forEach((brick) => {
            if ((brick.y <= ball.y + 10) &&
                (ball.y + 10 <= brick.y + brick.height))
                if ((ball.x + 20 > brick.x) &&
                    (ball.x + 20 - ball.dx <= brick.x))
                    ball.dx = - ball.dx;
            if ((brick.y <= ball.y + 10) &&
                (ball.y + 10 <= brick.y + brick.height))
                if ((ball.x < brick.x + brick.width) &&
                    (ball.x - ball.dx >= brick.x + brick.width))
                    ball.dx = - ball.dx;
        })

    });

    balls.forEach((ball) => {
        ctx.drawImage(image_ball,ball.x + b,ball.y,
            ball.width,ball.height);
    })
}