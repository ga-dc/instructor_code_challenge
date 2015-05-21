module.exports = function( db ){
  var schema = new db.Schema({
    name: String,
    oid: String
  })
  return model = db.model('Favorite', schema)
}
