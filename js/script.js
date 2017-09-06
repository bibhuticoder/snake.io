var canvas = document.getElementById("canvasSnake");
var ctxSnake = document.getElementById("canvasSnake").getContext("2d");
var ctxFood = document.getElementById("canvasFood").getContext("2d");
var ctxHex = document.getElementById("canvasHex").getContext("2d");
var ut = new Util();
var mouseDown = false,
	cursor = new Point(0, 0);
var game = new Game(ctxSnake, ctxFood, ctxHex);

canvas.onmousemove = function(e){
	if(mouseDown){		
		cursor = ut.getMousePos(canvas, e);	
		var ang = ut.getAngle(game.snakes[0].arr[0], cursor);				
		game.snakes[0].changeAngle(ang);		
	}
}

canvas.onmousedown = function(e){
	mouseDown = true;	
}

canvas.onmouseup = function(e){	
	mouseDown = false;
}

function start(){	
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
    previousDelta = currentDelta;

    //clear all
	ctxFood.clearRect(0, 0, canvas.width, canvas.height);
	ctxSnake.clearRect(0, 0, canvas.width, canvas.height);
	ctxHex.clearRect(0, 0, canvas.width, canvas.height);

	//draw all
	game.draw();	
}


start();






