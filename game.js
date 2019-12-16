let canvas;
let context;

const canvasWidth = 800;
const canvasHeight = 550;
const ballSize = 25;

function InitializeGame()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(canvasWidth/2 - ballSize, canvasHeight/2 - ballSize, ballSize, ballSize);
    context.font = '48px arial';
    context.fillText('0', 10, 50, 500, 500);
    context.fillText('0', canvasWidth - 40, 50, 500, 500);
    setInterval(moveBall, 1000/30);
}

function moveBall()
{
}