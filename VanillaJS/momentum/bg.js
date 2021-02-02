const body = document.querySelector("body");

const IMG_NUM = 5;

function paintImage(imgNum){
    const image = new Image();
    image.src = `images/${imgNum}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
    const number = Math.random() * IMG_NUM;
    return Math.ceil(number);
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();