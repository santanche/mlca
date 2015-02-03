/*
  LayerDataStructure:
  
  -topology: Layer's edge rule ('noloop','xloop','yloop','xyloop')
  -dimensions: the size of the LayerDataStructure

  specs: {
		dimensions, 
		topology, 
  }
  
  +clear(state): set all cells to the state given by parameters.
  
  -isValidCoord(coord): check if the coordinate given is within the layer dimension or is
  validated by the topology, if so, returns true, else returns false.
  
  -topologyHandler(coord): ajust the coordinate values given, if greater than the dimension or negative, 
  according to the layer topology
  
  +cell(coordinate, value): Return a cell value or set a cell value if value is given

  -getCell(coord): Dummy method, must be overwritten by the children according to its dataStructure.
	
  -setCell(coord,newValue): Dummy method, must be overwritten by the children according to its dataStructure. 
*/

mlca.LayerDataStructure = function (specs) {
    'use strict'; 
	 
	 this.dimensions = specs.dimensions;
    this.topology = specs.topology;
};

mlca.LayerDataStructure.prototype = {
    
	 clear: function(state){
	'use strict';
	console.log('clear');
	var it = {x:0,y:0};
	for (it.x = 0;it.x < this.dimensions.x;it.x++){
	    for (it.y = 0;it.y < this.dimensions.y;it.y++){
		this.setCell(it,state);
	    }	    
	}
    },
    isValidCoord: function(coord){
	'use strict';
	
	if (coord.x >= this.dimensions.x ||
	    coord.x < 0){
	    switch (this.topology){
	    case 'xloop':
	    case 'xyloop':
		break;
	    default:
		return false;
	    }
	}
	if (coord.y >= this.dimensions.y ||
	    coord.y < 0){
	    switch (this.topology){
	    case 'yloop':
	    case 'xyloop':
		break;
	    default:
		return false;
	    }
	}	
	return true;
    },
    topologyHandler: function(coord){
	'use strict';
	
	var ret = {};
	ret.x = coord.x;
	ret.y = coord.y;
	if (coord.x >= this.dimensions.x || coord.x < 0){
	    switch (this.topology){
	    case 'xloop':
	    case 'xyloop':
		ret.x = ret.x%this.dimensions.x;
		if (ret.x<0) {ret.x += this.dimensions.x;}
		break;
	    }
	}
	if (coord.y >= this.dimensions.y || coord.y < 0){
	    switch (this.topology){
	    case 'yloop':
	    case 'xyloop':
		ret.y = ret.y%this.dimensions.y;
		if (ret.y<0) {ret.y += this.dimensions.y;}
		break;
	    }
	}
	return ret;
    },
    cell: function() {
	'use strict';
	
	var ret = -1;
	var coords = this.topologyHandler(arguments[0]);
	if (arguments.length === 1) {
	    ret = this.getCell(coords);
	}
	else if(arguments.length === 2) {
	    ret = this.setCell(coords, arguments[1]);
	}
	return ret;
    },
    getCell: function(coord) {
	// Dummy method.
    },
    setCell: function(coord,newValue) {
	// Dummy method.
    }
};
