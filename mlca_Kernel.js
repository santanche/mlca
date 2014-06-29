
mlca.Kernel = function(specs){
    this.relPosList = specs.relPosList;
};

mlca.Kernel.prototype = {
    getAbsCoords: function (coords, i){
	return {
	    x: coords.x + this.relPosList[i].x,
	    y: coords.y + this.relPosList[i].y,
	}
    }
};
