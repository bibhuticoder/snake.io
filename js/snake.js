class Snake{
	constructor(ctx, name, id){		
		this.ctx = ctx;		
		this.name = name;
		this.id = id;
		this.score = 0;
		this.force =  5;
		this.state = 0;
		this.headType = ut.random(0, 2);
	
		
		this.pos = new Point(game.SCREEN_SIZE.x/2, game.SCREEN_SIZE.y/2);	
		this.velocity = new Point(0, 0); //arbitary point		
		this.angle = ut.random(0, Math.PI);	

		this.length = 10;
		this.MAXSIZE = 12;	
		this.size = 7;			
		
		// color
		this.mainColor = ut.randomColor();
		this.midColor = ut.color(this.mainColor, 0.33);
		this.supportColor = ut.color(this.midColor, 0.33);

		this.arr = [];		
		this.arr.push(new Point(game.SCREEN_SIZE.x/2, game.SCREEN_SIZE.y/2));
		for(var i=1; i<this.length; i++){
			this.arr.push(new Point(this.arr[i-1].x, this.arr[i-1].y));
		}

	}

	drawHeadTwoEyeBranch(){

		var x = this.arr[0].x;
		var y = this.arr[0].y;
	
		var d = this.size*1.9;
		var p1 = new Point(x + d*Math.cos(this.angle), y+ d*Math.sin(this.angle));
		p1 = ut.rotate(p1, this.arr[0], Math.PI/6)	
		var p2 = ut.rotate(new Point(p1.x, p1.y), this.arr[0], -Math.PI/3);
		
		
		//eye1
		//muscle
		this.ctx.fillStyle = this.mainColor;
		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, this.size/2 + 2, 0, 2*Math.PI);		
		this.ctx.fill();

		//eye
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, this.size/2, 0, 2*Math.PI);		
		this.ctx.fill();

		//retina
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p1.x + Math.cos(this.angle), p1.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);		
		this.ctx.fill();


		//eye2		
		//muscle
		this.ctx.fillStyle = this.mainColor;
		this.ctx.beginPath();
		this.ctx.arc(p2.x, p2.y, this.size/2 + 2, 0, 2*Math.PI);		
		this.ctx.fill();

		//eye
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p2.x, p2.y, this.size/2, 0, 2*Math.PI);		
		this.ctx.fill();

		//retina
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p2.x + Math.cos(this.angle), p2.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);		
		this.ctx.fill();

		//head
		var grd=this.ctx.createRadialGradient(x, y, 2, x+4, y+4, 10);
		grd.addColorStop(0, this.supportColor);		
		grd.addColorStop(1, this.midColor);	
		this.ctx.fillStyle = grd;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+1, 0, 2*Math.PI);		
		this.ctx.fill();		

		// name
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-10, y-10);		

	}

	drawHeadTwoEye(){

		var x = this.arr[0].x;
		var y = this.arr[0].y;

		//head
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+1, 0, 2*Math.PI);		
		this.ctx.fill();

		
		//eye 1
		var d = this.size/2;
		var p1 = new Point(x + d*Math.cos(this.angle), y+ d*Math.sin(this.angle));
		p1 = ut.rotate(p1, this.arr[0], -20);		
		//eye
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, this.size/2, 0, 2*Math.PI);		
		this.ctx.fill();

		//retina
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p1.x + Math.cos(this.angle), p1.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);		
		this.ctx.fill();


		//eye2
		var p2 = ut.rotate(p1, this.arr[0], 40);		
		//eye
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p2.x, p2.y, this.size/2, 0, 2*Math.PI);		
		this.ctx.fill();

		//retina
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p2.x + Math.cos(this.angle), p2.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);		
		this.ctx.fill();

		//name
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-5, y-10);		

	}

	drawHeadOneEye(){
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
		grd.addColorStop(1, this.midColor);				
		
		var radius = this.size - (i*0.01);
		if(radius < 0) radius = 1;

		this.ctx.beginPath();	
		this.ctx.fillStyle = this.mainColor;
		this.ctx.arc(x, y, radius+1, 0, 2*Math.PI);
		this.ctx.fill();

		this.ctx.fillStyle = grd;
		this.ctx.beginPath();	
		this.ctx.arc(x, y, radius, 0, 2*Math.PI);
		this.ctx.fill();

	}

	move(){
		this.velocity.x = this.force*Math.cos(this.angle);
		this.velocity.y = this.force*Math.sin(this.angle);
		
		//magic
		var d = this.size/2;
		for(var i=this.length-1; i>=1; i--){				
			this.arr[i].x = this.arr[i-1].x - d*Math.cos(this.angle);
			this.arr[i].y = this.arr[i-1].y - d*Math.sin(this.angle);			
			this.drawBody(this.arr[i].x, this.arr[i].y, i);	
		}

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		if(this.headType == 0) this.drawHeadOneEye();
		else if(this.headType == 1) this.drawHeadTwoEye();
		else if(this.headType == 2) this.drawHeadTwoEyeBranch();
				
		this.checkCollissionFood();
		this.checkCollissionSnake();
		this.checkBoundary();
	}

	checkBoundary(){

		// //left
		// if(this.arr[0].x < game.world.x){
		// 	this.pos.x = game.world.x + this.size*2;
		// 	this.velocity.x *= -1;
		// 	this.angle = Math.PI - this.angle;
		// } 

		// //right
		// else if(this.arr[0].x > game.world.x + game.WORLD_SIZE.x){
		// 	this.pos.x = game.world.x + game.WORLD_SIZE.x - this.size*2;
		// 	this.velocity.x *= -1;
		// 	this.angle = Math.PI- this.angle;			
		// }

		// //up
		// else if(this.arr[0].y < game.world.y){
		// 	this.pos.y = game.world.y + this.size*2;
		// 	this.velocity.y *= -1;
		// 	this.angle = Math.PI - this.angle;
		// } 

		// //down
		// else if(this.arr[0].y > game.world.y + game.WORLD_SIZE.y){
		// 	this.pos.y = game.world.y + game.WORLD_SIZE.y - this.size*2;
		// 	this.velocity.y *= -1;
		// 	this.angle = Math.PI - this.angle;
		// }


	}

	//check snake and food collission
	checkCollissionFood(){	
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		for (var i = 0; i < game.foods.length; i++) {
			if(ut.cirCollission(x, y, this.size+3, game.foods[i].pos.x,
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
				for (var j = 0; j < game.snakes[i].arr.length; j+=2) {
					if(ut.cirCollission(x, y, this.size, s.arr[j].x, s.arr[j].y, s.size)){
						this.die();
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
		if(this.length % 30 == 0) this.size++;	
		if(this.size > this.MAXSIZE) this.size = this.MAXSIZE;	
	}

	changeAngle(angle){
		this.angle = angle;
	}

	die(){
		this.state = 1;
		for (var i = 0; i < this.arr.length; i+=3) game.foods.push(new Food(game.ctxFood,
		this.arr[i].x, this.arr[i].y));
		
		var index = game.snakes.indexOf(this);		
		game.snakes.splice(i, 1);
	}

	
	

}