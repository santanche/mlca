/*
  Ruleset:
  -ruleList
  +run(coordinate) [Return a boolean telling if a rule succeeded. 
					Try to apply one of the rules in rule List then exit.]
  specs: {ruleList}

*/



mlca.Ruleset = function(specs){
	'use strict';
    this.ruleList = specs.ruleList;
};

mlca.Ruleset.prototype = {
    ruleList: [],
    run: function(coords){
	'use strict';
	var i, ret = false;
	for(i = 0; i< this.ruleList.length; i++){
	    if (this.ruleList[i].apply(coords)){
		ret = true; 
		break;
	    }
	}
	return ret;
    }
};