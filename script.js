const
canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d"),
tools = document.querySelectorAll(".tool");
fillColor = document.querySelector("#fill-color");
brushSize = document.querySelector("#range");
colorBtn = document.querySelectorAll(".colors .options .option");

let
prevMouseX,
prevMouseY,
snapshot,
isDrawing = false,
brushWidth = 5,
selectedTool = "brush";
selectedColor = "#000";

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

const drawCircle = (e) => {
    ctx.beginPath();
    const radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDraw = (e) => {
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
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
    } else {
        drawTriangle(e);
    }
}

tools.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;        
    })
})

colorBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".colors .options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    })
})

brushSize.addEventListener("change", () => brushWidth = brushSize.value);

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);