var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Player     = new Schema({
 
    Academy:{
        type:String,
        required:true
    },
 Name: {
     type: String,
     required:true
 },
 Position: {
     type:String,
     required:true
 },
  
 CurrentClub: {
     type: String, 
     required: true
 },
 League: {
     type:String,
     required:true
 },
 MarketValue: {
    type:Number,
    required:true
},
Appearances: {
    tybe:Number,
    default:false
},
Goals: {
    type: Number,
    required:true
},
Assists: {
    type:Number,
    required:true
}


 },{collection: 'players'});




            

 module.exports = mongoose.model('players', Player);