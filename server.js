var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instructor_code_challenge');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connection established to: ", db.name)
});

var favoriteSchema = mongoose.Schema({
  oid: String,
  name: String
}, {versionKey: false})

var Favorite = mongoose.model('Favorite', favoriteSchema);

app.get('/favorites', function(req, res){
    var favoriteFind = Favorite.find({});
      favoriteFind.select('-_id oid name');
      favoriteFind.exec(function (err, favorites) {
      if (err) return handleError(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(favorites);
    })
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return
  }
  Favorite.create(req.body, function (err, favorite) {
    if (err) return handleError(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(favorite);
  })
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
