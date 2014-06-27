/*
  LayerDataStructure:
  -topology	[Layer's edge rule] ('noloop','xloop','yloop','xyloop')
  -dimensions
  -type
  -constructor(specs) 
  +cell(coordinate, value) [Return a cell value or set a cell value if value is given]

  specs: {dimensions, topology, type}

*/

mlca.LayerDataStructure = function () {
    'use strict'; 
};

mlca.LayerDataStructure.prototype = {
    dimensions: {x:100, y:100},
    topology: 'noloop',
    isValidCoord: function(coord){
	if (coord.x >= this.dimensions.x ||
	    coord.x < 0)
	    switch (this.topology){
	    case 'xloop':
	    case 'xyloop':
		break;
	    default:
		return false;
	    }
	if (coord.y >= this.dimensions.y ||
	    coord.y < 0)
	    switch (this.topology){
	    case 'yloop':
	    case 'xyloop':
		break;
	    default:
		return false;
	    }
	return true;
    },
    topologyHandler: function(coord){
	var ret = {};
	ret.x = coord.x;
	ret.y = coord.y;
	if (coord.x >= this.dimensions.x || coord.x < 0){
	    switch (this.topology){
	    case 'xloop':
	    case 'xyloop':
		ret.x = ret.x%this.dimensions.x;
		if (ret.x<0) ret.x += this.dimensions.x;
		break;
	    }
	}
	if (coord.y >= this.dimensions.y || coord.y < 0){
	    switch (this.topology){
	    case 'yloop':
	    case 'xyloop':
		ret.y = ret.y%this.dimensions.y;
		if (ret.x<0) ret.y += this.dimensions.y;
		break;
	    }
	}
	return ret;
    },
    cell: function() {
	var ret = -1;
	var coords = this.topologyHandler(arguments[0]);
	if (arguments.length === 1) {
	    ret = this.getCell(coords);
	}
	else if(arguments.length === 2) {
	    ret = this.setCell(coords, arguments[1]);
	}
	return ret;
    },
    getCell: function(coord) {
	// Dummy method.
    },
    setCell: function(coord,newValue) {
	// Dummy method.
    };
};
/*
mlca.WorstMatrix = function(){};
mlca.WorstMatrix.prototype = new mlca.LayerDataStructure();

new mlca.WorstMatrix();
*/
