function loadScores() {
    const saved = localStorage.getItem("scores");
    if (saved) return JSON.parse(saved);
    return [];
}

function saveScore(score) {
    let scores = loadScores();

    scores.push(score);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 5);
    localStorage.setItem("scores", JSON.stringify(scores));
}




let board;
let boardWidth = 288;
let boardHeight = 512;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/6;
let birdY = boardHeight/2;
let gap = 140;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}


let pipes = [];
let pipeWidth = 52;
let pipeHeight = 320;
let pipeX = boardWidth;
let pipeY = -96;

let bottomPipeImg;
let topPipeImg;

let pipeSpeed = -2;
let birdSpeed = 0;
let gravity = 0.4;

let gameOver=false;
let score=0;

let baseImg = new Image();
baseImg.src= "./assets/FlappyBird/base.png";

let gameOverImg = new Image();
    gameOverImg.src = "./assets/UI/gameover.png";


let base = {
    x : 0,
    y : boardHeight - 96,
    width : boardWidth,
    height: 96,
    img : baseImg
}

 let birdImg = new Image(bird.width, bird.height);
    birdImg.src = "./assets/FlappyBird/yellowbird-midflap.png";

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    
   
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y);
    }

    bottomPipeImg = new Image(pipeWidth, pipeHeight);
    bottomPipeImg.src = "./assets/FlappyBird/pipe-green.png";
    topPipeImg = new Image(pipeWidth, pipeHeight);
    topPipeImg.src = "./assets/FlappyBird/pipe-top.png"

    requestAnimationFrame(update);
    setInterval(placePipe, 1867);
    document.addEventListener("keydown", e => {
        if (e.code == "Space") {
            moveBird();
        }
    })
}

birdDownImg = new Image(bird.width, bird.height);
birdDownImg.src = "./assets/FlappyBird/yellowbird-upflap.png";
   

birdUpImg = new Image(bird.width, bird.height);
birdUpImg.src = "./assets/FlappyBird/yellowbird-downflap.png";


function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        drawGameOverScreen();
        return;
    }
    context.clearRect(0,0, board.width, board.height);

    birdSpeed+=gravity;
    bird.y = Math.max(bird.y+birdSpeed,0);
    if (bird.y>board.height-120) {
        gameOver=true;
        saveScore(score);
        bird.y=board.height-120;

    }


    drawRotatedBird();


    for (let i=0; i<pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x+=pipeSpeed;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (collided(pipe, bird)) {
            gameOver=true;
            saveScore(score);
        }

        if (!pipe.passed && bird.x>pipe.x+pipeWidth) {
            score+=1;
            pipe.passed=true;
        }
    }

    while (pipes.length>0 &&  pipes[0].x <-pipeWidth)
    {
        pipes.shift();
    }



    context.drawImage(base.img, base.x, base.y, base.width, base.height);
    context.font="30px Arial";
    context.textAlign = "right";
    context.textBaseline = "top";
    context.fillText(score, 280, 8);
}

function placePipe() {
    
    if (gameOver) {
        return;
    }
    let offset = Math.floor(Math.random()*(2*pipeHeight-boardHeight+gap-96));

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : pipeY-offset,
        width : pipeWidth,
        height : pipeHeight,
        passed: false
    }

    pipes.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x : pipeX,
        y : pipeY - offset + pipeHeight + gap,
        width : pipeWidth,
        height : pipeHeight,
        passed: true
    }

    pipes.push(bottomPipe);
}


function moveBird() {
    birdSpeed=-7.6;

    if(gameOver)
    {
        restartGame();
    }
}


function collided(a,b) {
    return a.x<=b.x+b.width && a.x+a.width>=b.x && a.y<=b.y+b.height && a.y+a.height>=b.y;
}



function drawRotatedBird() {
    let angle = 0;

    angle = Math.min(Math.max(birdSpeed * 0.05, -0.5), 0.5);

    let img;
    if (birdSpeed > 1) img = birdDownImg;
    else if (birdSpeed < -1) img = birdUpImg;
    else img = birdImg;

    context.save();
    context.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
    context.rotate(angle);
    context.drawImage(img, -bird.width / 2, -bird.height / 2, bird.width, bird.height);
    context.restore();
}

function drawGameOverScreen() {

    context.fillStyle = "black";
    context.textAlign = "left";
    context.textBaseline = "top";

    context.drawImage(gameOverImg, board.width / 2 - gameOverImg.width / 2, 80);


    const best = loadScores()[0] || 0;

    context.font = "24px Arial";
    context.fillText("Twój wynik: " + score, board.width / 2 - 100, 150);
    context.fillText("Najlepszy wynik: " + best, board.width / 2 - 100, 190);

}


function restartGame() {
    bird.x = birdX;
    bird.y = birdY;
    birdSpeed =-7.6;
    pipes = [];
    score = 0;
    gameOver = false;

}
