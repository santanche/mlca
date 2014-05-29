/* Automaton

Interador monolítico: acesso às regras e à Layer Data Structure

*/

mlca.rulesetList = [];

mlca.automaton.iterate = function() {
    var i = 0;
    for (i = 0; i<mlca.rulesetList.length; i++){
	
/*	Look at list of rulesets.
	For each ruleset, in order:
	    Look at list of atomic rules.
	       Try to apply, in order.
	       If success, break.
	       Else, try next one.
*/
};
