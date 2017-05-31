(function() {

	var SORT = ROCK.defineClass("PUBLIC", "STATIC", "SORT", ROCK.createClass(Object, function SORT() {}));
	SORT.setProp("NUMBER_ASCENDING", function(prop) {
		return function(a, b) {
			return a[prop]-b[prop];	
		};
	});
	SORT.setProp("NUMBER_DESCENDING", function(prop) {
		return function(a, b) {
			return b[prop]-a[prop];
		};
	});
	SORT.setProp("STRING_ASCENDING", function(prop) {
		return function(a, b) {
			if(a[prop]<b[prop]) {
				return -1;
			}
			else if(a[prop]>b[prop]) {
				return 1;
			}
			else {
				return 0;
			};
		};
	});
	SORT.setProp("STRING_DESCENDING", function(prop) {	
		return function(a, b) {
			if(b[prop]<a[prop]) {
				return -1;
			}
			else if(b[prop]>a[prop]) {
				return 1;
			}
			else {
				return 0;
			};
		};
	});
	
})();