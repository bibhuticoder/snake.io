class Game{
	constructor(ctxSnake, ctxFood, ctxHex){		
		this.ctxSnake = ctxSnake;	
		this.ctxFood = ctxFood;
		this.ctxHex = ctxHex;
		this.WORLD_SIZE = new Point(4000, 2000);		
		this.SCREEN_SIZE = new Point(800, 400);
		this.world = new Point(-1200, -600);						
		this.snakes = [];		
		this.foods = [];
		this.bricks = [];		
	}

	init(){					
		this.snakes[0] = new Snake(this.ctxSnake, "Bibhuti", 0);		
		for(var i=0; i<10; i++) this.addSnake(ut.randomName(), 100);		
		this.generateFoods(1000);			
	}

	draw(){		

		//draw world
		this.drawWorld();

		//draw bricks
		// this.drawBricks();			

		// move yourself
		if(this.snakes[0].state === 0)
			this.snakes[0].move();

		//move other snakes
		for(var i=1; i<this.snakes.length; i++)
		if(this.snakes[i].state === 0) this.snakes[i].move(this.snakes[0]);		

		//draw food
		for(var i=0; i<this.foods.length; i++) this.foods[i].draw(this.snakes[0]);			
		
		//draw Score
		this.drawScore();

		//draw map
		this.drawMap();
	}

	drawWorld(){
				
		this.ctxHex.fillStyle = "white";
		this.ctxHex.fillRect(this.world.x - 2, this.world.y - 2, this.WORLD_SIZE.x+4, this.WORLD_SIZE.y+4);

		this.ctxHex.fillStyle = "#17202A";
		this.ctxHex.fillRect(this.world.x, this.world.y, this.WORLD_SIZE.x, this.WORLD_SIZE.y);

		this.world.x -= this.snakes[0].velocity.x;
		this.world.y -= this.snakes[0].velocity.y;
	}

	drawScore(){
		var start = new Point(20, 20);
		for (var i = 0; i < this.snakes.length; i++) {			
			this.ctxSnake.fillStyle = this.snakes[i].mainColor;
			this.ctxSnake.font="bold 10px Arial";
			this.ctxSnake.fillText(this.snakes[i].name + ":" + this.snakes[i].score,
			start.x-5, start.y +i*15);		
		}
	}

	drawMap(){

		this.ctxSnake.globalAlpha = 0.5;

		var mapSize = new Point(100, 50);
		var start = new Point(20, this.SCREEN_SIZE.y-mapSize.y-10);
		this.ctxSnake.fillStyle = "white";		
		this.ctxSnake.fillRect(start.x, start.y, mapSize.x,  mapSize.y);
		this.ctxSnake.fill();

		this.ctxSnake.globalAlpha = 1;
		

		//draw all player in map	
		for (var i = 0; i < this.snakes.length; i++) {
			var playerInMap = new Point(start.x + (mapSize.x/this.WORLD_SIZE.x) * this.snakes[i].pos.x,
			start.y + (mapSize.y/this.WORLD_SIZE.y) * this.snakes[i].pos.y);

			// console.log(playerInMap);
			this.ctxSnake.fillStyle = this.snakes[i].mainColor;
			this.ctxSnake.beginPath();
			this.ctxSnake.arc(start.x + playerInMap.x, playerInMap.y + 10, 2, 0, 2*Math.PI);
			this.ctxSnake.fill();
		}	

		
	}

	// drawBricks(){
	// 	var size = 50;		
	// 	for(var i=0; i<this.bricks.length; i++){			
	// 		 ut.drawHexagon(this.ctxHex, 22, this.bricks[i].x + size/2, this.bricks[i].y + size/2);	
	// 		this.bricks[i].x -= this.snakes[0].velocity.x;
	// 		this.bricks[i].y -= this.snakes[0].velocity.y;

	// 		// this.ctxHex.fillStyle = "#2C3E50";
	// 		// this.ctxHex.fillRect(this.bricks[i].x + 5, this.bricks[i].y + 5, 40, 40);

	// 		//left
	// 		if(this.bricks[i].x + size < 0)this.bricks[i].x = this.SCREEN_SIZE.x;
	// 		//right
	// 		else if(this.bricks[i].x > this.SCREEN_SIZE.x)this.bricks[i].x = -size;
	// 		//up
	// 		else if(this.bricks[i].y + size < 0)this.bricks[i].y = this.SCREEN_SIZE.y;
	// 		//down
	// 		else if(this.bricks[i].y > this.SCREEN_SIZE.y)this.bricks[i].y = -size;
	// 	}
	// }

	
	addSnake(name, id){

		this.snakes.push(new SnakeAi(this.ctxSnake, name, id))
	}

	generateFoods(n){
		for(var i=0; i<n; i++){			
			this.foods.push(new Food(this.ctxFood, ut.random(-1200 +  50, 2800 - 50),
			ut.random(-600 + 50, 1400 - 50)));
		}
	}

	// generateBricks(){
	// 	var size = 50;
	// 	var inRows = this.SCREEN_SIZE.x/size + 2;
	// 	var inCols = this.SCREEN_SIZE.y/size + 2;
	// 	var start = new Point(-size, -size);
	// 	for(var i=0; i<inRows; i++){
	// 		for(var j=0; j<inCols; j++){
	// 			var point = new Point(start.x + i*size, start.y + j*size);				
	// 			this.bricks.push(point);
	// 		}
	// 	}
	// }

}