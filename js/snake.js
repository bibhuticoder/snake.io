class Snake{
	constructor(ctx){		
		this.ctx = ctx;
		this.name = "Bibhuti";
		this.score = 0;
		this.force =  1;

		this.pos = new Point(game.WORLD.x/2 - game.SCREEN.x/2,
		game.WORLD.y/2 - game.SCREEN.y/2);		

		this.velocity = new Point(2, -3); //arbitary point		
		this.angle = 0;	
		this.length = 10;	
		this.size = 5;			
		this.color = "salmon";
		this.arr = [];
		
		this.arr.push(new Point(game.SCREEN.x/2, game.SCREEN.y/2));
		for(var i=1; i<this.length; i++){
			this.arr.push(new Point(this.arr[i-1].x, this.arr[i-1].y));
		}

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
		this.ctx.arc(x, y, this.size - (i*0.005), 0, 2*Math.PI);
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
			this.arr[i].x = this.arr[i-1].x - 3*Math.cos(this.angle);
			this.arr[i].y = this.arr[i-1].y - 3*Math.sin(this.angle);			
			this.drawBody(this.arr[i].x, this.arr[i].y, i);
		}
		this.arr[0].x += this.velocity.x;
		this.arr[0].y += this.velocity.y;

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		this.drawHead();	

		this.checkBoundary();
		this.checkCollission();
	}

	checkBoundary(){
		
		var x = this.arr[0].x;
		var y = this.arr[0].y;

		if(x > 700) this.arr[0].x = 700;
		else if(x < 100) this.arr[0].x = 100;
		if(y > 300) this.arr[0].y = 300;
		else if(y < 100) this.arr[0].y = 100;


	}
	
	//check snake and fod collission
	checkCollission(){	
		var x = this.arr[0].x;
		var y = this.arr[0].y;

		for (var i = 0; i < game.foods.length; i++) {
			if(ut.cirCollission(x, y, this.size, game.foods[i].pos.x, game.foods[i].pos.y, game.foods[i].size)){
				 game.foods.splice(i, 1);
				 this.length++;
				 this.score++;
				 this.arr.push(new Point(-100, -100));				 
				 if(this.length%10 == 0) this.size++;	
			}			
		}
	}

	
	

}