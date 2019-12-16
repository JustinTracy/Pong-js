let canvas;
let context;

const canvasWidth = 800;
const canvasHeight = 550;
const ballSize = 20;
const initialSpeed = 10;

let xLocation = canvasWidth / 2;
let yLocation = canvasHeight / 2;
let xSpeed = initialSpeed;
let ySpeed = xSpeed;

let player1Score = 0;
let player2Score = 0;

function InitializeGame()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.font = '48px arial';
    context.fillText('0', 10, 50, 500, 500);
    context.fillText('0', canvasWidth - 40, 50, 500, 500);
    setInterval(gameLoop, 1000/30);
    relocateBall();
}

function gameLoop()
{
    moveBall();
    checkForPoint();
}

function relocateBall()
{
    context.clearRect(xLocation, yLocation, ballSize, ballSize);
    xLocation = canvasWidth / 2;
    yLocation = canvasHeight / 2;
    if (Math.floor(Math.random(2) * 2) === 1) xSpeed = initialSpeed; else xSpeed = -initialSpeed;
    if (Math.floor(Math.random(2) * 2) === 1) ySpeed = initialSpeed; else ySpeed = -initialSpeed;
}

function checkForPoint()
{
    if (xLocation + ballSize >= canvasWidth)
    {
        player1Score++;
        context.clearRect(xLocation, yLocation, ballSize, ballSize);
        context.clearRect(0, 0, 1000, 100); 
        context.fillText(player1Score, 10, 50, 500, 500);
        context.fillText(player2Score, canvasWidth - 40, 50, 500, 500); 
        xLocation = canvasWidth / 2 - ballSize;
        yLocation = canvasHeight / 2 - ballSize;
        xSpeed = 0;
        ySpeed = 0;
        setTimeout(relocateBall, 1000);
    } 
    if (xLocation <= 0)
    {
        player2Score++;
        context.clearRect(xLocation, yLocation, ballSize, ballSize);
        context.clearRect(0, 0, 1000, 100); 
        context.fillText(player1Score, 10, 50, 500, 500);
        context.fillText(player2Score, canvasWidth - 40, 50, 500, 500); 
        xLocation = canvasWidth / 2 - ballSize;
        yLocation = canvasHeight / 2 - ballSize;
        xSpeed = 0;
        ySpeed = 0;
        setTimeout(relocateBall, 1000);
    } 
}

function moveBall()
{
    context.clearRect(xLocation, yLocation, ballSize, ballSize);

    if (xLocation + ballSize >= canvasWidth) xSpeed = -xSpeed;
    if (xLocation <= 0) xSpeed = -xSpeed;
    if (yLocation + ballSize >= canvasHeight) ySpeed = -ySpeed;
    if (yLocation <= 0) ySpeed = -ySpeed;
    xLocation += xSpeed;
    yLocation -= ySpeed;
    
    context.fillRect(xLocation, yLocation, ballSize, ballSize);
}