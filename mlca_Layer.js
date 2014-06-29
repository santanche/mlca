// _type (bool, int, etc, etc);
    // interfaceData (contém funcs estado->representação)
    // dataStructure
    // Facade p/ layerDataStructure

    /* specs = {
       layerDataStructure: constructor da layerDataStructure desejada
       dimensions,
       type,
       topology,
       layerID,
       interfaceData
       }
     */
 
mlca.Layer = function(specs) {
    'use strict';
    this.isVisible = true;
    this.id = specs.layerID;
    this.type = specs.type;
    this._buffer[0] = new specs.layerDataStructure(specs);
    this._buffer[1] = new specs.layerDataStructure(specs);
    this._buffer.current=this.buffer[0];    
    this._buffer.next=this.buffer[1];
    return this;
    }

mlca.Layer.prototype = {
    type : '',
    id : '',
    interfaceData: {},
    buffer:[],
    read: function(coords){return this._buffer.current.getCell(coords);},
    write: function(coords, value){return this._buffer.next.setCell(coords, value);},
    swap: function(){
	a = this._buffer.next;
	this._buffer.next = this.buffer.current;
	this._buffer.current = a;
    },
    initDataStructure: function (DataStructure){
	this.layerDataStructure = new DataStructure(
	    {
		dimensions: this.dimensions,
		type: this.type,
		topology: this.topology,
	    }
	);
    },
};
