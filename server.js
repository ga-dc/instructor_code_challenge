var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/favorites');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//once is the method that creates a connection to the db
db.once('open', function (callback){
  //from here we are in an open connection to the database
  console.log("Connection established to: ", db.name)
})

var favoritesSchema = mongoose.Schema({
    name: String,
    oid: Number
})

var Favorites = mongoose.model('favorites', favoritesSchema);
// var Restaurant = mongoose.model('Restaurant', restaurantSchema);

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));


app.get('/favorites', function(req, res){
  // var data = fs.readFileSync('./data.json');
  // res.setHeader('Content-Type', 'application/json');
  // res.send(data);
  // allFavorites = db.favorites.find()
  Favorites.find({}, '-_id oid name', function(err, results) {
    res.send(results)
  })


  // var query = Favorites.find({});
  // query.select('-_id name occupation');
  // query.exec(function (err, person) {
  //    if (err) return handleError(err);
  //    res.send(results)
  // })
})

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return
  }

  Favorites.create({ name: req.body.name, oid: req.body.oid }, function (err, favorites) {
    if (err) return handleError(err);
    Favorites.find({}, function(err, results) {
      if (err) return handleError(err);
      res.send(results)
    })
  })
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
