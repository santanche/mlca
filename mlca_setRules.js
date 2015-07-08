//Method that load the rules and its conditions in each ruleList
//(note that if a condition variable changes, it wont be updated until this method is run)

mlca.setRules = function () {
        mlca.rulelists = {
        formigas:[
            
            /*
                Colisão (2 formigas ocupariam o mesmo bloco no próximo turno)
                =>A formiga inferior espera 1 turno
            */
            
            //Célula [Formiga(topLeft)] + Vizinhos [Formiga(top)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:0,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(top)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-1,y:0}]}),
                stateToCount:1,
                attributeToCount:1,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topLeft)] + Vizinhos [Formiga(topRight)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:0,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(topRight)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-2,y:0}]}),
                stateToCount:1,
                attributeToCount:2,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topLeft)] + Vizinhos [Formiga(right)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:0,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(right)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-2,y:-1}]}),
                stateToCount:1,
                attributeToCount:3,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topLeft)] + Vizinhos [Formiga(botRight)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:0,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botRight)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-2,y:-2}]}),
                stateToCount:1,
                attributeToCount:4,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topLeft)] + Vizinhos [Formiga(bot)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:0,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(bot)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-1,y:-2}]}),
                stateToCount:1,
                attributeToCount:5,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topLeft)] + Vizinhos [Formiga(botLeft)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:0,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botLeft)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:0,y:-2}]}),
                stateToCount:1,
                attributeToCount:6,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topLeft)] + Vizinhos [Formiga(left)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:0,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(left)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
                stateToCount:1,
                attributeToCount:7,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(top)] + Vizinhos [Formiga(topRight)] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(top)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:1,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(topRight)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-1,y:0}]}),
                stateToCount:1,
                attributeToCount:2,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(top)] + Vizinhos [Formiga(right)] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(top)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:1,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(right)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1}]}),
                stateToCount:1,
                attributeToCount:3,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(top)] + Vizinhos [Formiga(botRight)] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(top)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:1,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botRight)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-1,y:-2}]}),
                stateToCount:1,
                attributeToCount:4,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(top)] + Vizinhos [Formiga(bot)] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(top)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:1,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(bot)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:0,y:-2}]}),
                stateToCount:1,
                attributeToCount:5,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(top)] + Vizinhos [Formiga(botLeft)] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(top)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:1,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botLeft)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:-2}]}),
                stateToCount:1,
                attributeToCount:6,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(top)] + Vizinhos [Formiga(left)] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(top)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:1,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(left)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:-1}]}),
                stateToCount:1,
                attributeToCount:7,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topRight)] + Vizinhos [Formiga(right)] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:2,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(right)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
                stateToCount:1,
                attributeToCount:3,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topRight)] + Vizinhos [Formiga(botRight)] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:2,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botRight)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:0,y:-2}]}),
                stateToCount:1,
                attributeToCount:4,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topRight)] + Vizinhos [Formiga(bot)] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:2,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(bot)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:-2}]}),
                stateToCount:1,
                attributeToCount:5,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topRight)] + Vizinhos [Formiga(botLeft)] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:2,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botLeft)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:2,y:-2}]}),
                stateToCount:1,
                attributeToCount:6,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topRight)] + Vizinhos [Formiga(left)] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:2,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(left)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:2,y:-1}]}),
                stateToCount:1,
                attributeToCount:7,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(right)] + Vizinhos [Formiga(botRight)] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(right)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:3,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botRight)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
                stateToCount:1,
                attributeToCount:4,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(right)] + Vizinhos [Formiga(bot)] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(right)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:3,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(bot)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:-1}]}),
                stateToCount:1,
                attributeToCount:5,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(right)] + Vizinhos [Formiga(botLeft)] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(right)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:3,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botLeft)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:2,y:-1}]}),
                stateToCount:1,
                attributeToCount:6,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(right)] + Vizinhos [Formiga(left)] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(right)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:3,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(left)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:2,y:0}]}),
                stateToCount:1,
                attributeToCount:7,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(botRight)] + Vizinhos [Formiga(bot)] = Célula [Formiga(botRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(botRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:4,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(bot)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:0}]}),
                stateToCount:1,
                attributeToCount:5,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(botRight)] + Vizinhos [Formiga(botLeft)] = Célula [Formiga(botRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(botRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:4,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botLeft)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:2,y:0}]}),
                stateToCount:1,
                attributeToCount:6,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(botRight)] + Vizinhos [Formiga(left)] = Célula [Formiga(botRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(botRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:4,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(left)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:2,y:1}]}),
                stateToCount:1,
                attributeToCount:7,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(bot)] + Vizinhos [Formiga(botLeft)] = Célula [Formiga(bot)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[5]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(bot)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:5,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botLeft)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:0}]}),
                stateToCount:1,
                attributeToCount:6,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(bot)] + Vizinhos [Formiga(left)] = Célula [Formiga(bot)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[5]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(bot)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:5,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(left)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:1}]}),
                stateToCount:1,
                attributeToCount:7,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(botLeft)] + Vizinhos [Formiga(left)] = Célula [Formiga(botLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[6]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(botLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:6,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(left)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:0,y:1}]}),
                stateToCount:1,
                attributeToCount:7,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            
            /*
                Colisão (frontal, ambas formigas desapareceriam)
                =>As formigas trocam de posição
            */
            
            //Célula [Formiga(topLeft)] + Vizinhos [Formiga(botRight)] = Célula [Formiga(botRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:0,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botRight)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-1,y:-1}]}),
                stateToCount:1,
                attributeToCount:4,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(top)] + Vizinhos [Formiga(bot)] = Célula [Formiga(bot)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[5]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(top)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:1,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(bot)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:0,y:-1}]}),
                stateToCount:1,
                attributeToCount:5,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(topRight)] + Vizinhos [Formiga(botLeft)] = Célula [Formiga(botLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[6]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(topRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:2,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(botLeft)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:-1}]}),
                stateToCount:1,
                attributeToCount:6,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(right)] + Vizinhos [Formiga(left)] = Célula [Formiga(left)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[7]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(right)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:3,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(left)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:0}]}),
                stateToCount:1,
                attributeToCount:7,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(botRight)] + Vizinhos [Formiga(topLeft)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(botRight)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:4,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(topLeft)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:1,y:1}]}),
                stateToCount:1,
                attributeToCount:0,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(bot)] + Vizinhos [Formiga(top)] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(bot)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:5,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(top)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:0,y:1}]}),
                stateToCount:1,
                attributeToCount:1,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(botLeft)] + Vizinhos [Formiga(topRight)] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(botLeft)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:6,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(topRight)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-1,y:1}]}),
                stateToCount:1,
                attributeToCount:2,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Formiga(left)] + Vizinhos [Formiga(right)] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            conditions:[    
                new mlca.Condition({ //Se Célula = [Formiga(left)]
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:7,
                attributeIndex:0,    
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({ //Se Vizinho = [Formiga(right)]
                targetLayerID:'formigas',
                kernel:new mlca.Kernel({relPosList:[{x:-1,y:0}]}),
                stateToCount:1,
                attributeToCount:3,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            
            /*
                Seguir feromonio
                =>Alinha-se com a trilha com probabilidade 1-Pon
            */
            
            //Célula [Formiga(topLeft)] + Vizinho [Feromônios] = Célula [Formiga(left)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[7]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(topLeft)] + Vizinho [Feromônios] = Célula [Formiga(topLeft)] 
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(topLeft)] + Vizinho [Feromônios] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(top)] + Vizinho [Feromônios] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(top)] + Vizinho [Feromônios] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(top)] + Vizinho [Feromônios] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(topRight)] + Vizinho [Feromônios] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(topRight)] + Vizinho [Feromônios] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(topRight)] + Vizinho [Feromônios] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(right)] + Vizinho [Feromônios] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(right)] + Vizinho [Feromônios] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(right)] + Vizinho [Feromônios] = Célula [Formiga(botRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(botRight)] + Vizinho [Feromônios] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(botRight)] + Vizinho [Feromônios] = Célula [Formiga(botRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(botRight)] + Vizinho [Feromônios] = Célula [Formiga(bot)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[5]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(bot)] + Vizinho [Feromônios] = Célula [Formiga(botRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(bot)] + Vizinho [Feromônios] = Célula [Formiga(bot)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[5]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(bot)] + Vizinho [Feromônios] = Célula [Formiga(botLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[6]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(botLeft)] + Vizinho [Feromônios] = Célula [Formiga(bot)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[5]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(botLeft)] + Vizinho [Feromônios] = Célula [Formiga(botLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[6]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(botLeft)] + Vizinho [Feromônios] = Célula [Formiga(left)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[7]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(Left)] + Vizinho [Feromônios] = Célula [Formiga(botLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[6]},
            probability:mlca.feromoneFollowingProbability,
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
            //Célula [Formiga(left)] + Vizinho [Feromônios] = Célula [Formiga(left)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[7]},
            probability:mlca.feromoneFollowingProbability,
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

            //Célula [Formiga(left)] + Vizinho [Feromônios] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            probability:mlca.feromoneFollowingProbability,
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
            
            /*
                Mudança de direção
                =>Espaço recebe formiga com direção trocada
            */
            
            //Célula [Nada] + Vizinho [Formiga(topLeft)] = Célula [Formiga(left)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[7]},
            probability:mlca.directionChangeProbability,
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
            //Célula [Nada] + Vizinho [Formiga(topLeft)] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            probability:mlca.directionChangeProbability,
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
            
            //Célula [Nada] + Vizinho [Formiga(top)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            probability:mlca.directionChangeProbability,
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
            //Célula [Nada] + Vizinho [Formiga(top)] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            probability:mlca.directionChangeProbability,
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
            
            //Célula [Nada] + Vizinho [Formiga(topRight)] = Célula [Formiga(top)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            probability:mlca.directionChangeProbability,
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
            //Célula [Nada] + Vizinho [Formiga(topRight)] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            probability:mlca.directionChangeProbability,
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
            
            //Célula [Nada] + Vizinho [Formiga(right)] = Célula [Formiga(topRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            probability:mlca.directionChangeProbability,
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
            //Célula [Nada] + Vizinho [Formiga(right)] = Célula [Formiga(botRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            probability:mlca.directionChangeProbability,
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
            
            //Célula [Nada] + Vizinho [Formiga(botRight)] = Célula [Formiga(right)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            probability:mlca.directionChangeProbability,
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
            //Célula [Nada] + Vizinho [Formiga(botRight)] = Célula [Formiga(bot)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[5]},
            probability:mlca.directionChangeProbability,
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
            
            //Célula [Nada] + Vizinho [Formiga(bot)] = Célula [Formiga(botRight)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            probability:mlca.directionChangeProbability,
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
            //Célula [Nada] + Vizinho [Formiga(bot)] = Célula [Formiga(botLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[6]},
            probability:mlca.directionChangeProbability,
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
            
            //Célula [Nada] + Vizinho [Formiga(botLeft)] = Célula [Formiga(bot)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[5]},
            probability:mlca.directionChangeProbability,
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
            //Célula [Nada] + Vizinho [Formiga(botLeft)] = Célula [Formiga(left)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[7]},
            probability:mlca.directionChangeProbability,
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
            
            //Célula [Nada] + Vizinho [Formiga(left)] = Célula [Formiga(botLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[6]},
            probability:mlca.directionChangeProbability,
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
            //Célula [Nada] + Vizinho [Formiga(left)] = Célula [Formiga(topLeft)]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            probability:mlca.directionChangeProbability,
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
            
            /*
                Movimento
                =>Qualquer célula recebe formiga adjacente em sua direção
            */
             
            // X -> Formiga(left)
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[7]},
            conditions:[
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
            // X -> Formiga(botLeft)
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[6]},
            conditions:[
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
            // X -> Formiga(bot)
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[5]},
            conditions:[
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
            // X -> Formiga(botRight)
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[4]},
            conditions:[
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
            // X -> Formiga(right)
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[3]},
            conditions:[
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
            // X -> Formiga(topRight)
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[2]},
            conditions:[
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
            // X -> Formiga(top)
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[1]},
            conditions:[
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
            // X -> Formiga(topLeft)
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:1,attributes:[0]},
            conditions:[
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
            //Célula [Formiga] + Vizinhos [] = Célula [Nada]
            new mlca.Rule({
            layerID:'formigas',
            targetState:{state:0,attributes:[]},
            conditions:[
                new mlca.Condition({ //
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                number: 1,
                compOperation: '=='
                })]
            })
        ],
            
        feromonios:[
            
            /*
                Feromonio deixado pela formiga
                =>Se não ouver feromonio deixa k = 18
            */
            
            //Célula [Nada] + Vizinho [Formiga] = Célula [Feromonio(18)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[18]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                number: 1,
                compOperation: '=='
                }),
                new mlca.Condition({
                targetLayerID:'feromonios',
                kernel:mlca.kernels.self,
                stateToCount:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Feromonio] + Vizinho [Formiga] = Célula [Feromonio(29)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[29]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'formigas',
                kernel:mlca.kernels.self,
                stateToCount:1,
                number: 1,
                compOperation: '=='
                })]
            }),
            
            /*
                Decaimento do feromonio
                =>Feromonio(x) passa a ser Feromonio(x-1)
            */
            
            //Célula [Feromonio(29)]= Célula [Feromonio(28)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[28]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'feromonios',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:29,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Feromonio(28)]= Célula [Feromonio(27)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[27]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'feromonios',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:28,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Feromonio(27)]= Célula [Feromonio(26)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[26]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'feromonios',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:27,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Feromonio(26)]= Célula [Feromonio(25)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[25]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'feromonios',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:26,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Feromonio(25)]= Célula [Feromonio(24)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[24]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'feromonios',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:25,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Feromonio(24)]= Célula [Feromonio(23)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[23]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'feromonios',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:24,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Feromonio(23)]= Célula [Feromonio(22)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[22]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'feromonios',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:23,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Feromonio(22)]= Célula [Feromonio(21)]
            new mlca.Rule({
            layerID:'feromonios',
            targetState:{state:1,attributes:[21]},
            conditions:[
                new mlca.Condition({
                targetLayerID:'feromonios',
                kernel:mlca.kernels.self,
                stateToCount:1,
                attributeToCount:22,
                attributeIndex:0,
                number: 1,
                compOperation: '=='
                })]
            }),
            //Célula [Feromonio(21)]= Célula [Feromonio(20)]
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
            //Célula [Feromonio(20)]= Célula [Feromonio(19)]
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
            //Célula [Feromonio(19)]= Célula [Feromonio(18)]
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
            //Célula [Feromonio(18)]= Célula [Feromonio(17)]
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
            //Célula [Feromonio(17)]= Célula [Feromonio(16)]
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
            //Célula [Feromonio(16)]= Célula [Feromonio(15)]
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
            //Célula [Feromonio(15)]= Célula [Feromonio(14)]
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
            //Célula [Feromonio(14)]= Célula [Feromonio(13)]
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
            //Célula [Feromonio(13)]= Célula [Feromonio(12)]
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
            //Célula [Feromonio(12)]= Célula [Feromonio(11)]
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
            //Célula [Feromonio(11)]= Célula [Feromonio(10)]
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
            //Célula [Feromonio(10)]= Célula [Feromonio(9)]
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
            //Célula [Feromonio(9)]= Célula [Feromonio(8)]
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
            //Célula [Feromonio(8)]= Célula [Feromonio(7)]
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
            //Célula [Feromonio(7)]= Célula [Feromonio(6)]
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
            //Célula [Feromonio(6)]= Célula [Feromonio(5)]
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
            //Célula [Feromonio(5)]= Célula [Feromonio(4)]
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
            //Célula [Feromonio(4)]= Célula [Feromonio(3)]
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
            //Célula [Feromonio(3)]= Célula [Feromonio(2)]
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
            //Célula [Feromonio(2)]= Célula [Feromonio(1)]
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
            //Célula [Feromonio(1)]= Célula [Feromonio(0)]
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
            //Célula [Feromonio(0)]= Célula [Nada]
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
    };