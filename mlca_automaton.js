/* Automaton

    Interador monolítico: acesso às regras e à Layer Data Structure
	
    Look at list of rulesets.
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
	var i;
    mlca.rulesetList = [];
    mlca.fieldSize = {x:50,y:50};
    this.play = false;

    mlca.layerList = [];
    mlca.layerList.getLayerByID = function(layerID){
	for ( i = 0; i < this.length; i += 1){
	    if (this[i].id === layerID){
		console.log("Found reference to " + layerID);
		return this[i];
	    }
	}
    };
    
    //Libraries (possibly to be moved)
    mlca.kernels = {
	self : new mlca.Kernel({
	    relPosList:[{x:0,y:0}]
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
		{x:-1,y:0}
	    ]
	})
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
			number: 4,
			compOperation: '>='
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
			number: 1,
			compOperation: '=='
		    })]
	    }),
	    new mlca.Rule({
		layerID:'main',
		targetState:true,
		conditions: [
		    new mlca.Condition({
			targetLayerID:'main',
			kernel:mlca.kernels.self,
			stateToCount:false,
			number: 1,
			compOperation: '=='
		    }),
		    new mlca.Condition({
			targetLayerID:'main',
			kernel:mlca.kernels.ring8,
			stateToCount:true,
			number: 3,
			compOperation: '=='
		    })]
	    })
	]
    };
    
    mlca.layers = {
	gol : new mlca.Layer(
	    {
		name:'gol',
		dimensions: mlca.fieldSize,
		type: 'boolean',
		topology: 'xyloop',
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
			}
			return ret;
		    }// end stateRepresentation
		}// end interfaceData
	    }// end specs
	)	
    };
    mlca.conditions = {};
        
    // Prototype
	
	//linha com apenas "mlca.layer" removida, averiguar a intenção inicial 
	
    mlca.layerList.push(mlca.layers.gol);
    mlca.rulesetList.push(new mlca.Ruleset({
	ruleList:mlca.rulesets.gol,
	layerID:'main'
    }));
    var displayInfo = {
	cellSize: 10,
	dimensions: mlca.fieldSize
    };
    //R-Pentamino :D
    mlca.layerList[0].readFromString('101\n011\n01',
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
};

mlca.automaton.draw = function(){
    'use strict';
	var i;
	
	this.display.drawBackground();
	for (i = 0; i<mlca.layerList.length; i += 1){
		this.display.drawLayer(mlca.layerList[i]);
    }
    this.display.drawGrid();
};
//DEBUG
mlca.automaton.run = function() {
	'use strict';
	
	mlca.automaton.iterate();
	mlca.automaton.iterate();
	mlca.automaton.iterate();
	mlca.automaton.iterate();
	mlca.automaton.iterate();	
};

mlca.automaton.iterate = function() {
    'use strict';
    var i;
    var it = {x:0,y:0};

    // Execute Rulesets
    for (i = 0; i<mlca.rulesetList.length; i+= 1){
	console.log('Running Ruleset ' + i);
	for (it.x = 0; it.x<mlca.fieldSize.x; it.x += 1){
	    for (it.y = 0; it.y<mlca.fieldSize.y; it.y += 1){
		mlca.rulesetList[i].run(it);
	    }
	}
    }

    //Swap Matrixes
    for (i = 0; i<mlca.layerList.length; i += 1){
	mlca.layerList[i].swap();
    }

    //Draw Layers
    this.draw();
    if (this.play) {
		window.setTimeout(this.iterate(),500);
	}
};
