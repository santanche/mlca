mlca.Ruleset = function(){};

mlca.Ruleset.prototype = {
    layerID: "",
    layerRef,
    ruleList: []
    var i, ret = false;
    run: function(coords){
	for(i = 0; i< this.ruleList.length; i++){
	    if (this.ruleList[i].apply(coords)){
		ret = true; 
		break;
	    }
	}
    }
};