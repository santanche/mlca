/*
	IDisplay:
	
	-canvas: holds Html5 canvas used for drawing on the page
	-ctx: holds reference to Html5 canvas 2d context, used for drawing on the canvas
	-cellSize: the size in pixels of the Cells
	-dimensions: the number of cells in the x and y coordinates
	
	specs{
		canvas,
		ctx,
		cellSize,
		dimensions
	}
    
    +drawBackground(color): draws the background of the canvas according to the color given (only visible if the cells are not opaque)
*/

mlca.IDisplay = function(specs){
    'use strict';
	this.canvas = specs.canvas;
    this.ctx = specs.ctx;
	this.dimensions = specs.dimensions;
	this.cellSize = specs.cellSize;
	
	var selectedCell = {x:0,y:0};
	var selectedLayer;
	
	var changeCell = function(e){
		mlca.automaton.play = false;
		selectedCell.x = Math.floor((e.pageX - canvas.offsetLeft -2)/specs.cellSize); 
		selectedCell.y = Math.floor((e.pageY - canvas.offsetTop -2)/specs.cellSize); 
		//Placeholder
		
		if (selectedLayer === undefined) selectedLayer = mlca.layerList[0];

		selectedLayer.write(
			 selectedCell,
			 selectedLayer.interfaceData.stateAlternate(
			selectedLayer.read(selectedCell)
			 ),
			 true);

		// End placeholder
		mlca.automaton.draw();

		console.log(selectedCell);
	}
	this.canvas.addEventListener('click',changeCell);
};

mlca.IDisplay.prototype = {
    init:function(){
		'use strict';
    },
    drawGrid:function(){
		'use strict';
	 },
	 drawLayer:function(){
		'use strict';
	 },
	 drawBackground:function(color){
    'use strict';
    this.canvas.width = this.cellSize * this.dimensions.x + 1;
    this.canvas.height = this.cellSize * this.dimensions.y + 1;  
	if (color === undefined){
		color = 'white';
    }
    this.ctx.fillStyle = color;
	this.ctx.fillRect(1,1,this.canvas.width,this.canvas.height);    
	},
	 changeLayer:function(){
	 'use strict';
			
	}
};
