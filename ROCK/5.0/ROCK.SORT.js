(function() {

	var SORT = ROCK.SORT = {};
	SORT.NUMBER_ASCENDING = function(prop) {
		return function(a, b) {
			return prop.call(a)-prop.call(b);
		};
	};
	SORT.NUMBER_DESCENDING = function(prop) {
		return function(a, b) {
			return prop.call(b)-prop.call(a);
		};
	};
	SORT.STRING_ASCENDING = function(prop) {
		return function(a, b) {
			if(prop.call(a)<prop.call(b)) {
				return -1;
			}
			else if(prop.call(a)>prop.call(b)) {
				return 1;
			}
			else {
				return 0;
			};
		};
	};
	SORT.STRING_DESCENDING = function(prop) {	
		return function(a, b) {
			if(prop.call(b)<prop.call(a)) {
				return -1;
			}
			else if(prop.call(b)>prop.call(a)) {
				return 1;
			}
			else {
				return 0;
			};
		};
	};
	
})();