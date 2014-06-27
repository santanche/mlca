
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



mlca.automaton.begin = function(){
    'use strict';

    mlca.rulesetList = [];
    mlca.fieldSize = {x:100,y:100};
    mlca.layerList = [];

    mlca.kernels.self = new mlca.Kernel({
	relPosList:[0,0];
    });
    mlca.kernels.ring8 = new mlca.Kernel({
	relPosList:[
	    {x:-1,y:-1},
	    {x:0,y:-1},
	    {x:1,y:-1},
	    {x:1,y:0},
	    {x:1,y:1},
	    {x:0,y:1},
	    {x:-1,y:1},
	    {x:-1,y:0},
	]
    });

    var GOLLayer = new mlca.Layer(
	{
	    dimensions: mlca.fieldSize,
	    type: 'boolean',
	    topology: 'noloop',
	    layerID: 'main',
	    interfaceData:{
		stateRepresentation: function (state){
		    var ret;
		    switch (state){
		    case true:
			ret = '#000000';
			break;
		    default:
			ret = '#FFFFFF';
		    };
		    return ret;
		}// end stateRepresentation
	    }// end interfaceData
	}// end specs
    ).initDataStructure(mlca.WorstMatrix);
    mlca.layers.gol = GOLLayer;
    mlca.layerList.push(mlca.layers.gol);

    var GOLRuleList = [
	new mlca.Rule({
	    layerID:'main',
	    targetState:false,
	    conditions:[
		new mlca.Condition({
		    targetLayerId:'main',
		    kernel:mlca.kernels.ring8,
		    stateToCount:true,
		    number: 5,
		    compOperation: '>=',
		})]
	}),
	new mlca.Rule({
	    layerID:'main',
	    targetState:false,
	    conditions: [
		new mlca.Condition({
		    targetLayerId:'main',
		    kernel:mlca.kernels.ring8,
		    stateToCount:true,
		    number: 2,
		    compOperation: '<=',
		})]
	}),
	new mlca.Rule({
	    layerID:'main',
	    targetState:true,
	    conditions: [
		new mlca.Condition({
		    targetLayerId:'main',
		    kernel:mlca.kernels.self,
		    stateToCount:true,
		    number: 1,
		    compOperation: '==',
		})]
	}),
	new mlca.Rule({
	    layerID:'main',
	    targetState:false,
	    conditions: []
	}),
    ];
    mlca.rulesets.gol = GOLRuleList;
    mlca.rulesetList.push(new mlca.Ruleset({ruleList:mlca.rulesets.gol});

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
