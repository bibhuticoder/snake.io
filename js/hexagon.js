class Hexagon{
	constructor(ctx, x, y){
		this.x = x;
		this.y = y;		
		this.ctx = ctx;					
		this.size = 20;		
		this.fillStyle = "gray";
		this.strokeStyle = "black";
		this.lineWidth = 2;
		this.points = [];

		// var my_gradient=this.ctx.createLinearGradient(this.x-this.size, this.y-this.size, this.size, this.size);
		// my_gradient.addColorStop(0,"black"); 
		// my_gradient.addColorStop(1,"white");
		// this.fillStyle = my_gradient;
		

		this.initialPoint = new Point(x + this.size * Math.cos(0), y + this.size * Math.sin(0));
		for (var i=0; i < 7; i++) {	
			var p = x + this.size * Math.cos(i * 2 * Math.PI / 6);
			var q = y + this.size * Math.sin(i * 2 * Math.PI / 6);
			var point = new Point(p, q);				
			point = ut.rotate(point, new Point(x, y), 60);		  	
		  	this.points.push(point);
		}	
		
	}

	draw(){	

		this.ctx.strokeStyle = this.strokeStyle;
		this.ctx.fillStyle = this.fillStyle;

		// this.ctx.shadowBlur = 10;
		// this.ctx.shadowColor = "black";

		

		// fill
		this.ctx.beginPath();
		this.ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
		for (var i=0; i < 7; i++) {			
		  	this.ctx.lineTo(this.points[i].x, this.points[i].y);
		}
		this.ctx.closePath();		
		this.ctx.fill();

		// stroke
		this.ctx.beginPath();
		this.ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
		for (var i=0; i < 7; i++) {			
		  	this.ctx.lineTo(this.points[i].x, this.points[i].y);
		}	
		this.ctx.closePath();
		this.ctx.lineWidth = 3;	
		this.ctx.stroke();
									
	}
}
