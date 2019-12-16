let canvas;
let context;

const canvasWidth = 800;
const canvasHeight = 550;
const ballSize = 20;
const initialSpeed = 13;
const playerWidth = 15;
const playerHeight = 100;

let xLocation = canvasWidth / 2;
let yLocation = canvasHeight / 2;
let xSpeed = initialSpeed;
let ySpeed = initialSpeed;

let player1XLocation = ballSize + playerWidth * 2;
let player2XLocation = canvasWidth - ballSize - playerWidth * 3;
let player1YLocation = canvasHeight /2 - playerHeight / 2;
let player2YLocation = canvasHeight /2 - playerHeight / 2;
let playerSpeed = 12;

let player1Score = 0;
let player2Score = 0;

let isUpKeyPressed = false;
let isDownKeyPressed = false;

let prevPlayer2Location;

function InitializeGame()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.font = '48px arial';

    context.fillRect(xLocation, yLocation, ballSize, ballSize);
    addKeyControls();
    setInterval(gameLoop, 1000/30);
}

function gameLoop()
{
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    movePlayer2();
    movePlayer1();
    moveBall();
    checkForCollision();
    drawScore();
    checkForPoint();
}

function checkForCollision()
{
    if (xLocation <= player1XLocation + playerWidth)
    {
        if (yLocation >= player1YLocation && yLocation <= player1YLocation + playerHeight)
        {
            xSpeed = -xSpeed;
            if (isUpKeyPressed) ySpeed = initialSpeed + 8;
            if (isDownKeyPressed) ySpeed = -initialSpeed - 8;
        }
    }
    if (xLocation + ballSize >= player2XLocation)
    {
        if (yLocation >= player2YLocation && yLocation <= player2YLocation + playerHeight)
        {
            xSpeed = -xSpeed;
            if (prevPlayer2Location < player2YLocation)
            {
                ySpeed = -initialSpeed - 6; 
            } 
            else 
            {
                ySpeed = initialSpeed + 6;
            }
        }
    }
    prevPlayer2Location = player2YLocation;
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

function movePlayer2()
{
    if (xSpeed === initialSpeed)
    {
        if (player2YLocation >= yLocation)
        {
            if (player2YLocation >= 0) player2YLocation -= playerSpeed;
        }
        else 
        {
            if (player2YLocation <= canvasHeight - playerHeight) player2YLocation += playerSpeed;
        }
    }
    context.fillRect(player2XLocation, player2YLocation, playerWidth, playerHeight);
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
    if (xLocation + ballSize * 1.5 >= canvasWidth)
    {
        player1Score++;
        context.clearRect(xLocation, yLocation, ballSize, ballSize);
        context.clearRect(0, 0, 1000, 100); 
        context.fillText(player1Score, 10, 50, 500, 500);
        context.fillText(player2Score, canvasWidth - 40, 50, 500, 500); 
        xLocation = canvasWidth / 2 - ballSize;
        yLocation = canvasHeight / 2 - ballSize / 3;
        xSpeed = 0;
        ySpeed = 0;
        player2YLocation = canvasHeight / 2 - playerHeight / 2;
        setTimeout(relocateBall, 1000);
    } 
    if (xLocation <= 0 + ballSize)
    {
        player2Score++;
        context.clearRect(xLocation, yLocation, ballSize, ballSize);
        context.clearRect(0, 0, 1000, 100); 
        context.fillText(player1Score, 10, 50, 500, 500);
        context.fillText(player2Score, canvasWidth - 40, 50, 500, 500); 
        xLocation = canvasWidth / 2 - ballSize;
        yLocation = canvasHeight / 2 - ballSize / 3;
        xSpeed = 0;
        ySpeed = 0;
        player2YLocation = canvasHeight / 2 - playerHeight / 2;
        setTimeout(relocateBall, 1000);
    } 
}

function moveBall()
{
    if (yLocation + ballSize >= canvasHeight)
    {
        if (ySpeed > 10)
        {
            ySpeed = initialSpeed - 0.5;
        }
        else
        {
            ySpeed = initialSpeed;
        }
    } 
    if (yLocation <= 0)
    {
        if (ySpeed < -10)
        {
            ySpeed = -initialSpeed + 0.5;
        }
        else
        {
            ySpeed = -initialSpeed;
        }
    } 
    xLocation += xSpeed;
    yLocation -= ySpeed;
    
    context.fillRect(xLocation, yLocation, ballSize, ballSize);
}