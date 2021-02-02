const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 500, 500);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){
    painting = false;
}

function onMouseLeave(event){
    painting = false;
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function clickMode(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Painting";
    }
}

function clickCanvas(event){
    if(filling){
        ctx.fillRect(0, 0, 500, 500);
    }
}

function handleCM(event){
    event.preventDefault();
}

function clickSave(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint[EXPORT]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", clickCanvas);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
}

if(range){
    range.addEventListener("input", changeRange);
}

if(mode){
    mode.addEventListener("click", clickMode);
}

if(saveBtn){
    saveBtn.addEventListener("click", clickSave);
}