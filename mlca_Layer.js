// _type (bool, int, etc, etc);
    // interfaceData (contém funcs estado->representação)
    // dataStructure
    // Facade p/ layerDataStructure


mlca.Layer = function(specs) {
    /* specs = {
       layerDataStructure: constructor da layerDataStructure desejada
       ...
       }
     */
    this.dataStructRef = new specs.layerDataStructure();
    this.cell = this.dataStructRef.cell;
    }

mlca.Layer.prototype = {
    type,
    interfaceData,
    dataStructRef, //Referencia a DataStructure;
    cell,
};