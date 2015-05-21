var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');
var orm = require('./orm.js');
var Favorite = orm.Favorite
//maybe try mongoose.model('Favorite', favoriteSchema)

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  var search = Favorite.find({},"-_id oid name", function(err, favorites){
    if (err) return handleError(err);
    res.send(favorites)
  })
  // var data = fs.readFileSync('./data.json');
  // res.setHeader('Content-Type', 'application/json');
  // res.send(data);
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return
  }
  // var data = JSON.parse(fs.readFileSync('./data.json'));
  // data.push(req.body);
  // fs.writeFile('./data.json', JSON.stringify(data));

  var newFavorite = Favorite.create({ oid: req.body.name, name: req.body.oid}, function(err, favorite){
    if (err) return handleError(err);
    console.log(favorite.name)

    res.setHeader('Content-Type', 'application/json');
    res.send(favorite);
  })

});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
