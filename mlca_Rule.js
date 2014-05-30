/* specs = {
   layerID,
   condition,
   targetState
}
*/
mlca.Rule = function(specs){
    this.layerID = specs.layerID;
    this.condition = specs.condition;
    this.targetState = specs.targetState;
    this.layerRef = mlca.layerList.getLayerByID(this.layerID);
    if (this.layerRef === undefined) console.log("Error! LayerID not found!");
    if (specs.type !== this.layerRef.type) console.log("Error! Incorrect type!");
};

mlca.Rule.prototype = {
    layerID: '',
    layerRef,
    condition,
    targetState,
    apply : function (coords){
	if (condition.check(coords)){
	    this.layerRef.write(coords,targetState);
	    return true;
	}
	else return false;
    },
};