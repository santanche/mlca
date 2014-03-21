/*
    * Matrix
        + constructor(nLines, nCols)
        + get(x,y)
        + kernel(x,y)
        + map(f)
    * Kernel
        + 
        + 
    
    * Director
    --> ?
    
    * GameRules 
*/

var Matrix = function(nLines, nCols) {
};

Matrix.prototype = {
    get: function(x, y) {
        // return cell;
    },
    
    kernel: function(x, y) {
    },
    
    map: function(gameFunction) {
        // foreach (cell in Matrix)
        //     newCell = gameFunction(cell.kernel);
    }
};

    var WorstMatrix = function(nLines, nCols) {
        this.nLines = nLines;
        this.nCols = nCols;
        this.matrix = {};
    };
    
    WorstMatrix.prototype = {
        get: function(x, y) {
            if(x >= this.nCols || x < 0 || y >= this.nLines || y < 0 ) {
                return 0;
            }
        
            return this.matrix[x + ',' + y] || 0;
        },
        
        set: function(x, y, value) {
            if(x >= this.nCols || x < 0 || y >= this.nLines || y < 0 ){
                return;
            }
            
            this.matrix[x + ',' + y] = value;
        },  
        
        map: function(f) {
            var newMatrix = new WorstMatrix(this.nLines, this.nCols); 
            var i, j;
            for (i = 0; i < this.nLines; i++) {
                for (j = 0; j < this.nCols; j++) {
                    //console.log("Posicao "+i+","+j+":");
                    newMatrix.set(i, j, f(this.get(i, j), new this.Kernel(this, i, j)));
                }
            }
            
            return newMatrix;
        }
    };
    
    WorstMatrix.prototype.Kernel = function(matrix, x, y) {
        this.matrix = matrix;
        this.x = x;
        this.y = y;
    };
    
    WorstMatrix.prototype.Kernel.prototype = {
        neighborhood: [
            { x: -1, y: -1 },
            { x: -1, y: 0 },
            { x: -1, y: 1 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: 1, y: -1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 }
        ],  
            
        count: function(state) {
            return this.neighborhood.reduce((function(memo, pos) {
                if (this.matrix.get(this.x + pos.x, this.y + pos.y) === state) {                    
                    memo = memo + 1;
                }
                return memo;
            }).bind(this), 0);
        }
    };
    
    var GoL = function() {
    };
    
    GoL.prototype = {
        states: {
            dead: 0,
            live: 1
        },
        
        applyRules: function(state, kernel) {
            var newState;
            var count = kernel.count(this.states.live);
            if (state === this.states.live) {
                if (count < 2 || count > 3) {
                    newState = this.states.dead;
                } else {
                    newState = this.states.live;
                }         
            } else {
                if (count === 3) {
                    newState = this.states.live;
                } else {
                    newState = this.states.dead;
                }
            }
    
            return newState;
        }
    };
    
    var Director = function(matrix, game) {
        this.matrix = matrix;
        this.game = game;
    };
    
    Director.prototype = {
        tick: function() {
            this.matrix = this.matrix.map(this.game.applyRules.bind(this.game));
        }
    };
    
    var printMatrix = function(matrix) {
        console.log("**********************************************************************************************");
        var i, p;
		for (i = 0; i < matrix.nLines; i++) {
            p = "";
            for (var j = 0; j < matrix.nCols; j++) {
                p += matrix.get(i,j)?"@":"-";
            }
            console.log(p);
        }
        console.log("**********************************************************************************************");
    }
    
    var matrix = new WorstMatrix(50, 50);
    matrix.set(0, 1, 1);
    matrix.set(1, 2, 1);
    matrix.set(2, 0, 1);
    matrix.set(2, 1, 1);
    matrix.set(2, 2, 1);
    
    var game = new GoL();
    
    var director = new Director(matrix, game);
    
    var i;
    for(i = 0; i < 50; i++)
    {
        printMatrix(director.matrix);
        director.tick();
    }