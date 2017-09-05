class Food{
	constructor(ctx, x, y){		
		this.ctx = ctx;		
		this.pos = new Point(x, y);		
		this.sizeMin = 2;
		this.sizeMax = 5;

		this.mainColor = ut.randomColor();
		this.supportColor = ut.color(this.midColor, 0.5);

		this.size = ut.random(this.sizeMin, this.sizeMax);		
		
	}

	draw(player){	

		
		// var grd=this.ctx.createRadialGradient(this.pos.x + this.size/2, this.pos.y + this.size/2, 2,
		// this.pos.x + this.size/2 + 3, this.pos.y + this.size/2 + 3, 10);		
		// grd.addColorStop(0, this.supportColor);
		// grd.addColorStop(1, this.mainColor);

		var grd = this.ctx.createLinearGradient(this.pos.x, this.pos.y, this.size*2, this.size*2);
		grd.addColorStop(0, this.mainColor);
		grd.addColorStop(1, this.supportColor);
		this.ctx.fillStyle = grd;

		this.ctx.fillStyle = grd;

		this.pos.x += -4 * player.velocity.x;
		this.pos.y += -4 * player.velocity.y;

		this.ctx.beginPath();
		this.ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI);		
		this.ctx.fill();

		
									
	}

	reinstate(){
		this.pos = new Point(ut.random(-600, 1800), ut.random(-300, 900));
	}

}