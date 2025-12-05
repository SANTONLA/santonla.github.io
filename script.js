// Fade-in cards
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".fade-in");
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });
});

// Snake Animation
const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");

let snake = [{x: 10, y:10}];
let dir = {x:1, y:0};
let food = {x:15, y:10};
let grid = 20;
let count = 0;

function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (++count < 4) return;
    count = 0;

    // Move snake
    let head = {...snake[0]};
    head.x += dir.x;
    head.y += dir.y;

    // Wrap around
    head.x = (head.x + canvas.width/grid) % (canvas.width/grid);
    head.y = (head.y + canvas.height/grid) % (canvas.height/grid);

    snake.unshift(head);

    // Eat food
    if(head.x === food.x && head.y === food.y){
        food.x = Math.floor(Math.random()*canvas.width/grid);
        food.y = Math.floor(Math.random()*canvas.height/grid);
    } else {
        snake.pop();
    }

    // Draw
    ctx.fillStyle = "#ffe6f2";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#ff66b3";
    snake.forEach(part => ctx.fillRect(part.x*grid, part.y*grid, grid-1, grid-1));

    ctx.fillStyle = "#ff3399";
    ctx.fillRect(food.x*grid, food.y*grid, grid-1, grid-1);
}

// Keyboard controls
document.addEventListener("keydown", e => {
    if(e.key === "ArrowUp" && dir.y === 0) dir = {x:0, y:-1};
    if(e.key === "ArrowDown" && dir.y === 0) dir = {x:0, y:1};
    if(e.key === "ArrowLeft" && dir.x === 0) dir = {x:-1, y:0};
    if(e.key === "ArrowRight" && dir.x === 0) dir = {x:1, y:0};
});

gameLoop();
