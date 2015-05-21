//Various requirements
var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');

//Requiring db connection and Favorite schema/model
var orm = require('./orm.js');
orm.connect(main);

var favoriteService = require('./services/favorite-service');

function main(){
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());

  app.use('/', express.static(path.join(__dirname, 'public')));

  app.get('/favorites', function(req, res){
    var data = fs.readFileSync('./data.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });

  app.post('/favorites', function(req, res){
    favoriteService.addFavorite(req.body, function(err){ 
      if (err) {
      res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'")};
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

}
