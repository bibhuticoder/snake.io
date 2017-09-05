class Game{
	constructor(canvas, ctxSnake, ctxFood, ctxHex){
		this.canvas = canvas;
		this.ctxSnake = ctxSnake;	
		this.ctxFood = ctxFood;
		this.ctxHex = ctxHex;	
		this.mouseDown;	
		this.cursor;
		this.WORLD = new Point(2000, 1000);		
		this.SCREEN = new Point(800, 400);
						
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
		for(var i=0; i<500; i++){			
			this.foods.push(new Food(this.ctxFood, ut.random(-600, 1800), ut.random(-300, 900)));
		}

		//bricks		
		var size = 50;
		var inRows = this.SCREEN.x/size + 2;
		var inCols = this.SCREEN.y/size + 2;
		var start = new Point(-size, -size);
		for(var i=0; i<inRows; i++){
			for(var j=0; j<inCols; j++){
				var point = new Point(start.x + i*size, start.y + j*size);				
				this.bricks.push(point);
			}
		}
					
		

	}

	draw(){

		//draw bricks
		this.drawBricks();

		//draw world
		this.drawWorld();	
		

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
		this.ctxFood.lineWidth = 2;
		this.ctxFood.strokeRect(-(this.WORLD.x/2 - this.SCREEN.x/2),
		-(this.WORLD.y/2 - this.SCREEN.y/2), this.WORLD.x, this.WORLD.y);
		this.ctxFood.stroke();
		this.ctxFood.lineWidth = 1;
	}

	drawScore(){
		var start = new Point(20, 20);
		for (var i = 0; i < this.snakes.length; i++) {			
			this.ctxFood.fillStyle = this.snakes[i].mainColor;
			this.ctxFood.font="bold 10px Arial";
			this.ctxFood.fillText(this.snakes[i].name + ":" + this.snakes[i].score, start.x-5, start.y +i*15);
		}
	}

	drawMap(){
		var start = new Point(20, 20);
		this.ctxFood.fillStyle = "#373737";
		var mapSize = new Point(100, 50);
		this.ctxFood.fillRect(start.x, this.canvas.height-mapSize.y, mapSize.x,  mapSize.y);
		this.ctxFood.fill();

		//draw player in map
		this.ctxFood.fillStyle = "red";
		var playerInMap = new Point(mapSize.x/1800 * this.snakes[0].pos.x,
		mapSize.y/900 * this.snakes[0].pos.y);
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

			// this.ctxHex.fillStyle = "#2C3E50";
			// this.ctxHex.fillRect(this.bricks[i].x + 5, this.bricks[i].y + 5, 40, 40);

			//left
			if(this.bricks[i].x + size < 0)this.bricks[i].x = this.SCREEN.x;
			//right
			else if(this.bricks[i].x > this.SCREEN.x)this.bricks[i].x = -size;
			//up
			else if(this.bricks[i].y + size < 0)this.bricks[i].y = this.SCREEN.y;
			//down
			else if(this.bricks[i].y > this.SCREEN.y)this.bricks[i].y = -size;
		}
	}

}