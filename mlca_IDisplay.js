/*
	IDisplay:
	
	-canvas: holds Html5 canvas used for drawing on the page
	-ctx: holds reference to Html5 canvas 2d context, used for drawing on the canvas
	-cellSize: the size in pixels of the Cells
	-dimensions: the number of cells in the x and y coordinates
	-selectedCell: coordinate of the cell clicked by the user
	-selectedLayer: layer selected by the user
	
	specs{
		canvas,
		ctx,
		cellSize,
		dimensions
	}
    
    -onClick(e): event handled by the HTML onClick, alternate the state of the cell clicked by the user.
	
    +returnLayer(): returns the selected layer
    
    +drawBackground(color): draws the background of the canvas according to the color given (only visible if the cells are not opaque)
    
*/

mlca.IDisplay = function(specs){
    'use strict';
	this.canvas = specs.canvas;
    this.ctx = specs.ctx;
	this.dimensions = specs.dimensions;
	this.cellSize = specs.cellSize;
	
    this.returnLayer = function(){
        var i;
        for(i = 0; i<mlca.layerList.length; i++){
               if(!mlca.layerList[i].isVisible){
                    return mlca.layerList[i-1];   
               }
        }
        var last = mlca.layerList.length-1;
        return mlca.layerList[last];
    }
    
	var selectedCell = {x:0,y:0};
	var selectedLayer;
	var that = this;
    
	var changeCell = function(e){
		
        selectedLayer = that.returnLayer();
        
        //Case the layer is locked
        if(selectedLayer.lock){
            return;   
        }
        
        mlca.automaton.play = false;
		selectedCell.x = Math.floor((e.pageX - canvas.offsetLeft -2)/specs.cellSize); 
		selectedCell.y = Math.floor((e.pageY - canvas.offsetTop -2)/specs.cellSize); 
		//Placeholder
		
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
         var i;
         for(i = 0; i<mlca.layerList.length; i++){
            if(!mlca.layerList[i].isVisible){
                /*var newLayer = mlca.layerList[(i+1) % mlca.layerList.length];
                
                mlca.layerList[i].isVisible = false;
                newLayer.isVisible = true;
                */
                
                mlca.layerList[i].isVisible = true;
                
                var newLayer = mlca.layerList[i];
                document.getElementById("selectedlayer").innerHTML = newLayer.id;
                if(mlca.automaton.display.returnLayer().lock){
                    document.getElementById("lockstatus").innerHTML = " (LOCKED)";
                }
                else{
                    document.getElementById("lockstatus").innerHTML = "";   
                }
                
                
                this.drawBackground();
                this.drawLayer(newLayer);
                this.drawGrid();
                break;
            }
            if(i === mlca.layerList.length - 1 && mlca.layerList[i].isVisible === true){
                for(i = 0; i<mlca.layerList.length;i++){
                    mlca.layerList[i].isVisible = false;   
                }
                mlca.layerList[0].isVisible = true;
                
                var newLayer = mlca.layerList[0];
                document.getElementById("selectedlayer").innerHTML = newLayer.id;
                if(mlca.automaton.display.returnLayer().lock){
                    document.getElementById("lockstatus").innerHTML = " (LOCKED)";
                }
                else{
                    document.getElementById("lockstatus").innerHTML = "";   
                }
                
                this.drawBackground();
                this.drawLayer(newLayer);
                this.drawGrid();
                break;
            }
        }
	}
};
