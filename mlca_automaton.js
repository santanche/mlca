/* Automaton

Interador monolítico: acesso às regras e à Layer Data Structure

*/

	
/*	Look at list of rulesets.
	For each ruleset, in order:
	    Look at list of atomic rules.
	       Try to apply, in order.
	       If success, break.
	       Else, try next one.
*/


mlca.rulesetList = [];
mlca.fieldSize = {x:100,y:100};

mlca.automaton.iterate = function() {
	'use strict';
    var i;
    var it = {x:0,y:0};
    for (i = 0; i<mlca.rulesetList.length; i++){
		for (it.x = 0; it.x<mlca.fieldSize.x; it.x++){
			for (it.y = 0; it.y<mlca.fieldSize.y; it.y++){
			mlca.rulesetList[i].run(it);
			}
		}
	}
};
