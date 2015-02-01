/*
   Condition
   
   specs = {
   layerID,
   kernel,
   number,
   compOperation
   }   
   
   -count: receives a absolute coordinate and count the number of cells in the 
   desired state in its kernel neighborhood
   
   +check: receives a absolute coordinate and check if the counting
   condition is met
*/

if (window.mlca === undefined) {
	var mlca = {};
}

mlca.Condition = function(specs){
    'use strict';
	
	/*
		targetLayerID: identification of the Layer it fetch cells
		kernel: the set of coordinates for this condition neighborhood
		number: constant to be compared with the number of counted neighbors
		state: state to be counted
		compOperation: string with the comparative operator
		layerRef: pointer to the layer it fetch cells
	*/
	
	this.targetLayerID = specs.targetLayerID;
    this.kernel = specs.kernel;
    this.number = specs.number;
    this.state = specs.stateToCount;
    this.compOperation = specs.compOperation;
    console.log("Condition fetching reference to " + this.targetLayerID);
    this.layerRef = mlca.layerList.getLayerByID(this.targetLayerID);
};

mlca.Condition.prototype = {
	
	/*
	  count: receives a absolute coordinate and count the number of cells in the 
	  desired state in its kernel neighborhood
	*/
	count: function(coords){
	'use strict';
	
	var i,c=0;
	if (this.layerRef === undefined) {
	    this.layerRef = mlca.layerList.getLayerByID(this.targetLayerID);
	}
	for (i = 0; i<this.kernel.relPosList.length; i += 1){
	    if (this.layerRef.read(this.kernel.getAbsCoords(coords,i))===this.state){
			c += 1;
		}
	}
	return c;
    },
	
	/*
	  check: receives a absolute coordinate and check if the counting
	  condition is met
    */
	check: function(coords){
	'use strict';
	
	var c = this.count(coords);
	var number = this.number;
		switch (this.compOperation){
			case "<":
				return c < number;
			case ">":
				return c > number;
			case "<=":
				return c <= number;
			case ">=":
				return c >= number;
			case "==":
			default:
				return c === number;
		}
    }
};
