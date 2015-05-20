var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/milk-n-cookies');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


var favoriteSchema = mongoose.Schema({
  oid: Number,
  name: String
});

console.log('Favorites schema as follow:', Object.keys(favoriteSchema.paths));

var Favorite = mongoose.model('Favorite', favoriteSchema);
var connect = function(callback){
    db.once('open', function(callback){
      console.log('connection established to:', db.name);
    });
  }


module.exports ={
  connect: connect,
  Favorite: Favorite
}