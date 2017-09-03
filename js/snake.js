class Snake{
	constructor(ctx){		
		this.ctx = ctx;
		this.force =  1;
		this.pos = new Point(100, 100);
		this.velocity = new Point(2, -3); //arbitary point		
		this.angle = 0;		
		this.size = 10;	
		this.length = this.size * 2;
		this.color = "salmon";
		this.arr = [];
		
		this.arr.push(new Point(100, 100));
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


	}

	drawBody(x, y, i){
		this.ctx.shadowBlur=2;
		var grd=this.ctx.createRadialGradient(x, y, 2, x+3, y+3, 10);
		grd.addColorStop(0,"white");
		grd.addColorStop(1, this.color);
		this.ctx.fillStyle = grd;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size - (i*0.1), 0, 2*Math.PI);
		this.ctx.fill();	
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
		this.drawHead();	
	}

	checkBoundary(canvas){
	}

	reset(){		
	}

	checkCollission(target){	
	}

	
	

}