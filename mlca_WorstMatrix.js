mlca.WorstMatrix = function (specs) {
	'use strict';
	
	this.dimensions = specs.dimensions;
	this.type = specs.type;
	this.topology = specs.topology;
	
	this.matrix = [];
	this.matrix.length = this.dimensions.x * this.dimensions.y;
	
	var i = 0;	// initialize the matrix
	switch (this.type) {
		case 'integer':	
			for (i = 0; i < this.matrix.length; i += 1) {
				this.matrix[i] = 0;
			}
		break;
	}
};

mlca.WorstMatrix.prototype = new mlca.LayerDataStructure();

mlca.WorstMatrix.prototype.getCell = function (coord) {
	'use strict';
	
	return this.matrix[(coord.y * this.dimensions.x) + coord.x];
};

mlca.WorstMatrix.prototype.setCell = function (coord, newValue) {
	'use strict';
	
	this.matrix[(coord.y * this.dimensions.x) + coord.x] = newValue;
	
	return;
};