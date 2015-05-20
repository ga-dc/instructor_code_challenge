var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');
var orm = require('./orm.js');
orm.connect();
var Favorite = orm.Favorite;

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  Favorite.find({}, function(err, favorites){
    if(err){
      console.error('Error Saving', err);
      res.send('Error fetching');
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.send(favorites);
    }
  });
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return
  }
  Favorite.create({oid: req.body.oid, name: req.body.name}, function(err, newFavorite){
    if(err){
      console.error('Error Saving', err);
      res.send('Error saving');
    }else{
      res.send(newFavorite);
    }
  });
});

  app.listen(3000, function(){
    console.log("Listening on port 3000");
  });

