var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://localhost/code-challenge')
var db= mongoose.connection

var dataSchema = mongoose.Schema({
  name: String,
  oid: String
})

var Data = mongoose.model('data', dataSchema)

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  // var data = fs.readFileSync('./data.json');
  var list = Data.find({});
    list.select('-_id oid name');
    list.exec(function (err, datas){
      if (err) return handleError(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(datas);
    })


});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return
  }

  Data.create(req.body, function (err, data){
    if (err) return handleError(err);

    res.setHeader('Content-Type', 'application/json');
    res.send(data);

  })
  // var data = JSON.parse(fs.readFileSync('./data.json'));
  // data.push(req.body);
  // fs.writeFile('./data.json', JSON.stringify(data));
  // res.setHeader('Content-Type', 'application/json');
  // res.send(data);
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
