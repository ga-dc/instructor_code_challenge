var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var path = require('path');
var orm = require('./orm.js')
var Favorite = orm.Favorite;

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  var query = Favorite.find({});
    query.select('-_id oid name'); // interface uses oid, not _id
    query.exec(function (err, favorites) {
      if (err) return handleError(err);
      console.log("Found", favorites.length, "favorites.")
      res.setHeader('Content-Type', 'application/json');
      res.send(favorites);
    })

});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return
  }
  //Create a favorite
  Favorite.create(req.body, function (err, favorite) {
    if (err) return handleError(err);
    // saved!
    console.log("We created", favorite.name)

    res.setHeader('Content-Type', 'application/json');
    res.send(favorite);
  })
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
