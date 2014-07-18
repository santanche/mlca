// _type (bool, int, etc, etc);
    // interfaceData (contém funcs estado->representação)
    // dataStructure
    // Facade p/ layerDataStructure

    /* specs = {
       DataStructure: constructor da layerDataStructure desejada
       dimensions,
       type,
       topology,
       layerID,
       interfaceData
       }
     */
 
mlca.Layer = function(specs) {
    'use strict';
    this.dimensions = specs.dimensions;
    this.isVisible = true;
    this.id = specs.layerID;
    this.type = specs.type;
    this.initDataStructure(specs.DataStructure);
    this.buffer.current=this.buffer[0];    
    this.buffer.next=this.buffer[1];
    return this;
    }

mlca.Layer.prototype = {
    type : '',
    id : '',
    interfaceData: {},
    buffer:[],
    read: function(coords){return this.buffer.current.getCell(coords);},
    write: function(coords, value){return this.buffer.next.setCell(coords, value);},
    swap: function(){
	a = this.buffer.next;
	this.buffer.next = this.buffer.current;
	this.buffer.current = a;
    },
    initDataStructure: function (DataStructure){
	console.log("Initializing data structure type "
		    + this.type + " to layer " + this.id);
	for (var i = 0; i<=1; i++){
	    this.buffer[i] = new DataStructure(
		{
		    dimensions: this.dimensions,
		    type: this.type,
		    topology: this.topology,
		}
	    );
	}//end for
    },
};
