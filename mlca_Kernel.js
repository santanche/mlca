
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
