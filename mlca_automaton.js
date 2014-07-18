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

mlca.automaton = {};

mlca.automaton.begin = function(){
    'use strict';
    console.log("automaton.begin()");
    mlca.rulesetList = [];
    mlca.fieldSize = {x:100,y:100};
    mlca.layerList = [];
    mlca.layerList.getLayerByID = function(layerID){
	for (var i = 0; i < this.length; i++){
	    if (this[i].id === layerID){
		console.log("Found reference to " + layerID);
		return this[i];
	    }
	}
    };

    mlca.kernels = {};
    mlca.rulesets = {};
    mlca.layers = {};
    mlca.conditions = {};

    mlca.kernels.self = new mlca.Kernel({
	relPosList:[0,0]
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


    mlca.layers.gol = new mlca.Layer(
	{
	    dimensions: mlca.fieldSize,
	    type: 'boolean',
	    topology: 'noloop',
	    layerID: 'main',
	    DataStructure:mlca.WorstMatrix,
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
    );
    mlca.layerList.push(mlca.layers.gol);
 
    var GOLRuleList = [
	new mlca.Rule({
	    layerID:'main',
	    targetState:false,
	    conditions:[
		new mlca.Condition({
		    targetLayerID:'main',
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
		    targetLayerID:'main',
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
		    targetLayerID:'main',
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
    mlca.rulesetList.push(new mlca.Ruleset({ruleList:mlca.rulesets.gol}));
}
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
