var buildCatString = function(items, version) {

	var
	catString = [
		"ROCK.js"
	];

	for(var item in items) {
		catString.push("ROCK." + items[item] + ".js");
	};

	return ("cat " + catString.join(" ") + " > ROCK-" + version + ".js");

};

copy(buildCatString([
	"Collection",
	"NUMBER",
	"SORT",
	"HTTP",
	"GUID",
	"DOM",
	"JQUERY"
], "2.0"));
