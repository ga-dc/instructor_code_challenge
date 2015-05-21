//Require mongoose and establish db connection
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/instructor-code");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//Define Favorite schema
var Schema = mongoose.Schema;

var favoriteSchema = mongoose.Schema({
  name: String,
  oid: Number
});

//Define Favorite model
var Favorite = mongoose.model('Favorite', favoriteSchema);

//Public interface
module.exports = {
  connect: function(callback){
    db.once('open', function(){
      console.log("Connection established to: ", db.name)
      callback()
    });
  },
  Favorite: Favorite
}