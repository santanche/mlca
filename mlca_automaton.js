/* Automaton

   Monolithic iterator: access to all modules
	
	+begin(): initiate the ruleset list, most display parameters, the main loop
	the list of layers, the neighborhood libraries and predefined rules and layers
	
	-draw(): draws the cells into the canvas, followed by the grid
	
	-iterate(): compute the next state of all layers
*/

mlca.automaton = {};

mlca.automaton.begin = function () {
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

    if (mlca.fieldSize === undefined) {
		mlca.fieldSize = {x: 100, y: 60};
	}
    this.play = false;
    if (this.fps === undefined) {
		this.fps = 10;
	}
    if (this.cellSize === undefined) { this.cellSize = 10; }
    if (!this.displayInfo) {
        this.displayInfo = {
		    cellSize: this.cellSize,
		    dimensions: mlca.fieldSize
        };
    }
	document.getElementById("canvas").addEventListener('mousemove', function (event) {
		document.getElementById("mousex").innerHTML = Math.floor(event.clientX / mlca.automaton.cellSize);
		document.getElementById("mousey").innerHTML = Math.floor(event.clientY / mlca.automaton.cellSize);
	}, false);
	
	
    // Fix p/ multiplos event listeners
    if (!this.display) { this.display = new mlca.SimpleCanvasDisplay(this.displayInfo); }

	//End of temp implementation
	
    /*
	  mlca.mainloop: Main loop. Calculates elapsed time since last frame
	*/
    
	(function () {
	    var curr = (new Date()).getTime(), last = 0, elaps = 0;
	    mlca.mainloop = function () {
            last = curr;
            curr = (new Date()).getTime();
            elaps += curr - last;
            if (elaps > 1000 / mlca.automaton.fps) {
                elaps = (curr - last) % (1000 / mlca.automaton.fps);
                if (mlca.automaton.play) {
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

    mlca.layers = {
	formigas :
	{
	    dimensions: mlca.fieldSize,
        visibility: true,
	    type: 'integer',
	   	    topology: 'xyloop',
	    layerID: 'formigas',
	    DataStructure:mlca.WorstMatrix,
	    defaultState:{state:0,attributes:[]},
	    lock:false,
        interfaceData:{
		stateAlternate: function (s){
            if(s.state == 0){
                return {state:1, attributes:[0]};   
            }
            else if(s.attributes[0] < 7){
                return {state:1, attributes:[s.attributes[0] + 1]};
            }
            else{
                return {state:0};    
            }
        },
		stateRepresentation: function (s){
		    var ret;
		    switch (s.state){
		    case 1:
			ret = '#000000';
			break;
		    default:
			ret = 'white';
		    }
		    return ret;
		}// end stateRepresentation
	    }// end interfaceData
	},// end specs
    feromonios :
	{
	    dimensions: mlca.fieldSize,
        visibility: false,
	    type: 'integer',
	   	    topology: 'xyloop',
	    layerID: 'feromonios',
	    DataStructure:mlca.WorstMatrix,
	    defaultState:{state:0,attributes:[]},
        lock:false,
	    interfaceData:{
		stateAlternate: function (s){
            if(s.state == 0){
                return {state:1, attributes:[21]};   
            }
            else if(s.attributes[0] > 0){
                return {state:1, attributes:[s.attributes[0] - 1]};
            }
            else{
                return {state:0};    
            }
        },
		stateRepresentation: function (s){
		    var ret;
		    switch (s.state){
		    case 1:
			ret = 'yellow';
			break;
		    default:
			ret = 'purple';
		    }
		    return ret;
		}// end stateRepresentation
	    }// end interfaceData
	}// end specs    
    };
    
    //Probability of changing direction
    var directionChangeProbability = 0.1;
    var feromoneFollowingProbability = 1;
    
    mlca.rulelists = {
    formigas:[
        //Formiga -> Nada
	    new mlca.Rule({
		layerID:'formigas',
		targetState:{state:0,attributes:[]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:1,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        //Formiga(topLeft) + Feromônios -> Formiga(left)  
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[7]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:0},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
	        }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:1}]}),
			stateToCount:1,
            attributeToCount:0,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(topLeft) + Feromônios -> Formiga(topLeft)  
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[0]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:1}]}),
			stateToCount:1,
            attributeToCount:0,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
	       })]
	    }),
        //Formiga(topLeft) + Feromônios -> Formiga(top)  
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[1]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:1}]}),
			stateToCount:1,
            attributeToCount:0,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:-1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
	       })]
	    }),
        //Formiga(topLeft) -> Formiga(left)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[7]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:1}]}),
			stateToCount:1,
            attributeToCount:0,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(topLeft) -> Formiga(top)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[1]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:1}]}),
			stateToCount:1,
            attributeToCount:0,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(top) + Feromonios -> Formiga(topLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[0]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:1}]}),
			stateToCount:1,
            attributeToCount:1,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(top) + Feromonios -> Formiga(top)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[1]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:-1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:1}]}),
			stateToCount:1,
            attributeToCount:1,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(top) + Feromonios -> Formiga(topRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[2]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:-1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:1}]}),
			stateToCount:1,
            attributeToCount:1,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(top) -> Formiga(topLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[0]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:1}]}),
			stateToCount:1,
            attributeToCount:1,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(top) -> Formiga(topRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[2]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:1}]}),
			stateToCount:1,
            attributeToCount:1,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(topRight) + Feromonios -> Formiga(top)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[1]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:-1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:1}]}),
			stateToCount:1,
            attributeToCount:2,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(topRight) + Feromonios -> Formiga(topRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[2]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:-1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:1}]}),
			stateToCount:1,
            attributeToCount:2,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(topRight) + Feromonios -> Formiga(right)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[3]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:0},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:1}]}),
			stateToCount:1,
            attributeToCount:2,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(topRight) -> Formiga(top)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[1]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:1}]}),
			stateToCount:1,
            attributeToCount:2,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(topRight) -> Formiga(right)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[3]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:1}]}),
			stateToCount:1,
            attributeToCount:2,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(right) + Feromonios -> Formiga(topRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[2]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:-1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:0}]}),
			stateToCount:1,
            attributeToCount:3,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(right) + Feromonios -> Formiga(right)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[3]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:0},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:0}]}),
			stateToCount:1,
            attributeToCount:3,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(right) + Feromonios -> Formiga(botRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[4]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:0}]}),
			stateToCount:1,
            attributeToCount:3,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(right) -> Formiga(topRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[2]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:0}]}),
			stateToCount:1,
            attributeToCount:3,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(right) -> Formiga(botRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[4]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:0}]}),
			stateToCount:1,
            attributeToCount:3,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botRight) + Feromonios -> Formiga(right)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[3]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:0},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1}]}),
			stateToCount:1,
            attributeToCount:4,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botRight) + Feromonios -> Formiga(botRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[4]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1}]}),
			stateToCount:1,
            attributeToCount:4,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botRight) + Feromonios -> Formiga(bot)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[5]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1}]}),
			stateToCount:1,
            attributeToCount:4,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botRight) -> Formiga(right)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[3]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1}]}),
			stateToCount:1,
            attributeToCount:4,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botRight) -> Formiga(bot)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[5]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1}]}),
			stateToCount:1,
            attributeToCount:4,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),   
        //Formiga(bot) + Feromonios -> Formiga(botRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[4]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
			stateToCount:1,
            attributeToCount:5,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),   
        //Formiga(bot) + Feromonios -> Formiga(bot)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[5]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
			stateToCount:1,
            attributeToCount:5,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),   
        //Formiga(bot) + Feromonios -> Formiga(botLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[6]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
			stateToCount:1,
            attributeToCount:5,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(bot) -> Formiga(botRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[4]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
			stateToCount:1,
            attributeToCount:5,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(bot) -> Formiga(botLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[6]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
			stateToCount:1,
            attributeToCount:5,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botLeft) + Feromonios -> Formiga(bot)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[5]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:-1}]}),
			stateToCount:1,
            attributeToCount:6,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botLeft) + Feromonios -> Formiga(botLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[6]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:-1}]}),
			stateToCount:1,
            attributeToCount:6,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botLeft) + Feromonios -> Formiga(left)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[7]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:0},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:-1}]}),
			stateToCount:1,
            attributeToCount:6,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botLeft) -> Formiga(bot)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[5]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:-1}]}),
			stateToCount:1,
            attributeToCount:6,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(botLeft) -> Formiga(left)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[7]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:-1}]}),
			stateToCount:1,
            attributeToCount:6,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(left) + Feromonios -> Formiga(botLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[6]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:0}]}),
			stateToCount:1,
            attributeToCount:7,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(left) + Feromonios -> Formiga(left)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[7]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:0},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:0}]}),
			stateToCount:1,
            attributeToCount:7,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        
        //Formiga(left) + Feromonios -> Formiga(topLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[0]},
        probability:feromoneFollowingProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
            new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1},{x:0,y:0}]}),
			stateToCount:1,
			number: 2,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:0}]}),
			stateToCount:1,
            attributeToCount:7,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(left) -> Formiga(botLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[6]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:0}]}),
			stateToCount:1,
            attributeToCount:7,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Formiga(left) -> Formiga(topLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[0]},
        probability:directionChangeProbability,
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:0}]}),
			stateToCount:1,
            attributeToCount:7,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Nada -> Formiga(topLeft)
	    new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[0]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:1}]}),
			stateToCount:1,
            attributeToCount:0,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Nada -> Formiga(top)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[1]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:1}]}),
			stateToCount:1,
            attributeToCount:1,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Nada -> Formiga(topRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[2]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:1}]}),
			stateToCount:1,
            attributeToCount:2,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Nada -> Formiga(right)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[3]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:0}]}),
			stateToCount:1,
            attributeToCount:3,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Nada -> Formiga(botRight)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[4]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1}]}),
			stateToCount:1,
            attributeToCount:4,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Nada -> Formiga(bot)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[5]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
			stateToCount:1,
            attributeToCount:5,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Nada -> Formiga(botLeft)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[6]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:-1}]}),
			stateToCount:1,
            attributeToCount:6,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
        //Nada -> Formiga(left)
        new mlca.Rule({
		layerID:'formigas',
		targetState:{state:1,attributes:[7]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:0,
			number: 1,
			compOperation: '=='
		    }),
    	    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:new mlca.Kernel({relPosList:[{x:1,y:0}]}),
			stateToCount:1,
            attributeToCount:7,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
	       })]
	    }),
	],
    feromonios:[
        //Nada -> Feromonio
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[21]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'formigas',
			kernel:mlca.kernels.self,
			stateToCount:1,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        //Feromonio(21) -> Feromonio(20)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[20]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:21,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        //Feromonio(20) -> Feromonio(19)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[19]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:20,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        //Feromonio(19) -> Feromonio(18)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[18]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:19,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        //Feromonio(18) -> Feromonio(17)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[17]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:18,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        //Feromonio(17) -> Feromonio(16)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[16]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:17,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        //Feromonio(16) -> Feromonio(15)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[15]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:16,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        //Feromonio(15) -> Feromonio(14)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[14]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:15,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        //Feromonio(14) -> Feromonio(13)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[13]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:14,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(13) -> Feromonio(12)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[12]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:13,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(12) -> Feromonio(11)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[11]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:12,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(11) -> Feromonio(10)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[10]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:11,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(10) -> Feromonio(9)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[9]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:10,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(9) -> Feromonio(8)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[8]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:9,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(8) -> Feromonio(7)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[7]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:8,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(7) -> Feromonio(6)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[6]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:7,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(6) -> Feromonio(5)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[5]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:6,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(5) -> Feromonio(4)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[4]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:5,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(4) -> Feromonio(3)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[3]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:4,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(3) -> Feromonio(2)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[2]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:3,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(2) -> Feromonio(1)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[1]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:2,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(1) -> Feromonio(0)
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:1,attributes:[0]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:1,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
        
        //Feromonio(0) -> Nada
        new mlca.Rule({
		layerID:'feromonios',
		targetState:{state:0,attributes:[]},
		conditions:[
		    new mlca.Condition({
			targetLayerID:'feromonios',
			kernel:mlca.kernels.self,
			stateToCount:1,
            attributeToCount:0,
            attributeIndex:0,
			number: 1,
			compOperation: '=='
		    })]
	    }),
    ]
    };
    
    mlca.conditions = {};
        
	//Interface prototype
    
	/*
	  Initializations (will be done through the interface later)
    */
	
	
    mlca.layerList.push(new mlca.Layer(mlca.layers.formigas));
    mlca.layerList.push(new mlca.Layer(mlca.layers.feromonios));
    mlca.rulesetList.push(new mlca.Ruleset({
	ruleList:mlca.rulelists.formigas,
	layerID:'formigas'
    }));
    mlca.rulesetList.push(new mlca.Ruleset({
	ruleList:mlca.rulelists.feromonios,
	layerID:'feromonios'
    }));


  /*  //R-Pentamino :D
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
    *///End Interface prototype
	
    document.getElementById("selectedlayer").innerHTML = mlca.automaton.display.returnLayer().id;
    if(mlca.automaton.display.returnLayer().lock){
        document.getElementById("lockstatus").innerHTML = " (LOCKED)";
    }
        
	
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
