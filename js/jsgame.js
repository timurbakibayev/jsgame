const gravity = 2;
let c = 10;
let bricks = [];
let balls = [];
let interval = null;
let hero = null;
let canvas = null;
let ctx = null;

function keyDownHandler(e) {
    console.log("you pressed", e.keyCode);
    if (e.keyCode === 37) {
        hero.going_left = true;
        hero.looking = -1;
    }
    if (e.keyCode === 39) {
        hero.going_right = true;
        hero.looking = 1;
    }
    if (e.keyCode === 38) {
        hero.jump();
    }
    if (e.keyCode === 32) {
        let ball = new Ball(hero.x + hero.width / 2, hero.y + hero.height / 2);
        ball.dy = -15;
        ball.dx = hero.looking * 10;
        if (hero.dx !== 0)
            ball.dx = ball.dx * 2;
        balls.push(ball);
    }
}

document.addEventListener('keydown', keyDownHandler);

document.addEventListener('keyup', function (e) {
    if (e.keyCode === 37) {
        hero.going_left = false;
    }
    if (e.keyCode === 39) {
        hero.going_right = false;
    }
});

function startGame() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    c = canvas.height / (level.length);
    hero = new Hero(5,5);
    for (let i = 0; i < level.length; i++)
        for (let j = 0; j < level[i].length; j++) {
            if (level[i][j] === 1) {
                bricks.push(new Brick(c, c, "red", j * c, i * c));
            }
        }
    interval = setInterval(()=>{update(ctx)}, 40);
}

function update() {
    balls.forEach((ball) => {
        ball.update();
        if ((Math.abs(ball.dx) < 1) && (Math.abs(ball.dy) < 1))
            balls.splice(balls.indexOf(ball),1)
    });
    hero.update(bricks);
    drawAll();
}

function drawAll() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    bricks.forEach((brick) => brick.draw());
    balls.forEach((ball) => ball.draw());
    hero.draw();
}
