class Food{
	constructor(ctx, x, y){		
		this.ctx = ctx;		
		this.pos = new Point(x, y);		
		this.sizeMin = 2;
		this.sizeMax = 5;
		this.color = ut.randomColor();
		this.size = ut.random(this.sizeMin, this.sizeMax);		
		
	}

	draw(){	

		// this.ctx.shadowBlur=50;		
		// this.ctx.shadowColor = this.color;

		var grd=this.ctx.createRadialGradient(this.pos.x, this.pos.y, 2, this.pos.x+3, this.pos.y+3, 10);
		grd.addColorStop(1,this.color);
		grd.addColorStop(0, "white");
		this.ctx.fillStyle = grd;

		this.ctx.beginPath();
		this.ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI);		
		this.ctx.fill();

		//reset
		// this.ctx.shadowBlur=0;
							
	}

}