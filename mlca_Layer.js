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
       topology
       }
     */
 
mlca.Layer = function(specs) {
    'use strict';
    this.dimensions = specs.dimensions;
    this.isVisible = true;
    this.id = specs.layerID;
    this.type = specs.type;
    this.name = specs.name;
    this.topology = specs.topology;
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
    read: function(coords){
		'use strict';
		return this.buffer.current.getCell(coords);},
    write: function(coords, value){
		'use strict';
		return this.buffer.next.setCell(coords, value);},
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
