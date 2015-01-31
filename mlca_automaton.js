/* Automaton

   Monolithic iterator: access to all modules
*/

mlca.automaton = {};

mlca.automaton.begin = function(){
    'use strict';
    console.log("automaton.begin()");

    /*
	  Initializations:
    
      i: index for 'for'
      mlca.rulesetList: Array with rulesets to be applied
    */

    var i;
    mlca.rulesetList = [];

    /*
	  Temp implementation for the SimpleCanvasDisplay
	
      this.play: Boolean to control auto-iterator
      this.fps: Maximum animation frames per second
      this.cellSize: size for the grid cells
    */

    if (mlca.fieldSize === undefined) mlca.fieldSize = {x:30,y:30};
    this.play = false;
    if(this.fps === undefined) this.fps = 10;
    if(this.cellSize === undefined) this.cellSize = 10;
    if (!this.displayInfo) this.displayInfo = {
		cellSize: this.cellSize,
		dimensions: mlca.fieldSize
    };
    this.display = new mlca.SimpleCanvasDisplay(this.displayInfo);    

	//End of temp implementation
	
    /*
	  mlca.mainloop: Main loop. Calculates elapsed time since last frame
	*/
    
	(function(){
	var curr = (new Date()).getTime();
	var last = 0;
	var elaps = 0;
	mlca.mainloop = function(){
	    last = curr;
	    curr = (new Date()).getTime();
	    elaps += curr - last;
	    if (elaps > 1000/mlca.automaton.fps){
		elaps = (curr - last)%(1000/mlca.automaton.fps);
		if (mlca.automaton.play){
		    mlca.automaton.iterate();
		}
	    }
	    requestAnimationFrame(mlca.mainloop);
	};
    })();

    /*
	  mlca.layerList: array with layers
    */
	
    mlca.layerList = [];
    mlca.layerList.getLayerByID = function(layerID){
	for ( i = 0; i < this.length; i += 1){
	    if (this[i].id === layerID){
		return this[i];
	    }
	}
    };
    
    /*
	  Libraries (possibly to be moved)
    */
	
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
    
    /*
	  Rules: They state the conditions for cell change and the target state.
	  TODO: implement stateToCount as a range of states (for countable data types),
      and relative targetStates.
	*/
	
    mlca.rulelists = {
	gol:[
	    new mlca.Rule({
		layerID:'main',
		targetState:false,
		conditions: [
		    new mlca.Condition({
			targetLayerID:'main',
			kernel:mlca.kernels.ring8,
			stateToCount:true,
			number: 1,
			compOperation: '<='
		    })]
	    }),
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
	gol :
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
    };
    mlca.conditions = {};
        
    
	//Interface prototype
    
	/*
	  Initializations (will be done through the interface later)
    */
	
    mlca.layerList.push(new mlca.Layer(mlca.layers.gol));
    mlca.rulesetList.push(new mlca.Ruleset({
	ruleList:mlca.rulelists.gol,
	layerID:'main'
    }));

    //R-Pentamino :D
    mlca.layerList[0].readFromString('011\n11\n010',
				     function(n){
					 switch (n){
					 case '1':
					     return true;
					 default:
					     return false;
					 }
				     },
				     {x:10,y:10}
				    );
    //End Interface prototype
	
	
    this.draw();
    mlca.mainloop();
};

/*
  Draw: Draws background, then layers (from bottom to top), then grid.
*/

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

mlca.automaton.iterate = function() {
    'use strict';
    var i;
    var it = {x:0,y:0};

    // Execute Rulesets
    for (i = 0; i<mlca.rulesetList.length; i+= 1){
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
};
