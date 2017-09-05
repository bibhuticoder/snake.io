var canvas = document.getElementById("canvasSnake");
var ctxSnake = document.getElementById("canvasSnake").getContext("2d");
var ctxFood = document.getElementById("canvasFood").getContext("2d");
var ctxHex = document.getElementById("canvasHex").getContext("2d");
var ut = new Util();
var game = new Game(canvas, ctxSnake, ctxFood, ctxHex);

canvas.onmousemove = function(e){
	if(game.mouseDown){		
		game.cursor = ut.getMousePos(canvas, e);	
		var ang = ut.getAngle(game.snakes[0].arr[0], game.cursor);				
		game.snakes[0].changeAngle(ang);		
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
	ctxHex.clearRect(0, 0, canvas.width, canvas.height);

	game.draw();

	// requestAnimationFrame(update)

	previousDelta = currentDelta;
}


init();






