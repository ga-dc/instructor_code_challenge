var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/icc');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connection established to: ", db.name)
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));


// 1. Define schema
var favoriteSchema = mongoose.Schema({
    old: Number,
    name: String
})

// 2. Insantiate model
var Favorite = mongoose.model('Favorite', favoriteSchema);

app.get('/favorites', function(req, res){
  Favorite.find(function(err, favorites){
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(favorites);
       } 
     else {
      return console.log(err);
    }
  });




});

app.post('/favorites', function(req, res){
    var newFavorite = Favorite.create({
      oid: req.body.oid, 
      name: req.body.name
    }), 
  res.setHeader('Content-Type', 'application/json');
  res.send(newFavorite);
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
