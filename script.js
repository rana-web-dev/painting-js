const
canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d"),
tools = document.querySelectorAll(".tool");

let
isDrawing = false,
brushWidth = 5,
selectedTool = "brush";

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
    if(selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        drawRectangle(e);
    }
}

tools.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    })
})

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);