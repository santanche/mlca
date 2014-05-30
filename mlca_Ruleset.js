mlca.Ruleset = function(specs){
    this.ruleList = specs.ruleList;
};

mlca.Ruleset.prototype = {
    ruleList: [],
    run: function(coords){
	var i, ret = false;
	for(i = 0; i< this.ruleList.length; i++){
	    if (this.ruleList[i].apply(coords)){
		ret = true; 
		break;
	    }
	};
	return ret;
    }
};