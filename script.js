const
canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d"),
tools = document.querySelectorAll(".tool");
fillColor = document.querySelector("#fill-color");

let
prevMouseX,
prevMouseY,
snapshot,
isDrawing = false,
brushWidth = 5,
selectedTool = "brush";

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
    if(!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = () => {
    ctx.arc(prevMouseX, prevMouseY, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

const startDraw = (e) => {
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if(selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
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