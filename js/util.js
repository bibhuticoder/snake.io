class Util{
	constructor(){	
	}

	getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    var marginTop = canvas.style.marginTop;
	    var border = canvas.style.borderWidth;

	    var x = evt.clientX - rect.left;
	    var y = evt.clientY - rect.top - marginTop
    

	    return new Point(x, y);	    
	}

	random(min, max){        
	    return Math.floor(Math.random() * (max - min + 1)) + min;	
	}

	randomF(min, max){        
	    return (Math.random() * (max - min)+ min).toFixed(4);
	}

	randomColor(){
		var colors = ['salmon', 'purple', 'green', 'maroon', 'skyblue', 'deepskyblue', 'orange', 'gold', "blue"];
		return colors[this.random(0, colors.length-1)]
	}

	randomName(){
		var names = ['ram', 'shyam', 'hari', 'geeta', 'joe', 'johm', 'harry', 'peter'];
		return names[this.random(0, names.length-1)]
	}

	toInt(number){ 
	  return Math.round(  // round to nearest integer
	    Number(number)    // type cast your input
	  ); 
	}


	getDistance(i, f){
		return Math.abs(Math.sqrt(Math.pow((f.x-i.x), 2) + Math.pow((f.y-i.y), 2)));
	}

	getAngle(p1, p2){		
		var d1 = this.getDistance(p1, new Point(0, canvas.height));
		var d2 = this.getDistance(p2, new Point(0, canvas.height));	
        return ((Math.atan2(p2.y - p1.y, p2.x - p1.x)));
    }

    cirCollission(x1, y1, r1, x2, y2, r2){
    	return (this.getDistance(new Point(x1, y1), new Point(x2, y2)) < (r1+r2));
    }

    drawHexagon(ctx, size, x, y){

    	size -= 1;
		ctx.beginPath();
		ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

		for (var i=0; i < 7; i++) {
			var p = x + size * Math.cos(i * 2 * Math.PI / 6);
			var q = y + size * Math.sin(i * 2 * Math.PI / 6);
			var point = new Point(p, q);
			point = this.rotate(point, new Point(x, y), -30);
		  	ctx.lineTo(point.x, point.y);
		}
		ctx.fillStyle = "gray";
		ctx.fill();


		// ctx.beginPath();
		// ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
		// for (var i=0; i < 7; i++) {
		// 	var p = x + size * Math.cos(i * 2 * Math.PI / 6);
		// 	var q = y + size * Math.sin(i * 2 * Math.PI / 6);
		// 	var point = new Point(p, q);
		// 	// point = this.rotate(point, new Point(x, y), -30);
		//   	ctx.lineTo(point.x, point.y);
		// }

		// ctx.lineWidth = 3;
		// ctx.strokeStyle = "black";
		// ctx.stroke();

		// ctx.lineWidth = 1;
    }

    rotate(p, c, angle){
    	var si = Math.sin(angle);
		var co = Math.cos(angle);

	    // translate point back to origin:
	    p.x -= c.x;
	    p.y -= c.y;

	    // rotate point
	    var xnew = p.x * co - p.y * si;
	    var ynew = p.x * si + p.y * co;

	    // translate point back:
	    p.x = xnew + c.x;
	    p.y = ynew + c.y;
	    return p;
    }

}