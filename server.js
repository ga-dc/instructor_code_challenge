var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instructor_code_challenge');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connection established to: ", db.name)
});

var favoriteSchema = mongoose.Schema({
  name: String,
  oid: String
})

var Favorite = mongoose.model('Favorite', favoriteSchema)

app.get('/favorites', function(req, res){
  var favs = Favorite.find({});
  favs.select('-_id oid name');
  favs.exec(function(err, favs){
    if(err) return handleError(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(favs);
  })
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return
  }

  Favorite.create(req.body, function(err, fav){
    if(err) return handleError(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(fav);
  });
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
