let canvas;
let context;

const canvasWidth = 800;
const canvasHeight = 550;
const ballSize = 25;

let xLocation = canvasWidth / 2;
let yLocation = canvasHeight / 2;
let xSpeed = 10;
let ySpeed = xSpeed;

function InitializeGame()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(xLocation, yLocation, ballSize, ballSize);
    context.font = '48px arial';
    context.fillText('0', 10, 50, 500, 500);
    context.fillText('0', canvasWidth - 40, 50, 500, 500);
    setInterval(moveBall, 1000/30);
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