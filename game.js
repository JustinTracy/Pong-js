let canvas;
let context;

const canvasWidth = 800;
const canvasHeight = 550;
const ballSize = 20;
const initialSpeed = 10;
const playerWidth = 15;
const playerHeight = 100;

let xLocation = canvasWidth / 2;
let yLocation = canvasHeight / 2;
let xSpeed = initialSpeed;
let ySpeed = initialSpeed;

let player1XLocation = ballSize + playerWidth;
let player2XLocation = canvasWidth - ballSize - playerWidth * 2;
let player1YLocation = canvasHeight /2 - playerHeight / 2;
let player2YLocation = canvasHeight /2 - playerHeight / 2;
let playerSpeed = 10;

let player1Score = 0;
let player2Score = 0;

let ball;
let player1;
let player2;
let score1;
let score2;

let isUpKeyPressed = false;
let isDownKeyPressed = false;

function InitializeGame()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.font = '48px arial';

    ball = new Path2D();
    ball.rect(xLocation, yLocation, ballSize, ballSize);
    player1 = new Path2D();
    player1.rect(player1XLocation, player1YLocation, playerWidth, playerHeight);
    player2 = new Path2D();
    player2.rect(player2XLocation, player2YLocation, playerWidth, playerHeight);
    context.fill(ball);
    context.fill(player1);
    context.fill(player2);

    addKeyControls();
    setInterval(gameLoop, 1000/30);
}

function gameLoop()
{
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    movePlayer1();
    moveBall();
    checkForCollision();
    drawScore();
    checkForPoint();
}

function checkForCollision()
{
    if (xLocation === player1XLocation + playerWidth)
    {
        if (yLocation >= player1YLocation && yLocation <= player1YLocation + playerHeight)
        {
            xSpeed = -xSpeed;
            if (isUpKeyPressed) ySpeed = initialSpeed;
            if (isDownKeyPressed) ySpeed = -initialSpeed;
        }
    }
}

function drawScore()
{
    context.fillText(player1Score, 10, 50, 500, 500);
    context.fillText(player2Score, canvasWidth - 40, 50, 500, 500);
}

function movePlayer1()
{
    if (isUpKeyPressed && player1YLocation >= 0) player1YLocation -= playerSpeed;
    if (isDownKeyPressed && player1YLocation <= canvasHeight - playerHeight) player1YLocation += playerSpeed;
    context.fillRect(player1XLocation, player1YLocation, playerWidth, playerHeight);
}

function addKeyControls()
{
    document.addEventListener('keydown', e =>
    {
        if (e.code === 'ArrowUp') isUpKeyPressed = true;
        if (e.code === 'ArrowDown') isDownKeyPressed = true;
    });
    document.addEventListener('keyup', e =>
    {
        if (e.code === 'ArrowUp') isUpKeyPressed = false;
        if (e.code === 'ArrowDown') isDownKeyPressed = false;
    });
}

function relocateBall()
{
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
    if (xLocation + ballSize >= canvasWidth) xSpeed = -xSpeed;
    if (xLocation <= 0) xSpeed = -xSpeed;
    if (yLocation + ballSize >= canvasHeight) ySpeed = -ySpeed;
    if (yLocation <= 0) ySpeed = -ySpeed;
    xLocation += xSpeed;
    yLocation -= ySpeed;
    
    context.fillRect(xLocation, yLocation, ballSize, ballSize);
}