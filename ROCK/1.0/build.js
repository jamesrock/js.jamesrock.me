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
	"DOM",
	"GUID",
	"HTTP",
	"JQUERY",
	"NUMBER",
	"SORT",
], "1.0"));
