var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = "black";

//circle dimensions
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2, dy = -2;
var ballRadius = 10;

//paddle dimensions
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

//brick dimensions
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var points = 0;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
        bricks[c][r] = { x: 0, y: 0, status: 1 };

    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawPaddle();
	drawBall();
	collisionDetection();
	showPoints();
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    	dx = -dx;
    	ctx.fillStyle = "blue";
	}
	if(y + dy < ballRadius) {
 	   dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
    	if(x > paddleX && x < paddleX + paddleWidth) {
        	dy = -dy;
    	} else {
    		alert("GAME OVER");
    		document.location.reload();
    	}
	}
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
    	paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
	    paddleX -= 7;
	}
	x = x + dx;
	y = y + dy;
}

function showPoints() {
	ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+points, 8, 20);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
        	if(bricks[c][r].status == 1) {
	        	var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
	            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
	            bricks[c][r].x = brickX;
	            bricks[c][r].y = brickY;
	            ctx.beginPath();
	            ctx.rect(brickX, brickY, brickWidth, brickHeight);
	            ctx.fillStyle = "#0095DD";
	            ctx.fill();
	            ctx.closePath();
	        }
        }
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    points = points + 1;
                    if(points == brickColumnCount * brickRowCount) {
                    	alert("You Win!!");
                    	document.location.reload();
                    }
                }
            }
        }
    }
}


function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

setInterval(draw, 10);