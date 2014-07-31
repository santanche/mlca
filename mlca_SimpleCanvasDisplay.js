mlca.SimpleCanvasDisplay = function(specs){
    'use strict';
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.specs = specs;
    this.canvas.width = specs.cellSize * specs.dimensions.x + 1;
    this.canvas.height = specs.cellSize * specs.dimensions.y + 1;    
};

mlca.SimpleCanvasDisplay.prototype = new mlca.IDisplay();
mlca.SimpleCanvasDisplay.prototype.drawGrid = function(){
    'use strict';
	
	var i;
	/*specs:cellSize, dimensions*/
    this.ctx.strokeStyle = 'grey';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for (i = 1; i <= this.canvas.height; i += this.specs.cellSize){
	this.ctx.moveTo(1,i);
	this.ctx.lineTo(this.canvas.height,i);
    }
    for (i = 1; i <= this.canvas.width; i += this.specs.cellSize){
	this.ctx.moveTo(i,1);
	this.ctx.lineTo(i,this.canvas.width);
    }
    this.ctx.stroke();
};
mlca.SimpleCanvasDisplay.prototype.drawLayer = function(layer){
    'use strict';
	
	if (layer.isVisible === false) {
		return;
    }
	var it = {x:0,y:0};
    var color;
    for (it.x = 0; it.x < layer.dimensions.x; it.x+=1){
	for (it.y = 0; it.y < layer.dimensions.y; it.y+=1){
	    color = layer.interfaceData.stateRepresentation(layer.read(it));
	    if (color){
		this.ctx.fillStyle = color;
		this.ctx.fillRect(this.specs.cellSize*it.x+1,
			     this.specs.cellSize*it.y+1,
			     this.specs.cellSize*(it.x+1),
			     this.specs.cellSize*(it.y+1));
	    }
	}
    }
};
mlca.SimpleCanvasDisplay.prototype.drawBackground = function(color){
    'use strict';
	
	if (color === undefined){
		color = 'white';
    }
	this.ctx.fillRect(1,1,this.canvas.width,this.canvas.height);    
};
