class Food{
	constructor(ctx, x, y){		
		this.ctx = ctx;		
		this.pos = new Point(x, y);		
		this.sizeMin = 2;
		this.sizeMax = 5;
		this.mainColor = ut.randomColor();
		this.supportColor = ut.color(this.mainColor, 0.5);

		this.size = ut.random(this.sizeMin, this.sizeMax);		
		
	}

	draw(player){	

		this.pos.x -= player.velocity.x;
		this.pos.y -= player.velocity.y;

		this.ctx.shadowBlur = 5;		
		this.ctx.shadowColor = this.supportColor;
		this.ctx.fillStyle = this.supportColor;
		this.ctx.beginPath();
		this.ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI);		
		this.ctx.fill();

		this.ctx.shadowBlur = 8;
		this.ctx.shadowColor = this.mainColor;
		this.ctx.fillStyle = this.mainColor;
		this.ctx.beginPath();
		this.ctx.arc(this.pos.x, this.pos.y, this.size, Math.PI, 2*Math.PI);		
		this.ctx.fill();	

		this.ctx.shadowBlur = 0;											
	}

	die(){
		var index = game.foods.indexOf(this);
		game.foods.splice(index, 1);
	}


}