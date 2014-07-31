// Global Variables
var canvas;
var ctx;
var pressed = {};
var zoomOffput;

// FPS update function
window.requestAnimationFrame = function() {
	'use strict';
	
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame || 
		function(f) {
			window.setTimeout(f,1e3/60);
		};
}();

// Pressed thingy
window.onkeydown=function(e){
     e = e || window.event;
     pressed[e.keyCode] = true;
}
window.onkeyup=function(e){
     e = e || window.event;
     delete pressed[e.keyCode];
}

// Matrix Test
var matrixtest = {
	sizeX: 5,
	sizeY: 5,
	matrix: [1,0,0,1,0,
			0,1,0,1,0,
			0,1,1,0,1,
			1,0,1,1,0,
			0,0,1,0,0],
}

// Init function
var init = function(){
	// Get Canvas
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	graphic.startGraphicEngine(matrixtest);
	
	zoomOffput = 0;
	
	// Call update main loop
	mainLoop();
}

// Main loop
var mainLoop = function(){
	(function main() {
		window.requestAnimationFrame(main);
		
		if(pressed[37])
			graphic.panScreen("left");
		if(pressed[38])
			graphic.panScreen("up");
		if(pressed[39])
			graphic.panScreen("right");
		if(pressed[40])
			graphic.panScreen("down");
			
		if(pressed[107] && zoomOffput === 0){
			zoomOffput = 1;
			graphic.setZoomUp();
		}
		else if(pressed[109] && zoomOffput === 0){
			zoomOffput = 1;
			graphic.setZoomDown();
		}
		else if (!pressed[109] && !pressed[107]){
			zoomOffput = 0;
		}
		
	}())
}

var graphic = {
	//Offset of moving screen
	offsetX:		0,	
	offsetY:		0,
	//Zoom level and cell width/height
	zoomLevel:		0,
	cellWidth:		0,
	cellHeight:		0,
	//x,y of center of the screen
	screenCenterX:	0,
	screenCenterY:	0,
	//x,y size of matrix
	matrixSizeX:	0,
	matrixSizeY:	0,
	
	startGraphicEngine:	function(matrix){
		this.matrixSizeX = matrix.sizeX;
		this.matrixSizeY = matrix.sizeY;
		this.matrix		 = matrix.matrix;
		
		this.zoomLevel = 2;
		this.cellWidth = 32;
		this.cellHeight = 32;
		
		this.screenCenterX = 0;
		this.screenCenterY = 0;
		this.panScreen(0);
	},
	setZoomUp:			function(){
		if(this.zoomLevel < 5){
			this.zoomLevel += 1;
			this.cellWidth = this.zoomLevel*16;
			this.cellHeight = this.zoomLevel*16;
			this.panScreen(0);
		}
	},
	setZoomDown:		function(){
		if(this.zoomLevel > 1) {
			this.zoomLevel -= 1;
			this.cellWidth = this.zoomLevel*16;
			this.cellHeight = this.zoomLevel*16;
			this.panScreen(0);
		}
	},
	drawFrame:			function(){
		for(var i = 0; i < (canvas.width/this.cellWidth)+1 ; i++){
			var aux = -this.offsetX + i*this.cellWidth;
			if(this.screenCenterX + aux >= 0 && this.screenCenterX + aux < (this.matrixSizeX+1)*this.cellWidth){
				ctx.beginPath();
				var y0 = 0;
				var y1 = canvas.height;
				if(this.screenCenterY < 0)
					y0 = 0-this.screenCenterY;
				if(this.screenCenterY + canvas.height >= this.matrixSizeY*this.cellHeight)
					y1 = (this.matrixSizeY)*this.cellHeight - this.screenCenterY + 0;
				ctx.moveTo(aux,y0);
				ctx.lineTo(aux,y1);
				ctx.stroke();
			}
		}
		
		for(var i = 0; i < (canvas.height/this.cellHeight)+1; i++){
			var aux = -this.offsetY + i*this.cellHeight;
			if(this.screenCenterY + aux >= 0 && this.screenCenterY + aux < (this.matrixSizeY+1)*this.cellHeight){
				ctx.beginPath();
				var x0 = 0;
				var x1 = canvas.width;
				if(this.screenCenterX < 0)
					x0 = -this.screenCenterX + 0 ;
				if(this.screenCenterX + canvas.width >= this.matrixSizeX*this.cellWidth)
					x1 = (this.matrixSizeX)*this.cellWidth - this.screenCenterX + 0;
				ctx.moveTo(x0,aux);
				ctx.lineTo(x1,aux);
				ctx.stroke();
			}
		}
	},
	draw:				function(){
		var xo = Math.floor(this.screenCenterX/this.cellWidth);
		var yo = Math.floor(this.screenCenterY/this.cellHeight);
		for(var i = 0; i < (canvas.width/this.cellWidth)+1 ; i++){
			for(var j = 0; j < (canvas.height/this.cellHeight)+1 ; j++){
				var x = xo + i;
				var y = yo + j;
				if(x >= 0 && x <= this.matrixSizeX-1 && y >= 0 && y <= this.matrixSizeY-1 && this.matrix[(y*this.matrixSizeX) + x] === 1){
					ctx.fillRect(x*this.cellWidth - this.screenCenterX, y*this.cellHeight - this.screenCenterY, this.cellWidth, this.cellHeight);
				}
			}
		}
	},
	panScreen:			function(e){
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
	},
}