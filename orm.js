var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instructor_challenge');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var favoriteSchema = mongoose.Schema({
  oid: Number,
  name: String
});

var Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = {
  connect: function(callback){
    db.once('open', function(){
      console.log("Connection established to: ", db.name);
      callback();
    });
  },
  Favorite: Favorite
};