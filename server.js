
var express = require('express');
var app = express();
var bodyParser = require("body-parser")

var fs = require('fs');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/milk-n-cookies");


var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/milk-n-cookies");


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  console.log("Connection established to to:", db.name)
})

var movieSchema = mongoose.Schema({
  name: String,
  oid: Number
})

var Movie = mongoose.model("Movie", movieSchema);

 

// app.use(express.static(path.join(__dirname, '/public')));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());

// app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  Movie.find(function(err, Movie){
                  if(err)return console.error(err);
                  res.send( Movie) ;
                })
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    
  }
  var new_movie = new Movie({name: req.body.name, oid: req.body.oid})
  res.send(new_movie);

  new_movie.save(function(err, movie){
   if (err) return console.error(err);
  })



app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    
  }
  var new_movie = new Movie({name: req.body.name, oid: req.body.oid})
  res.send(new_movie);

  new_movie.save(function(err, movie){
   if (err) return console.error(err);
  })

});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
