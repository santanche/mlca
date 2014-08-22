mlca.SimpleCanvasDisplay = function(specs){
    'use strict';
    this.canvas = document.getElementById("canvas");
    var canvas = this.canvas;
    var selectedCell = {x:0,y:0};
    var selectedLayer;
    this.ctx = this.canvas.getContext('2d');
    this.specs = specs;
    this.canvas.width = specs.cellSize * specs.dimensions.x + 1;
    this.canvas.height = specs.cellSize * specs.dimensions.y + 1;
    this.canvas.mouse = {x:0,y:0};
    var onClick = function(e){
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
    this.canvas.addEventListener('click',onClick);
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
	this.ctx.lineTo(this.canvas.width,i);
    }
    for (i = 1; i <= this.canvas.width; i += this.specs.cellSize){
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
    this.canvas.width = this.specs.cellSize * this.specs.dimensions.x + 1;
    this.canvas.height = this.specs.cellSize * this.specs.dimensions.y + 1;  
	if (color === undefined){
		color = 'white';
    }
	this.ctx.fillRect(1,1,this.canvas.width,this.canvas.height);    
};

