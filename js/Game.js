class Game{
	constructor(canvas, ctxSnake, ctxFood){
		this.canvas = canvas;
		this.ctxSnake = ctxSnake;	
		this.ctxFood = ctxFood;	
		this.mouseDown;	
		this.cursor;
		
		this.score = 0;
		this.snake;
		this.aiSnakes = [];
		this.foods = [];	

		
	}

	init(){	
	
		this.mouseDown = false;
		this.cursor = new Point(0,0);		
		this.snake = new Snake(this.ctxSnake);

		for(var i=0; i<10; i++) this.aiSnakes.push(new SnakeAi(this.ctxSnake));

		// generate foods
		for(var i=0; i<100; i++){
			this.foods.push(new Food(this.ctxFood, ut.random(0, 2000), ut.random(0, 1000)));
		}

	}

	draw(){
	
		this.snake.move();

		//move other snakes
		for(var i=0; i<this.aiSnakes.length; i++){
			this.aiSnakes[i].move();
			for(var j=0; j<this.aiSnakes[i].arr.length; j++){
				this.aiSnakes[i].arr[j].x += -4 * this.snake.velocity.x;
				this.aiSnakes[i].arr[j].y += -4 * this.snake.velocity.y;
			}
		} 

		//move food
		for(var i=0; i<this.foods.length; i++){
			this.foods[i].draw();
			this.foods[i].pos.x += -4 * this.snake.velocity.x;
			this.foods[i].pos.y += -4 * this.snake.velocity.y;
		} 
		
	}

	reset(){
		
	}

}