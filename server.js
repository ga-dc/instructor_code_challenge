var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var path = require('path');
var db = require("./config/db")
var Favorite = require("./models/favorite")(db)

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/favorites', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  Favorite.find({},function( err, favorites ){
    res.send(favorites);
  })
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return
  }
  Favorite.create({
    name: req.body.name,
    oid: req.body.oid
  }, function( err, favorite ){
    res.setHeader('Content-Type', 'application/json');
    res.send(favorite);
  })
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
