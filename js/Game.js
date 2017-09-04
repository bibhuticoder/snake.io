class Game{
	constructor(canvas, ctxSnake, ctxFood){
		this.canvas = canvas;
		this.ctxSnake = ctxSnake;	
		this.ctxFood = ctxFood;	
		this.mouseDown;	
		this.cursor;
		this.WORLD = new Point(2000, 1000);		
		this.SCREEN = new Point(800, 400);
		this.SNAKE_BOUNDARY = new Point(600, 200);
		
		this.snake;
		this.aiSnakes = [];
		this.foods = [];
		this.hexagons = [];

		
	}

	init(){	
	
		this.mouseDown = false;
		this.cursor = new Point(0,0);		
		this.snake = new Snake(this.ctxSnake);

		for(var i=0; i<10; i++) this.aiSnakes.push(new SnakeAi(this.ctxSnake));

		// generate foods
		for(var i=0; i<200; i++){
			this.foods.push(new Food(this.ctxFood, ut.random(0, 2000), ut.random(0, 1000)));
		}

		//hexagons
		// var size = 40;
		// var start = new Point(0, 0);
		// var inRows = this.WORLD.x/size;
		// var inCols = this.WORLD.y/size;

		// var inRows = inRows/5;
		// var inCols = inCols/5;

		// for(var i=0; i<inRows; i++){
		// 	for(var j=0; j<inCols; j++){
		// 		var point = new Point(start.x + i*size + 30*(i+j), start.y + j*size - 5*(i+j));				
		// 		this.hexagons.push(new Hexagon(this.ctxFood, point.x, point.y));
		// 	}
		// }

		//bricks
		this.bricks = [];
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

		
		//draw world
		this.ctxFood.lineWidth = 2;
		this.ctxFood.strokeRect(-(this.WORLD.x/2 - this.SCREEN.x/2),
		-(this.WORLD.y/2 - this.SCREEN.y/2), this.WORLD.x, this.WORLD.y);
		this.ctxFood.stroke();
		this.ctxFood.lineWidth = 1;

		//draw hexagon	
		// for(var i=0; i<this.hexagons.length; i++){
		// 	this.hexagons[i].draw();
		// }

		//draw bricks
		this.ctxFood.fillStyle = "gray";
		for(var j=0; j<this.bricks.length; j++){

			var i = j;

			// this.ctxFood.strokeRect(this.bricks[j].x, this.bricks[j].y, 50, 50);
			// this.ctxFood.stroke();

			ut.drawHexagon(this.ctxFood, 22, this.bricks[i].x + 25, this.bricks[i].y + 25);

			// this.ctxFood.fillRect(this.bricks[i].x + 5, this.bricks[i].y +5, 40, 40);
			

			this.bricks[i].x += -1 * this.snake.velocity.x;
			this.bricks[i].y += -1 * this.snake.velocity.y;

			//left
			if(this.bricks[i].x + 50 < 0)this.bricks[i].x = this.SCREEN.x;
			//right
			else if(this.bricks[i].x > this.SCREEN.x)this.bricks[i].x = -50;
			//up
			else if(this.bricks[i].y + 50 < 0)this.bricks[i].y = this.SCREEN.y;
			//down
			else if(this.bricks[i].y > this.SCREEN.y)this.bricks[i].y = -50;

		}
		

	    	
		this.snake.move();

		//move other snakes
		for(var i=0; i<this.aiSnakes.length; i++){
			this.aiSnakes[i].move();
			for(var j=0; j<this.aiSnakes[i].arr.length; j++){
				this.aiSnakes[i].arr[j].x += -1 * this.snake.velocity.x;
				this.aiSnakes[i].arr[j].y += -1 * this.snake.velocity.y;
			}
		} 

		//move food
		for(var i=0; i<this.foods.length; i++){
			this.foods[i].draw();
			this.foods[i].pos.x += -4 * this.snake.velocity.x;
			this.foods[i].pos.y += -4 * this.snake.velocity.y;
		} 

		//draw Score
		var start = new Point(20, 20);
		for (var i = 0; i < this.aiSnakes.length; i++) {			
			this.ctxFood.fillStyle = this.aiSnakes[i].color;
			this.ctxFood.font="10px Arial";
			this.ctxFood.fillText(this.aiSnakes[i].name + ":" + this.aiSnakes[i].score, start.x-5, start.y +i*15);
		}

		//draw map
		this.ctxFood.fillStyle = "#373737";
		var mapSize = new Point(100, 50);
		this.ctxFood.fillRect(start.x, this.canvas.height-mapSize.y, mapSize.x,  mapSize.y);
		this.ctxFood.fill();

		//draw player in map
		this.ctxFood.fillStyle = "red";
		var playerInMap = new Point(mapSize.x/this.WORLD.x * this.snake.pos.x,
		mapSize.y/this.WORLD.y * this.snake.pos.y);
		// console.log(playerInMap);
		this.ctxFood.beginPath();
		this.ctxFood.arc(start.x + playerInMap.x, this.canvas.height-mapSize.y + playerInMap.y, 2, 0, 2*Math.PI);
		this.ctxFood.fill();		
	}


}