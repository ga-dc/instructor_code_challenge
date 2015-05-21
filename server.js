var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/milk-and-cookies');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connection established to: ", db.name)
});


app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

var favoriteSchema = mongoose.Schema({
    oid: String,
    name: String,
})

var Favorite = mongoose.model('Favorite', favoriteSchema);


app.get('/favorites', function(req, res){
  Favorite.find({}, function (err, favorites) {
    if (err) return handleError(err);
    res.send(favorites)
  })
});

app.post('/favorites', function(req, res){
  var newFave = new Favorite({});
   newFave.save(function(err) {
     if(!req.body.name || !req.body.oid){
       res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
       return
     }
   });

  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
