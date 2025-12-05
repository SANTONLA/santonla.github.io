// Fade-in cards al cargar y al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.animation = "fade 1s forwards";
            }
        });
    }, {threshold: 0.2});

    cards.forEach(card => observer.observe(card));
});

// Snake Animation
const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
let snake = [{x: 10, y:10}], dir = {x:1, y:0}, food = {x:15, y:10}, grid=20, count=0;
function gameLoop() {
    requestAnimationFrame(gameLoop);
    if(++count<4) return; count=0;
    let head={...snake[0]};
    head.x=(head.x+canvas.width/grid)%(canvas.width/grid);
    head.y=(head.y+canvas.height/grid)%(canvas.height/grid);
    snake.unshift(head);
    if(head.x===food.x && head.y===food.y){
        food.x=Math.floor(Math.random()*canvas.width/grid);
        food.y=Math.floor(Math.random()*canvas.height/grid);
    } else {snake.pop();}
    ctx.fillStyle="#ffe6f2"; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#ff66b3"; snake.forEach(p=>ctx.fillRect(p.x*grid,p.y*grid,grid-1,grid-1));
    ctx.fillStyle="#ff3399"; ctx.fillRect(food.x*grid,food.y*grid,grid-1,grid-1);
}
document.addEventListener("keydown", e=>{
    if(e.key==="ArrowUp" && dir.y===0) dir={x:0,y:-1};
    if(e.key==="ArrowDown" && dir.y===0) dir={x:0,y:1};
    if(e.key==="ArrowLeft" && dir.x===0) dir={x:-1,y:0};
    if(e.key==="ArrowRight" && dir.x===0) dir={x:1,y:0};
});
gameLoop();

// Carrusel proyectos
let carouselIndex=0;
const container=document.querySelector(".carousel-container");
const totalItems=document.querySelectorAll(".carousel-item").length;
document.querySelector(".prev").addEventListener("click",()=>{
    carouselIndex=(carouselIndex-1+totalItems)%totalItems;
    container.style.transform=`translateX(-${carouselIndex*100}%)`;
});
document.querySelector(".next").addEventListener("click",()=>{
    carouselIndex=(carouselIndex+1)%totalItems;
    container.style.transform=`translateX(-${carouselIndex*100}%)`;
});

