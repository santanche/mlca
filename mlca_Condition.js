
specs = {
    layerID,
    kernel,
    number,
    compOperation,
}


mlca.Condition = function(specs){
    this.targLayerID = specs.targLayerID;
    this.kernel = specs.kernel;
    this.number = specs.number;
    this.compOperation = specs.compOperation;
    this.layerRef = mlca.layerList.getLayerByID(this.layerID);
};

mlca.Condition.prototype = {
    layerID,
    layerRef,
    kernel,
    number,
    compOperation,
    count: function(coords){
	var i,c=0;
	for (i = 0; i<kernel.relPosList.length; i++){
	    if (this.layerRef.read(kernel.getAbsCoords(coords,i))===this.state)c ++;
	};
	return c;
    },
    check: function(coords){
	var c = this.count(coords);
	switch (compOperation){
	case "<":
	    return c < number;
	    break;
	case ">":
	    return c > number;
	    break;
	case "<=":
	    return c <= number;
	    break;
	case ">=":
	    return c >= number;
	    break;
	case "==":
	default:
	    return c === number;
	    break;
	}
    }
}
