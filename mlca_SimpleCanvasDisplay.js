/*
	IDisplay SimpleCanvasDisplay: initial implementation of the canvas display
	
	-canvas: holds Html5 canvas used for drawing on the page
	-ctx: holds reference to Html5 canvas 2d context, used for drawing on the canvas
	-cellSize: the size in pixels of the Cells
	-dimensions: the number of cells in the x and y coordinates
	-selectedCell: coordinate of the cell clicked by the user
	-selectedLayer: layer selected by the user
	
	specs{
		cellSize
		dimension
	}
	
	-onClick(e): event handled by the HTML onClick, alternate the state of the cell clicked by the user.
	
	+drawGrid(): draws a simple grid according to the canvas dimensions and the specified cell size.
	
	-drawLayer(layer): if the layer.isVisible parameter is set to true, draws the cells 
	according to the interfaceData parameters of the layer
	
	-drawBackground(color): color the canvas background with a given color, if none is given, the color is
	set to white.
	
*/

mlca.SimpleCanvasDisplay = function(specs){
    'use strict';
	
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
	this.cellSize = specs.cellSize;
	this.dimensions = specs.dimensions;
    this.canvas.width = this.cellSize * this.dimensions.x + 1;
    this.canvas.height = this.cellSize * this.dimensions.y + 1;
	
    var specs = {canvas:this.canvas, ctx:this.ctx, dimensions:this.dimensions, cellSize:this.cellSize};
	
	mlca.IDisplay.call(this, specs);
	
    
};

mlca.SimpleCanvasDisplay.prototype = Object.create(mlca.IDisplay.prototype);
mlca.SimpleCanvasDisplay.constructor = mlca.SimpleCanvasDisplay;

//mlca.SimpleCanvasDisplay({canvas:this.canvas, ctx:this.ctx, dimensions:this.dimensions, cellSize:this.cellSize});

mlca.SimpleCanvasDisplay.prototype.drawGrid = function(){
    'use strict';
	
	var i;
    this.ctx.strokeStyle = 'grey';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for (i = 1; i <= this.canvas.height; i += this.cellSize){
	this.ctx.moveTo(1,i);
	this.ctx.lineTo(this.canvas.width,i);
    }
    for (i = 1; i <= this.canvas.width; i += this.cellSize){
	this.ctx.moveTo(i,1);
	this.ctx.lineTo(i,this.canvas.height);
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
		this.ctx.fillRect(this.cellSize*it.x+1,
			     this.cellSize*it.y+1,
			     this.cellSize*(it.x+1),
			     this.cellSize*(it.y+1));
	    }
	}
    }
};


