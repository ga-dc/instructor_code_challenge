var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/code_challenge');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));


var codeSchema = mongoose.Schema({
    oid: Number,
    name: String
});

var Data = mongoose.model("Data", codeSchema);

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  Data.find({},'-_id oid name', function(err, results){
  res.send(results);
  });
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return
  }
  Data.create({oid:req.body.oid, name: req.body.name}, function (err, data) {
    if (err) return handleError(err);
    res.send(data)
  });
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
