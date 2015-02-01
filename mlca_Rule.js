/* 
   Rule: state transition instructions
   
   specs = {
   layerID,
   conditions,
   targetState
   }
   
   +apply: receives a coordinate and check if the conditions of the rule
   are all successful, if so, writes the targetState into the layer
*/

mlca.Rule = function(specs){
    'use strict';
	
	/*
		layerID: holds the identification of the Layer this rule modifies
		conditions: the conditions to be checked
		targetState: the state the current cell becomes if the checks succeed
		layerRef: pointer to layer it modifies
	*/
	
	this.layerID = specs.layerID;
    this.conditions = specs.conditions;
    this.targetState = specs.targetState;
    this.layerRef = mlca.layerList.getLayerByID(this.layerID);

};

mlca.Rule.prototype = {
	
	/*
	  apply: receives a coordinate and check if the conditions of the rule
	  are all successful, if so, writes the targetState into the layer
    */
	
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
