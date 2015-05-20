var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instructor_code_challenge');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// 
// app.use('/', express.static(path.join(__dirname, 'public')));

var favoriteSchema = mongoose.Schema({
  oid: String,
  name: String
})

var Favorite = mongoose.model('Favorite', favoriteSchema);
console.log("Favorites look like " + Object.keys(favoriteSchema.paths));

app.get('/favorites', function(req, res){
  var query = Favorite.find({});
  console.log("Here's the " + query);
  query.select('-_id oid name');
  query.exec(function (err, fav) {
    if (err) return handleError(err);
    console.log(fav)
    res.setHeader('Content-Type', 'application/json');
    res.send(fav);
  });
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return
  }
  Favorite.create(req.body, function(err, fav){
    if (err) return handleError(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(fav);
  })

});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
