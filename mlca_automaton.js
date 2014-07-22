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

    //Initializations
    
    mlca.rulesetList = [];
    mlca.fieldSize = {x:20,y:20};

    mlca.layerList = [];
    mlca.layerList.getLayerByID = function(layerID){
	for (var i = 0; i < this.length; i++){
	    if (this[i].id === layerID){
		console.log("Found reference to " + layerID);
		return this[i];
	    }
	}
    };
    
    //Libraries (possibly to be moved)

    mlca.kernels = {
	self : new mlca.Kernel({
	    relPosList:[0,0]
	}),
	ring8 : new mlca.Kernel({
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
	}),
    };
    
    mlca.rulesets = {
	gol:[
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
	    })
	],
    };
    
    mlca.layers = {
	gol : new mlca.Layer(
	    {
		name:'gol',
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
			    ret = 'white';
			};
			return ret;
		    }// end stateRepresentation
		}// end interfaceData
	    }// end specs
	),	
    };
    mlca.conditions = {};
        
    // Prototype

    mlca.layerList.push(mlca.layers.gol);
    mlca.layer
    mlca.rulesetList.push(new mlca.Ruleset({ruleList:mlca.rulesets.gol}));
    var displayInfo = {
	cellSize: 10,
	dimensions: mlca.fieldSize
    };
    //R-Pentamino :D
    mlca.layerList[0].readFromString('1\n\n\n000011\n00011\n00001',
				     function(n){
					 switch (n){
					 case '1':
					     return true;
					 default:
					     return false;
					 }
				     }
				    );
    console.debug(mlca.layerList);
    this.display = new mlca.SimpleCanvasDisplay(displayInfo);
    this.draw();
}
mlca.automaton.draw = function(){
    this.display.drawBackground();
    for (i = 0; i<mlca.layerList.length; i++){
	this.display.drawLayer(mlca.layerList[i]);
    }
    this.display.drawGrid();
}
mlca.automaton.iterate = function() {
    'use strict';
    var i;
    var it = {x:0,y:0};

    // Execute Rulesets
    for (i = 0; i<mlca.rulesetList.length; i++){
	console.log('Running Ruleset ' + i);
	for (it.x = 0; it.x<mlca.fieldSize.x; it.x++){
	    for (it.y = 0; it.y<mlca.fieldSize.y; it.y++){
		mlca.rulesetList[i].run(it);
	    }
	}
    }

    //Swap Matrixes
    for (i = 0; i<mlca.layerList.length; i++){
	mlca.layerList[i].swap();
    }

    //Draw Layers
    this.draw();
};
