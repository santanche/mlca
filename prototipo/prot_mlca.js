var Matrix, WorstMatrix;

Matrix = function (espec) {
	this.lines = espec.lines || 0;
	this.columns = espec.columns || 0;
	this.topology = espec.columns || 0;
};

Matrix.prototype.getCell = function (coords) {};
Matrix.prototype.setCell = function (coords, value) {};

WorstMatrix = function (espec) {
	var i,j;
	
	this.prototype.constructor.apply(this, [espec]);
	this._data = [];
	
	for (i = 0; i < this.lines; i += 1) {
		this._data.push([])
		for (j = 0; j < this.columns; j += 1) {
			this._data[i].push(0);
		}
	}
};

WorstMatrix.prototype = new Matrix();

WorstMatrix.prototype.getCell = function (coords) {
	return this._data[coords.x][coords.y];
};
WorstMatrix.prototype.setCell = function (coords, value) {
	this._data[coords.x][coords.y] = value;
};

WorstMatrix.prototype.Kernel = function()

matrix = new WorstMatrix({lines : 1, columns : 4});

