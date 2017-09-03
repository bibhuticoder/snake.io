var canvas = document.getElementById("canvas1");
var ctxSnake = document.getElementById("canvas1").getContext("2d");
var ctxFood = document.getElementById("canvas1").getContext("2d");
var ut = new Util();
var game = new Game(canvas, ctxSnake, ctxFood);

canvas.onmousemove = function(e){
	if(game.mouseDown){
		game.cursor = ut.getMousePos(canvas, e);		
		if(ut.getDistance(game.snake.arr[0], game.cursor) > 20){			
			game.snake.angle = ut.getAngle(game.snake.arr[0], game.cursor);
		}
	}
}

canvas.onmousedown = function(e){
	game.mouseDown = true;	
}

canvas.onmouseup = function(e){	
	game.mouseDown = false;
}

function init(){
	//set canvas width and height
	canvas.setAttribute("width", 800);
	canvas.setAttribute("height", 400);
	document.getElementById("game").style.width = ("width", canvas.width + 10) + "px";
	document.getElementById("game").style.height = ("height", canvas.height + 10)+ "px";
	game.init();
	update();
}


var updateId,	
previousDelta = 0,
fpsLimit = 20;
function update(currentDelta){
	updateId = requestAnimationFrame(update);
	var delta = currentDelta - previousDelta;
    if (fpsLimit && delta < 1000 / fpsLimit) return;
    		
	ctxFood.clearRect(0, 0, canvas.width, canvas.height);
	ctxSnake.clearRect(0, 0, canvas.width, canvas.height);		
	game.draw();

	previousDelta = currentDelta;
}


init();






