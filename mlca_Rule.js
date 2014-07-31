/* specs = {
   layerID,
   conditions,
   targetState
}
*/

if (window.mlca === undefined) {
	var mlca = {};
}

mlca.Rule = function(specs){
    'use strict';
	
	this.layerID = specs.layerID;
    this.conditions = specs.conditions;
    this.targetState = specs.targetState;
    this.layerRef = mlca.layerList.getLayerByID(this.layerID);

// This should be in the getLayerByID method
    // if (this.layerRef === undefined) console.log("Error! LayerID not found!");
    // if (specs.type !== this.layerRef.type) console.log("Error! Incorrect type!");


};

mlca.Rule.prototype = {
    apply : function (coords){
	'use strict';
	
	var i = 0, ret = true;
	for (i = 0; i<this.conditions.length; i+=1){
	    if (!(this.conditions[i].check(coords))){
		ret = false;
		break;
	    }
	}
	if (ret){
	    if (this.layerRef === undefined){
			this.layerRef = mlca.layerList.getLayerByID(this.layerID);
		}
	    this.layerRef.write(coords,this.targetState);
	    return true;
	}
	else{
		return false;
	}
    }
};
