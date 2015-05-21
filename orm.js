var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/insturctorChallenge')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//   console.log("Connection established to: ", db.name)
// })

var favoriteSchema = mongoose.Schema({
  oid: String,
  name: String
})

var Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = {
  connect: function(callback){
    db.once('open', function(){
      console.log("Connection established to: ", db.name)
      callback()
    });
  },
  Favorite: Favorite
}


// var newFavorite = ({ oid: req.body.name, name: req.body.oid}, funciton (err, favorite){
//   if (err) return handleError(err);
//   console.log(favorite.name)
// })
