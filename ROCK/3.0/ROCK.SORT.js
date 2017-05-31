(function() {

	var SORT = ROCK.proto("SORT", ROCK.createStatic(ROCK.createClass(Object, function SORT() {})));
	SORT.proto("NUMBER_ASCENDING", function(prop) {
		return function(a, b) {
			return a[prop]-b[prop];	
		};
	});
	SORT.proto("NUMBER_DESCENDING", function(prop) {
		return function(a, b) {
			return b[prop]-a[prop];
		};
	});
	SORT.proto("STRING_ASCENDING", function(prop) {
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
	SORT.proto("STRING_DESCENDING", function(prop) {	
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