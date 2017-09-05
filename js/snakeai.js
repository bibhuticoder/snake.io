class SnakeAi{
	constructor(ctx){		
		this.ctx = ctx;
		this.name = ut.randomName();
		this.score = 0;
		this.force =  2;		
		this.velocity = new Point(0, 0); //arbitary point		
		this.angle = 0;		

		// color
		this.mainColor = ut.randomColor();
		this.midColor = ut.color(this.mainColor, 0.33);
		this.supportColor = ut.color(this.midColor, 0.33);

		this.MAXSIZE = 12;	
		this.size = 7;
		this.length = ut.random(10, 50);			
		this.arr = [];		

		this.arr.push(new Point(ut.random(-6000, 1800), ut.random(-300, 900)));
		for(var i=1; i<this.length; i++) this.arr.push(new Point(this.arr[i-1].x, this.arr[i-1].y));


		this.initAiMovement();
	}

	initAiMovement(){
		var self = this;
		var moveArr = [];
		var moveCount = 5;
		var count = 0;
		//initially
		for (var i = 0; i < moveCount; i++) moveArr.push(i*(Math.PI/moveCount));
		this.timer = setInterval(function(){
			
			if(count == moveCount){
				count = 0;
				moveArr = [];
				//clockwise
				if(ut.random(0, 100)%5 == 0){
					for (var i = 0; i < moveCount; i++) moveArr.push(i*(Math.PI/10));				
				}

				//anti-clockwise
				else if(ut.random(0, 100)%3 == 0){
					for (var i = moveCount-1; i >= 0; i--) moveArr.push(i*(Math.PI/10));	
				}

				//straight
				else{
					for (var i = 0; i < moveCount; i++) moveArr.push(0);
				}
			}

			self.angle += moveArr[count];
			count++;				
			
		}, 100);
	}

	

	drawHead(){
		
		var x = this.arr[0].x;
		var y = this.arr[0].y;

		//head
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+2, 0, 2*Math.PI);		
		this.ctx.fill();

		//face
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size, 0, 2*Math.PI);		
		this.ctx.fill();

		//eye
		var d = 2;
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(x + d*Math.cos(this.angle), y + d*Math.sin(this.angle), this.size/1.5, 0, 2*Math.PI);		
		this.ctx.fill();

		//retina
		var d = 3;
		this.ctx.fillStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc(x + d*Math.cos(this.angle), y + d*Math.sin(this.angle), this.size/4, 0, 2*Math.PI);		
		this.ctx.fill();


		//name
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-5, y-10);
	}

	drawBody(x, y, i){		
		var grd=this.ctx.createRadialGradient(x, y, 2, x+4, y+4, 10);
		grd.addColorStop(0, this.supportColor);
		grd.addColorStop(0.3, this.midColor);
		grd.addColorStop(1, this.mainColor);		
		this.ctx.fillStyle = grd;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size - (i*0.01), 0, 2*Math.PI);
		this.ctx.fill();	
	}

	move(player){
		this.velocity.x = this.force*Math.cos(this.angle);
		this.velocity.y = this.force*Math.sin(this.angle);
		for(var i=this.length-1; i>=1; i--){
			this.arr[i].x = this.arr[i-1].x - 1*Math.cos(this.angle);
			this.arr[i].y = this.arr[i-1].y - 1*Math.sin(this.angle);			
			
			//relative motion with player
			this.arr[i].x += (-1 * player.velocity.x);
			this.arr[i].y += (-1 * player.velocity.y);

			this.drawBody(this.arr[i].x, this.arr[i].y, i);
		}

		//move head		
		this.arr[0].x += this.velocity.x;
		this.arr[0].y += this.velocity.y;

		//relative motion with player
		this.arr[0].x -= player.velocity.x;
		this.arr[0].y -= player.velocity.y;

		
		this.drawHead();
		this.checkCollissionFood();	
		// this.checkCollissionSnake();
	}

	
	//check snake and food collission
	checkCollissionFood(){	
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		for (var i = 0; i < game.foods.length; i++) {
			if(ut.cirCollission(x, y, this.size, game.foods[i].pos.x,
			game.foods[i].pos.y, game.foods[i].size)){
				game.foods[i].die();
				this.addScore();			 
				this.incSize();
			}			
		}
	}

	checkCollissionSnake(){
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		for (var i = 0; i < game.snakes.length; i++) {
			var s =  game.snakes[i];
			if(s !== this){
				for (var j = 0; j < s.arr.length; j++) {
					if(ut.cirCollission(x, y, this.size, s.arr[j].x, s.arr[j].y, s.size)){
						game.snakes.splice(i, 1);
					}       
				}		
			}		
		}
	}

	addScore(){
		this.length++;
		this.score++;
		this.arr.push(new Point(-100, -100));	
	}

	incSize(){
		if(this.length%30 == 0) this.size++;	
		if(this.size > this.MAXSIZE) this.size = this.MAXSIZE;		
	}

	die(){

	}
	

}