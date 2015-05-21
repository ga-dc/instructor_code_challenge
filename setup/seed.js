//Load the seeds to the db

var orm = require("../orm.js");
orm.connect(seed);

function seed() {
	var Favorite = orm.Favorite
	removeFavorites(function(){
		seedFavorites(function(){
			Favorite.count({}, function (err, favoriteCount) {
				if (err) return handleError(err);
				console.log("Seeded", favoriteCount, "favorites.")
				console.log("Done.")
			});
		});
	});

	function removeFavorites(callback){
		console.log("Removing all favorites...")
		Favorite.remove({}, function(err){
			if (err) return handleError(err);
			Favorite.count({}, function( err, favoriteCount ){
				if (err) return handleError(err);
				console.log("Remaining favorites:", favoriteCount)
				callback();
			})
		});
	}

	function seedFavorites(callback){
		var favoriteData = [
		{ name: "Something",
			oid: 1},
		{ name: "Something else",
			oid: 2},
		{ name: "Lalala",
			oid: 45},
		{ name: "Hope this works",
			oid: 10}
		]

		console.log("Seeding...")
		Favorite.create(favoriteData, function(err) {
			if (err) return handleError(err);
			callback();
		});
	}
}









