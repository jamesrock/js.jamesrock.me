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
	"ARRAY",
	"DATE",
	"DOM",
	"GUID",
	"MATH",
	"NUMBER",
	"SORT",
	"TIME",
	"HTTP",
	"JQUERY",
	"LocalStorage"
], "8.0"));
