const   express     = require('express');
        app         = express(),
        mongoose    = require('mongoose'),
        port        = process.env.PORT || 3000,
        consts      = require('./connect/consts'),
        player     = require("./server/getData"),
        bodyParser  = require('body-parser');
        
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended:true }));
        app.use('/assets', express.static(`${__dirname}/public`));
        app.use(   (req,res,next) => {    
            res.header("Access-Control-Allow-Origin", "*");    
            res.header("Access-Control-Allow-Headers",                
                        "Origin, X-Requested-With, Content-Type, Accept");    
                  //res.set("Content-Type", "application/json");    
                  next();  
                });
        mongoose.Promise = global.Promise;
        mongoose.connect(consts.MLAB_KEY, {useNewUrlParser: true}).then(
            () => {
                console.log("Connecting DataBase..")
            },
            err => {
                console.log(`connection error: ${err}`);
              }
        );




        app.get('/academiesWorth',player.academiesWorth)
        app.get('/leaguesWorth',player.leaguesWorth)





        
        app.all('*', (req, res) => {
            res.status(200).json({"Error": "Request route did not match any option!"});
        });

        app.listen(port);
            console.log(`listening on port ${port}`);
        
