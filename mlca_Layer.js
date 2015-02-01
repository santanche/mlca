/* Layer: contain the layer characteristics

	-type: contain the inner representation of the states (bool, int, etc);
   -id: layer identifier
	-interfaceData: contain the graphic representation for each state
   -dataStructure: contain the way states are stored (int matrix, bit map, etc)
	-buffer: stores the data of the current and the next configuration of states of the layer
   
   specs = {
		DataStructure: constructor da layerDataStructure desejada
      dimensions,
      type,
      topology,
		defaultState,
      layerID,
      interfaceData
      name
   }
	
	+clear(state): set all cells in the current and next step buffer to the state in parameter, 
	if none is given, search for the default state, if there isn't any, returns false.
	
	+read(coords): return the state of the current cell given by the coords parameter.
	
	+write(coords, value, dontSwap): writes the value passed to the cell given by the coords parameter, 
	if dontSwap is true, writes to the current cell, else writes to the next step cell. returns if the
	cell writing was successful.
	
	+swap(): swap the current buffer with the next step one.
	
	-initDataStructure(DataStructure): assign the data structure given by parameter to the buffers, 
	the layerDataStructure parameters are taken from the layer object.
	
	+readFromString(string,func,offset): reads a string and assign the states given by the chars to the cells 
	starting at a certain offset, from left to right. '\n' indicates a line break, which means the next cell to
	be assigned is on a line below the current.
*/
 
mlca.Layer = function(specs) {
    'use strict';
    this.dimensions = specs.dimensions;
    this.isVisible = true;
    this.id = specs.layerID;
    this.type = specs.type;
    this.name = specs.name;
    this.topology = specs.topology;
	 this.defaultState = specs.defaultState;
    this.interfaceData = specs.interfaceData;
    this.initDataStructure(specs.DataStructure);
    console.log(this.name + "'s data structure initialized");
    this.buffer.current=this.buffer[0];    
    this.buffer.next=this.buffer[1];
    return this;
    };

mlca.Layer.prototype = {
    type : '',
    id : '',
    interfaceData: {},
    buffer:[],
	 clear: function(state){
	if (state===undefined){
	    if (this.defaultState!==undefined){
		state = this.defaultState;
	    }
	    else {return false};
	}
	console.log(state);
	this.buffer.next.clear(state);
	this.buffer.current.clear(state);
    },
    read: function(coords){
	'use strict';
	return this.buffer.current.getCell(coords);
    },
    write: function(coords, value, dontSwap){
	'use strict';
	var matrix;
	if (dontSwap === true){
	    matrix = this.buffer.current;
	}
	else {
	    matrix = this.buffer.next;
	}
	return matrix.setCell(coords, value);
    },
    swap: function(){
	'use strict';
	
	var a = this.buffer.next;
	this.buffer.next = this.buffer.current;
	this.buffer.current = a;
    },
    initDataStructure: function (DataStructure){
	'use strict';
	console.log("Initializing data structure type "
		    + this.type + " to layer " + this.id);
	
	var i;
	for (i = 0; i<=1; i+=1){
	    this.buffer[i] = new DataStructure(
		{
		    dimensions: this.dimensions,
		    type: this.type,
		    topology: this.topology
		}
	    );
	}//end for
    },
    readFromString: function (string,func,offset){
	'use strict';
	console.log('Reading from string:');
	if (offset === undefined){
	    offset = {x:0,y:0};
	}
	console.log(string);
	var i;
	var it = {x:0, y:0};
	for (i = 0;i<string.length;i+=1){
	    console.log(i + 'th character: '+ string.charAt(i));
	    if (string.charAt(i)==='\n'){
		it.x=0;
		it.y+=1;
		console.log('Line break.');
		continue;
	    }
	    if (it.x>=this.dimensions.x){
		it.x=0;
		it.y+=1;
	    }
	    if (it.y >= this.dimensions.y) {return;}
	    console.log('Writing ' + string.charAt(i) + ' at ' + it.x + ',' + it.y);
	    this.write({x:it.x+offset.x,y:it.y+offset.y},func(string.charAt(i)));
	    it.x+=1;
	}
	this.swap();
    }
};
