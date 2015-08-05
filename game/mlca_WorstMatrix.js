/*
	LayedDataStructure WorstMatrix: Simple matrix using the regular array from javascript, may store either integers or booleans.
	
	-type: the type of data it stores (integers or booleans)
	-matrix: javascript array for storing the states
	-topology: Layer's edge rule ('noloop','xloop','yloop','xyloop')
   -dimensions: the size of the LayerDataStructure
	
	specs: {
		dimensions,
		type,
		topology,
	}
	
	+getCell(coords): returns the state of the cell given by the coordinate parameter
	
	+setCell(coords, value): set the state of the cell given by the coordinate parameter to the given value, returns true if successful
	
*/

mlca.WorstMatrix = function (specs) {
    'use strict';
    
    this.dimensions = specs.dimensions;
    this.type = specs.type;
    this.topology = specs.topology;    
    this.matrix = [];
    this.matrix.length = this.dimensions.x * this.dimensions.y;
    
    var i = 0;	// initialize the matrix
    var init;
    switch (this.type) {
		case 'boolean':
			init = {state:false, attributes:[]};
		break;
		case 'integer':
		default:
			init = {state:0, attributes:[]};
    }
    for (i = 0; i < this.matrix.length; i += 1) {
	this.matrix[i] = init;
    }
    return this;
};

mlca.WorstMatrix.prototype = new mlca.LayerDataStructure({dimensions:this.dimensions, topology:this.topology});

mlca.WorstMatrix.prototype.getCell = function (coord) {
    'use strict';
    var c = this.topologyHandler(coord);
    if (this.isValidCoord(c)){
		return this.matrix[(c.y * this.dimensions.x) + c.x];
    }
    else {
		return undefined;
	}
};

mlca.WorstMatrix.prototype.setCell = function (coord, newValue) {
    'use strict';
    var c = this.topologyHandler(coord);
    if (this.isValidCoord(c)){
	this.matrix[(c.y * this.dimensions.x) + c.x] = newValue;
	return true;
    }
    return false;
};
