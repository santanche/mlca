/*
LayerDataStructure:
(atributes)	
	-topology	[Layer's edge rule]
	+specs		[Dimension]
(methods)
	-constructor(specs) 
	+cell(coordinate, value) [Return a cell value or set a cell value if value is given]
*/

mlca.LayerDataStructure = function (specs) {
	'use strict'; 
	
	this.dimensions = specs.dimensions; 
	this.topology = specs.topology;
	this.cell = function () {	
		
	};
};

mlca.LayerDataStructure.prototype = {
		dimensions: {x:100, y:100},
		topology: 'rectangle',
		cell: function() {
			var ret = -1;
			
			if (arguments.length === 1) {
				ret = this.getCell(arguments[0]);
			}
			else if(arguments.length === 2) {
				ret = this.setCell(arguments[0], arguments[1]);
			}
			
			return ret;
		}
	};
/*
	Expected topologies: rectangle, cilinderX, cilinderY, toroid
*/

	
mlca.WorstMatrix = function(){};
mlca.WorstMatrix.prototype = new mlca.LayerDataStructure();



new mlca.WorstMatrix();