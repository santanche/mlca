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
       name
       }
     */
 
mlca.Layer = function(specs) {
    'use strict';
    this.dimensions = specs.dimensions;
    this.isVisible = true;
    this.id = specs.layerID;
    this.type = specs.type;
    this.name = specs.name;
    this.interfaceData = specs.interfaceData;
    this.initDataStructure(specs.DataStructure);
    console.log(this.name + "'s data structure initialized");
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
    readFromString: function (string,func){
	console.log('Reading from string:');
	console.log(string);
	var it = {x:0, y:0};
	for (var i = 0;i<string.length;i++){
	    console.log(i + 'th character: '+ string.charAt(i));
	    if (string.charAt(i)==='\n'){
		it.x=0;
		it.y++;
		console.log('Line break.');
		continue;
	    }
	    if (it.x>=this.dimensions.x){
		it.x=0;
		it.y++;
	    }
	    if (it.y >= this.dimensions.y) return;
	    console.log('Writing ' + string.charAt(i) + ' at ' + it.x + ',' + it.y);
	    this.write(it,func(string.charAt(i)));
	    it.x++;
	}
	this.swap();
    }
};
