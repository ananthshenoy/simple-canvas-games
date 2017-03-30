
(function() {

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	var rectWidth = (width-40)/10;
	var rectHeight = (height-40)/10;
	var ballRadius = 10;
	var boardInfo = {};
	var snakeObjArr = [{x:82,y:25}, {x:67,y:5}];
	var ladderObjArr = [{x:12,y:89}, {x:19,y:61}, {x:66,y:87}];
	var playersCell = [1,1];
	var currPlayerIndex = 0;
	var buttonClicked = false;

	var playerDice = document.getElementById('playerDice');

	playerDice.addEventListener("click", function() { runGame(currPlayerIndex); buttonClicked = true; });
	
	init();

	function init() {
		drawBoard();
		drawSnake(snakeObjArr);
		drawLadder(ladderObjArr);
		initPlayer();		
	}

	function checkSnakeOrLadder(currPlayerCell) {
		var snakeIndex = snakeObjArr.findIndex(obj => {
			return obj.x === currPlayerCell;
		});
		if(snakeIndex !== -1) {
			currPlayerCell = snakeObjArr[snakeIndex].y;
		}
		var ladderIndex = ladderObjArr.findIndex(obj => {
			return obj.x === currPlayerCell;
		});
		if(ladderIndex !== -1) {
			currPlayerCell = ladderObjArr[ladderIndex].y;
		}
		return currPlayerCell;
	}

	function generateNum(currPlayerCell, playerIndex) {
		var num = Math.floor(Math.random() * 6) + 1;
		if(currPlayerCell + num <= 100) {
			currPlayerCell = currPlayerCell + num;
			currPlayerCell = checkSnakeOrLadder(currPlayerCell);	
		}	

		if(currPlayerCell === 100)
			alert("Player"+playerIndex+" won!!");	
		
		buttonClicked = false;	
		return currPlayerCell;	
	}

	function isOtherPlayerInSameCell(currPlayerCell, currPlayerIndex) {
		var index = playersCell.findIndex(cell => {
			return cell === currPlayerCell;
		});
		return (currPlayerIndex !== 0 && index !== currPlayerIndex) ? true : false;
	}

	function runGame(playerIndex) {
		if(buttonClicked) {
			currPlayerIndex = playerIndex;
			var currPlayerCell = playersCell[currPlayerIndex];
			ctx.beginPath();
			if(!isOtherPlayerInSameCell(currPlayerCell, currPlayerIndex)) {
				ctx.clearRect(boardInfo[currPlayerCell].xCoordinate-ballRadius,
					  boardInfo[currPlayerCell].yCoordinate-ballRadius, 2*ballRadius,2*ballRadius);
			}
			currPlayerCell = generateNum(currPlayerCell, playerIndex);
			ctx.arc(boardInfo[currPlayerCell].xCoordinate, boardInfo[currPlayerCell].yCoordinate, ballRadius, 0, Math.PI*2);
			ctx.fill();
			ctx.closePath();

			drawSnake(snakeObjArr);
			drawLadder(ladderObjArr);

			playersCell[playerIndex] = currPlayerCell;
			if(playerIndex !== playersCell.length -1){
				currPlayerIndex = playerIndex+1;
			} else {
				currPlayerIndex = 0;
			}

		}
		
	}

	function initPlayer() {
		ctx.beginPath();
		ctx.arc(boardInfo[1].xCoordinate,boardInfo[1].yCoordinate, ballRadius, 0, Math.PI*2);
		ctx.fill();
		ctx.arc(boardInfo[1].xCoordinate,boardInfo[1].yCoordinate, ballRadius, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();
	}

	function drawLadder(ladderObjArr) {
		for(var i=0; i<ladderObjArr.length; i++) {
			var obj = ladderObjArr[i];
		 	ctx.beginPath();
			var xValue = obj.x, yValue = obj.y;
		 	ctx.moveTo(boardInfo[xValue].xCoordinate, boardInfo[xValue].yCoordinate);
			ctx.lineTo(boardInfo[yValue].xCoordinate, boardInfo[yValue].yCoordinate);
		 	ctx.moveTo(boardInfo[xValue].xCoordinate - 10, boardInfo[xValue].yCoordinate - 10);
			ctx.lineTo(boardInfo[yValue].xCoordinate - 10, boardInfo[yValue].yCoordinate - 10);

			ctx.lineWidth = 5;
			ctx.strokeStyle = "blue";
			ctx.stroke();
		}
	}

	function drawSnake(snakeObjArr) {
		for(var i=0; i<snakeObjArr.length; i++) {
			var obj = snakeObjArr[i];
		 	ctx.beginPath();
		 	var xValue = obj.x, yValue = obj.y;
		 	ctx.moveTo(boardInfo[xValue].xCoordinate, boardInfo[xValue].yCoordinate);
			ctx.lineTo(boardInfo[yValue].xCoordinate, boardInfo[yValue].yCoordinate);
			ctx.lineWidth = 10;
			ctx.strokeStyle = "red";
			ctx.stroke();
		}
	}

	function drawBoard() {
		ctx.rect(20, 20,width-40,height-40);
		ctx.stroke();
		
		var rectValue = 1 , forwardPass = true;

		for(var i=0; i<10; i++) {
			var x = 20, y = 20 + (i*rectHeight);
			for(var j=0; j<10; j++) {
				var cellValue = 101-rectValue;

				ctx.rect(x, y, rectWidth, rectHeight);
				ctx.stroke();
				ctx.font = "16px Arial";
    			ctx.fillStyle = "black";
    			ctx.fillText(cellValue, (x+(rectWidth/2)), (y+(rectHeight/2)));

    			boardInfo[cellValue] = {xCoordinate: x + rectWidth - ballRadius - 1, yCoordinate: y+rectHeight-ballRadius-1};

    			forwardPass ? rectValue++ : rectValue--;
				x = x + rectWidth;
			}
			forwardPass = !forwardPass;
			forwardPass ? rectValue = rectValue + 11 : rectValue = rectValue + 9;
		}
	}

})();



