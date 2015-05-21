var Favorite = require('../orm.js').Favorite;

exports.addFavorite = function(favorite, next) {
	var newFavorite = new Favorite({
		name: favorite.name,
		oid: favorite.oid
	});

	newFavorite.save(function(err){
		if (err) {
			return next(err);
		}
		next(null);
	});
};