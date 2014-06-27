/* specs = {
   layerID,
   conditions,
   targetState
}
*/

if (window.mlca === undefined) var mlca = {};

mlca.Rule = function(specs){
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
	var i = 0, ret = true;
	for (i = 0; i<conditions.length; i++){
	    if (!condition[i].check(coords)){
		ret = false;
	    }
	}
	if (ret) this.layerRef.write(coords,targetState);
	else return false;
    },
};
