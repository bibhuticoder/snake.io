class Game{
	constructor(canvas, ctxSnake, ctxFood, ctxHex){
		this.canvas = canvas;
		this.ctxSnake = ctxSnake;	
		this.ctxFood = ctxFood;
		this.ctxHex = ctxHex;	
		this.mouseDown;	
		this.cursor;
		this.WORLD_SIZE = new Point(4000, 2000);		
		this.SCREEN_SIZE = new Point(800, 400);

		this.world = new Point(-1200, -600);
						
		this.snakes = [];		
		this.foods = [];
		this.bricks = [];		
	}

	init(){	
	
		this.mouseDown = false;
		this.cursor = new Point(0,0);		
		this.snakes[0] = new Snake(this.ctxSnake);

		for(var i=0; i<2; i++) this.snakes.push(new SnakeAi(this.ctxSnake));

		// generate foods
		for(var i=0; i<1000; i++){			
			this.foods.push(new Food(this.ctxFood, ut.random(-1200 +  50, 2800 - 50),
			ut.random(-600 + 50, 1400 - 50)));
		}

		//bricks		
		var size = 50;
		var inRows = this.SCREEN_SIZE.x/size + 2;
		var inCols = this.SCREEN_SIZE.y/size + 2;
		var start = new Point(-size, -size);
		for(var i=0; i<inRows; i++){
			for(var j=0; j<inCols; j++){
				var point = new Point(start.x + i*size, start.y + j*size);				
				this.bricks.push(point);
			}
		}
					
		

	}

	draw(){

		

		//draw world
		this.drawWorld();

		//draw bricks
		// this.drawBricks();			

		// move yourself
		this.snakes[0].move();

		//move other snakes
		for(var i=1; i<this.snakes.length; i++) this.snakes[i].move(this.snakes[0]);		

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

		this.world.x -= (this.snakes[0].velocity.x);
		this.world.y -= (this.snakes[0].velocity.y);

	}

	drawScore(){
		var start = new Point(20, 20);
		for (var i = 0; i < this.snakes.length; i++) {			
			this.ctxFood.fillStyle = this.snakes[i].mainColor;
			this.ctxFood.font="bold 10px Arial";
			this.ctxFood.fillText(this.snakes[i].name + ":" + this.snakes[i].score, start.x-5, start.y +i*15);
		
			this.ctxFood.fillText(this.snakes[0].pos.x + ", " + this.snakes[0].pos.y, 500, 50);
		}
	}

	drawMap(){
		var mapSize = new Point(100, 50);
		var start = new Point(20, this.canvas.height-mapSize.y);
		this.ctxFood.fillStyle = "#373737";		
		this.ctxFood.fillRect(start.x, start.y, mapSize.x,  mapSize.y);
		this.ctxFood.fill();

		//draw player in map
		this.ctxFood.fillStyle = "red";
		var playerInMap = new Point(start.x/this.world.x * this.snakes[0].pos.x,
		start.y/this.world.y * this.snakes[0].pos.y);


		// console.log(playerInMap);
		this.ctxFood.beginPath();
		this.ctxFood.arc(start.x + playerInMap.x, this.canvas.height-mapSize.y + playerInMap.y, 2, 0, 2*Math.PI);
		this.ctxFood.fill();	
	}

	drawBricks(){
		var size = 50;		
		for(var i=0; i<this.bricks.length; i++){			
			// ut.drawHexagon(this.ctxHex, 22, this.bricks[i].x + size/2, this.bricks[i].y + size/2);	
			this.bricks[i].x -= this.snakes[0].velocity.x;
			this.bricks[i].y -= this.snakes[0].velocity.y;

			this.ctxHex.fillStyle = "#2C3E50";
			this.ctxHex.fillRect(this.bricks[i].x + 5, this.bricks[i].y + 5, 40, 40);

			//left
			if(this.bricks[i].x + size < 0)this.bricks[i].x = this.SCREEN_SIZE.x;
			//right
			else if(this.bricks[i].x > this.SCREEN_SIZE.x)this.bricks[i].x = -size;
			//up
			else if(this.bricks[i].y + size < 0)this.bricks[i].y = this.SCREEN_SIZE.y;
			//down
			else if(this.bricks[i].y > this.SCREEN_SIZE.y)this.bricks[i].y = -size;
		}
	}

}