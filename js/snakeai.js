class SnakeAi{
	constructor(ctx){		
		this.ctx = ctx;
		this.name = ut.randomName();
		this.score = 0;
		this.force =  4;		
		this.velocity = new Point(2, -3); //arbitary point		
		this.angle = 0;			
		this.color = ut.randomColor();
		this.size = 8;
		this.length = ut.random(10, 50);			
		this.arr = [];		

		this.arr.push(new Point(ut.random(0, 2000), ut.random(0, 1000)));
		for(var i=1; i<this.length; i++) this.arr.push(new Point(this.arr[i-1].x, this.arr[i-1].y));

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
		this.ctx.arc(x, y, this.size+1, 0, 2*Math.PI);		
		this.ctx.fill();

		//eye
		this.ctx.fillStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size-1, 0, 2*Math.PI);		
		this.ctx.fill();

		//name
		this.ctx.fillStyle = this.color;
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-5, y-10);
	}

	drawBody(x, y, i){
		this.ctx.shadowBlur=2;
		var grd=this.ctx.createRadialGradient(x, y, 2, x+3, y+3, 10);
		grd.addColorStop(0,"white");
		grd.addColorStop(1, this.color);
		this.ctx.fillStyle = grd;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size - (i*0.05), 0, 2*Math.PI);
		this.ctx.fill();	

		this.ctx.strokeStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size - (i*0.005), 0, 2*Math.PI);
		this.ctx.stroke();
	}

	move(){
		this.velocity.x = this.force*Math.cos(this.angle);
		this.velocity.y = this.force*Math.sin(this.angle);
		for(var i=this.length-1; i>=1; i--){
			this.arr[i].x = this.arr[i-1].x - 0*Math.cos(this.angle);
			this.arr[i].y = this.arr[i-1].y - 0*Math.sin(this.angle);			
			this.drawBody(this.arr[i].x, this.arr[i].y, i);
		}
		this.arr[0].x += this.velocity.x;
		this.arr[0].y += this.velocity.y;
		this.drawHead();
		this.checkCollission();	
	}

	
	checkCollission(){	
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		for (var i = 0; i < game.foods.length; i++) {
			if(ut.cirCollission(x, y, this.size, game.foods[i].pos.x, game.foods[i].pos.y, game.foods[i].size)){
				 game.foods.splice(i, 1);
				 this.length++;
				 this.score++;
				 this.arr.push(new Point(-100, -100));	
			}			
		}
	}	
	

}