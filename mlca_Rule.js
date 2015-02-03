/* 
   Rule: state transition instructions
   
   specs = {
   layerID,
   conditions,
	probability,
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
		probability: if the conditions are meet, runs a probability from 0 to 1 for the rule to be applied
		if none is given, probability is set to 1.
	*/
	
	this.layerID = specs.layerID;
   this.conditions = specs.conditions;
	this.targetState = specs.targetState;
   this.layerRef = mlca.layerList.getLayerByID(this.layerID);
	if(specs.probability !== undefined){
		this.probability = specs.probability;	
	}
	else{
		this.probability = 1;	
	}
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
		if(Math.random() < this.probability){
			this.layerRef.write(coords,this.targetState);
			return true;
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}
   }
};
