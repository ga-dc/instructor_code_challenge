var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.render("index", {
      data: JSON.parse(fs.readFileSync('./data.json'))
    });
});

app.post('favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return

    var data = JSON.parse(fs.readFileSync('./data.json'));
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.render("index", {
      data: data
    })
  }
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
