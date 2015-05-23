
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instructor_code_challenge');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// With Mongoose, everything is derived from a Schema.
var favoriteSchema = mongoose.Schema({
  oid: String,
  name: String
})

console.log("Favorites look like this:", Object.keys(favoriteSchema.paths))

// define our model
var Favorite = mongoose.model('Favorite', favoriteSchema);

// public interface
module.exports = {
  connect: function(callback){
    db.once('open', function(){
      console.log("Connection established to: ", db.name)
      callback()
    });
  },
  Favorite: Favorite
}
