// Global variables
var canvas;
var ctx;
var pressed = {};
var zoomOffput;

if (window.mlca === undefined) var mlca = {};

// FPS update function
window.requestAnimationFrame = function() {
    return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame || 
	function(f) {
	    window.setTimeout(f,1e3/60);
	}
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

// Init function
var init = function(){
    // Get Canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    var newProto = new mlca.protointerface();
    
    zoomOffput = 0;
    
    

    
    
    // Call update main loop
    mlca.automaton.begin();
    mainLoop();
}

// Main loop
var mainLoop = function(){
    (function main() {
	window.requestAnimationFrame(main);
	
	if(pressed[37])
	    newProto.panScreen("left");
	if(pressed[38])
	    newProto.panScreen("up");
	if(pressed[39])
	    newProto.panScreen("right");
	if(pressed[40])
	    newProto.panScreen("down");
	
	if(pressed[107] && zoomOffput === 0){
	    zoomOffput = 1;
	    newProto.setZoomUp();
	}
	else if(pressed[109] && zoomOffput === 0){
	    zoomOffput = 1;
	    newProto.setZoomDown();
	}
	else if (!pressed[109] && !pressed[107]){
	    zoomOffput = 0;
	}
	
    }())

    
}
