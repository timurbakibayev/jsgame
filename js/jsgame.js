const gravity = 2;
let c = 10;
let bricks = [];
let interval = null;
let hero = null;
let canvas = null;
let ctx = null;

window.addEventListener('keydown', function (e) {
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
});

window.addEventListener('keyup', function (e) {
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
    interval = setInterval(()=>{update(ctx)}, 100);
}

function update() {
    hero.update(bricks);
    drawAll();
}

function drawAll() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    bricks.forEach((brick) => brick.draw());
    hero.draw();
}
