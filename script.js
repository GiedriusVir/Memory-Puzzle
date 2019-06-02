const squares = document.querySelectorAll(".square");
const flip = document.getElementById("flips");
const reset = document.getElementsByClassName("reset");

let flippedSquare = false;
let enableClick = false;
let firstSquare;
let secondSquare;
let totalClicks = 0;
let matchedSquares = [];

function flipImg() {
    if (enableClick) 
        return;
    if (this === firstSquare) 
        return;

    this.classList.add("flip"); 
    totalClicks++; 
    flip.innerText = totalClicks;

    if (!flippedSquare) {
        flippedSquare = true;
        firstSquare = this;
        return;
    }

    secondSquare = this;
    checkSquare();
}

function checkSquare(){
    let matched = firstSquare.dataset.name === secondSquare.dataset.name; 
    matched ? holdSquare() : closeSquare();
    if(matchedSquares.length === squares.length){
        victory();
    } 
}

function holdSquare(){
    firstSquare.removeEventListener("click", flipImg);
    secondSquare.removeEventListener("click", flipImg);
    matchedSquares.push(firstSquare);
    matchedSquares.push(secondSquare);
    resetSquares();
}

function closeSquare(){
    enableClick = true;
    setTimeout(() => {
        firstSquare.classList.remove("flip");
        secondSquare.classList.remove("flip");

        resetSquares();
    }, 1000);
}

function victory() {
    document.getElementById("victory").classList.add("visible");
    document.getElementsByClassName("flip-info")[0].classList.add("visible");
}

function resetSquares(){
    [flippedSquare, enableClick] = [false, false];
    [firstSquare, secondSquare] = [null, null];
}

function shuffle() {
    squares.forEach(square => {
        let position = Math.floor(Math.random() * 16);
        square.style.order = position;
    });
}

function newGame() {
    matchedSquares = [];
    document.getElementById("victory").classList.remove("visible");
    document.getElementsByClassName("flip-info")[0].classList.remove("visible");
    totalClicks = 0;
    flip.innerText = totalClicks;
    squares.forEach(square => {
        square.classList.remove("flip");
        square.addEventListener("click", flipImg);
    });
    resetSquares();
    shuffle();
}

shuffle();
squares.forEach(square => square.addEventListener("click", flipImg));
reset[0].addEventListener("click", newGame);