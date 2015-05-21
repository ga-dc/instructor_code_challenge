var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var orm = require("./orm.js");
var Favorite = orm.Favorite;


app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', express.static(path.join(__dirname, 'public')));


app.get('/favorites', function(req, res){
  var query = Favorite.find().exec(function(err, favorites){
    res.setHeader('Content-Type', 'application/json');
    res.send(favorites);
  });
});


app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    return res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'"); 
  }

  var favoriteObject = {oid: req.body.oid, name: req.body.name};
  Favorite.create(favoriteObject, function (err, favorite){
    if (err) return handleError(err);

    res.setHeader('Content-Type', 'application/json');
    res.send(favorite);
  });
});


app.listen(3000, function(){
  console.log("Listening on port 3000");
});








