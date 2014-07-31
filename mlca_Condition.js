/*specs = {
   layerID,
   kernel,
   number,
   compOperation,
}
*/

if (window.mlca === undefined) {
	var mlca = {};
}

mlca.Condition = function(specs){
    'use strict';
	
	this.targetLayerID = specs.targetLayerID;
    this.kernel = specs.kernel;
    this.number = specs.number;
    this.state = specs.stateToCount;
    this.compOperation = specs.compOperation;
    console.log("Condition fetching reference to " + this.targetLayerID);
    this.layerRef = mlca.layerList.getLayerByID(this.targetLayerID);
};

mlca.Condition.prototype = {
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
