// var express = require('express');
// var app = express();
// var bodyParser = require("body-parser")
// // var fs = require('fs'); *delete
// var path = require('path'); *down
// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/movies");
//
// **static down
//
//
// // app.get('/favorites', function(req, res){
//   // var data = fs.rea **down
// // });
//
// // app.post('/favorites', function(req, res){
// //   if(!req.body.name || !req.body.oid){
// //     res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
// //     return
// //   }
// //
// // });
//
// app.listen(3000, function(){
//   console.log("Listening on port 3000");
// });


var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/movies");

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//   console.log("Connection established to:", db.name)
// });
//
//
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function( callback ){
  console.log("Connection established to ", db.name);
});

var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// schema
var movieSchema = mongoose.Schema({
  oid: Number,
  name: String
  },
  // {versionKey: false}
  {versionKey: false}
);
// var restaurantSchema = mongoose.Schema({
//   name: String,
//   yelp: String,
//   address: {
//     street: String,
//     zipcode: Number
//   },
//   state: String
// })

// constructor
var Movie = mongoose.model("Movie", movieSchema);

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  Movie.find().lean().exec(function(err, movies){
    res.setHeader('Content-Type', 'application/json');
    res.send(movies)
  });
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
  }
  var newMovie = Movie.create({
    oid: req.body.oid,
    name: req.body.name
  }, function(err, movie){
    res.send({oid: movie.oid, name: movie.name});
  });
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
