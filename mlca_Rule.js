mlca.Rule = function(){};

mlca.Rule.prototype = {
    layerID: '',
    layerRef,
    condition,
    targetState,
    apply : function (coords){
	if (condition.check(coords)){
	    this.layerRef.cell(coords,targetState);
	    return true;
	}
	else return false;
    },
};