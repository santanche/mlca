/*
	Currently unused!
*/

if (mlca === undefined) {
	var mlca = {};
}

mlca.protointerface = function() {
    'use strict';
	
	// Offset of moving screen
    this.offsetX = 0;
    this.offsetY = 0;
    // Zoom level, cell width and height
    this.zoomLevel = 2;
    this.cellWidth = 32;
    this.cellHeight = 32;
    // X,Y of center of the screen
    this.screenCenterX = 0;
    this.screenCenterY = 0;
    // Matrix size
    this.matrixSizeX = 0;
    this.matrixSizeY = 0;
};

mlca.protointerface.prototype = {
    refresh:		function(){
	'use strict';
	
	this.matrixSizeX = mlca.layerList[0].dimensions.x;
	this.matrixSizeY = mlca.layerList[0].dimensions.y;
	this.panScreen(0);
    },
    
    setZoomUp:		function(){
	'use strict';
	
	if(this.zoomLevel < 5){
	    this.zoomLevel += 1;
	    this.cellWidth = this.zoomLevel*16;
	    this.cellHeight = this.zoomLevel*16;
	    this.panScreen(0);
	}
    },
    
    drawFrame:		function(){
	'use strict';
	
	var i, aux;
	
	for(i = 0; i < (canvas.width/this.cellWidth)+1 ; i+=1){
	    aux = -this.offsetX + i*this.cellWidth;
	    if(this.screenCenterX + aux >= 0 && this.screenCenterX + aux < (this.matrixSizeX+1)*this.cellWidth){
		ctx.beginPath();
		var y0 = 0;
		var y1 = canvas.height;
		if(this.screenCenterY < 0){
		    y0 = -this.screenCenterY;
		}
		if(this.screenCenterY + canvas.height >= this.matrixSizeY*this.cellHeight){
		    y1 = (this.matrixSizeY)*this.cellHeight - this.screenCenterY;
		}	
		ctx.moveTo(aux,y0);
		ctx.lineTo(aux,y1);
		ctx.stroke();
	    }
	}
	for(i = 0; i < (canvas.height/this.cellHeight)+1; i+=1){
	    aux = -this.offsetY + i*this.cellHeight;
	    if(this.screenCenterY + aux >= 0 && this.screenCenterY + aux < (this.matrixSizeY+1)*this.cellHeight){
		ctx.beginPath();
		var x0 = 0;
		var x1 = canvas.width;
		if(this.screenCenterX < 0){
		    x0 = -this.screenCenterX;
		}
		if(this.screenCenterX + canvas.width >= this.matrixSizeX*this.cellWidth){
		    x1 = (this.matrixSizeX)*this.cellWidth - this.screenCenterX;
		}
		ctx.moveTo(x0,aux);
		ctx.lineTo(x1,aux);
		ctx.stroke();
	    }
	}
    },
    
    draw:			function(){
	'use strict';
	
	var i,j;
	var xo = Math.floor(this.screenCenterX/this.cellWidth);
	var yo = Math.floor(this.screenCenterY/this.cellHeight);
	for(i = 0; i < (canvas.width/this.cellWidth)+1 ; i+=1){
	    for(j = 0; j < (canvas.height/this.cellHeight)+1 ; j+=1){
		var x = xo + i;
		var y = yo + j;
		// Fazer buffer
		if(x >= 0 && x <= this.matrixSizeX-1 && y >= 0 && y <= this.matrixSizeY-1){
		    ctx.fillStyle = this.setColor(x,y);
		    ctx.fillRect(x*this.cellWidth - this.screenCenterX, y*this.cellHeight - this.screenCenterY, this.cellWidth, this.cellHeight);
		}
	    }
	}
    },
    
    setColor:		function(x,y){
	'use strict';
	
	var i;
	var cellColor = 0;
	for(i = 0; i < mlca.layerList.length; i+=1){
	    if(mlca.layerList[i].visible === true){
		cellColor = mlca.layerList[i].interfaceData.stateRepresentation(mlca.Layer.read({x:x,y:y}));
	    }
	}
	return cellColor;
    },
    
    panScreen:		function(e){
	'use strict';
	
	if (e === "up"){
	    //if(this.screenCenterY > 0)
	    this.screenCenterY -= 4;
	} else if (e === "right"){
	    //if(this.screenCenterX < this.matrixSizeX*this.cellWidth - 0)
	    this.screenCenterX += 4;
	} else if (e === "down"){
	    //if(this.screenCenterY < this.matrixSizeY*this.cellHeight - 0)
	    this.screenCenterY += 4;
	} else if (e === "left"){
	    //if(this.screenCenterY > 0)
	    this.screenCenterX -= 4;
	}
	
	// Update cell offset
	this.offsetX = this.screenCenterX%this.cellWidth;
	this.offsetY = this.screenCenterY%this.cellHeight;
	
	// Draw
	ctx.clearRect(0,0,canvas.width,canvas.height);
	this.drawFrame();
	this.draw();
    }
};
