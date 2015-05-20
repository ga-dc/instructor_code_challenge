var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codechallenge');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connection started on database:", db.name)
});

var favoriteSchema = mongoose.Schema({
    oid: String,
    name: String
},{ versionKey: false })

var Favorite = mongoose.model('Favorite', favoriteSchema);

app.get('/favorites', function(req, res){
  var query = Favorite.find({});
    query.select("-_id oid name");
    query.exec(function (err, favorites) {
      // if (err) return handleError(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(favorites);
    })
});
//
// app.get('/favorites', function(req, res){
//    console.log("looking for favorites...")
//    Favorite.find({}), function (err, data)
//    {
//         if (err) console.log(err);
//         else {
//             console.log(data);
//         }
//       }
//     });
app.post('/favorites', function(req, res){
Favorite.create(req.body, function(err, favorites) {
  if (err) return handleError(err);
  res.setHeader('Content-Type', 'application/json');
  res.send(favorites);
})
})
//app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('/favorites', function(req, res){
//   var data = fs.readFileSync('./data.json');
//   res.setHeader('Content-Type', 'application/json');
//   res.send(data);
// });

// app.post('/favorites', function(req, res){
//   if(!req.body.name || !req.body.oid){
//     res.send("Error");
//     return
//   }
  // var data = JSON.parse(fs.readFileSync('./data.json'));
  // data.push(req.body);
  // fs.writeFile('./data.json', JSON.stringify(data));
//   res.setHeader('Content-Type', 'application/json');
//   res.send(data);
// });

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
