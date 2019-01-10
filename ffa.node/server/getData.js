//mongoimport -h ds163730.mlab.com:63730 -d football-academy -c players -u player-1 -p player-1 --file finalJson.json
var Player = require('./playerSchema');

exports.academiesWorth = function (req,res){
    Player.aggregate([{$match:{}}, {
        $group: {
            _id : "$Academy",
            totalValue : { $sum: "$MarketValue" }
        }
    }]).then((academyDoc)=>{
        if(!academyDoc){
            return res.status(404).send();
        }
        res.status(200).json(academyDoc);
    }).catch((e) => {
        res.status(400).send(e);
    });
}

exports.leaguesWorth = function (req,res){
    Player.aggregate([{$match:{
        $or:[
            {League:"Premier League"},
            {League:"LaLiga"},
            {League:"League One"},
            {League:"Serie A"},
            {League:"Bundesliga"}]}}, {
        $group: {
            _id : "$League",
            totalValue : { $sum: "$MarketValue" },
            count: { $sum: 1 }
        }
    }]).then((leagueDoc)=>{
        if(!leagueDoc){
            return res.status(404).send();
        }
        res.status(200).json(leagueDoc);
    }).catch((e) => {
        res.status(400).send(e);
    });
}



