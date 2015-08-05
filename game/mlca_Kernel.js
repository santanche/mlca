/*
	Kernel
	
	-relPosList: holds a list of relative coordinates
	
	specs = {
	relPosList
   }
	
	+getAbsCoords: returns the absolute coordinate based on the base coordinate 
	given and the relative coordinates inside the i position of the list
*/


mlca.Kernel = function(specs){
    'use strict';
	
	this.relPosList = specs.relPosList;
};

mlca.Kernel.prototype = {

    getAbsCoords: function (coords, i){
	'use strict';
	
	return {
	    x: coords.x + this.relPosList[i].x,
	    y: coords.y + this.relPosList[i].y
	};
   }
};
