/*
   Condition
   
	-targetLayerID: identification of the Layer it fetch cells
	-kernel: the set of coordinates for this condition neighborhood
	-number: constant to be compared with the number of counted neighbors
	-state: state to be counted
	-compOperation: string with the comparative operator
	-layerRef: pointer to the layer it fetch cells
	
   specs = {
   layerID,
   kernel,
   number,
   compOperation
   }   
   
   -count(coordinate): receives a absolute coordinate and return the number of cells in the 
   desired state in its kernel neighborhood
   
   +check(coordinate): receives a absolute coordinate and return a boolean according 
	to the counting condition being met or not
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
    if(specs.attributeToCount !== undefined){
        this.attribute = specs.attributeToCount;
        this.attributeIndex = specs.attributeIndex;
    }
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
        var cell = this.layerRef.read(this.kernel.getAbsCoords(coords,i)); 
        if (cell.state === this.state){
			if(this.attribute !== undefined){
                if(cell.attributes[this.attributeIndex] === this.attribute){
                    c += 1;    
                }
            }
            else{
                c += 1;   
            }
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
