(function() {

	var SORT = ROCK.prop("SORT", ROCK.createClass("STATIC", Object, function SORT() {}));
	SORT.prop("NUMBER_ASCENDING", function(prop) {
		return function(a, b) {
			return a[prop]-b[prop];	
		};
	});
	SORT.prop("NUMBER_DESCENDING", function(prop) {
		return function(a, b) {
			return b[prop]-a[prop];
		};
	});
	SORT.prop("STRING_ASCENDING", function(prop) {
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
	SORT.prop("STRING_DESCENDING", function(prop) {	
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