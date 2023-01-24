const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const tools = document.querySelectorAll(".tool");

let isDrawing = false;
let brushWidth = 5;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const startDraw = () => {
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    console.log(e);
}

tools.forEach(btn => {
    btn.addEventListener("click", () => {
        const remove = document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        console.log(btn.id);
    })
})

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);