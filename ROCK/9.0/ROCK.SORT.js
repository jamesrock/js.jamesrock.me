(function() {

	ROCK.SORT = {
		NUMBER_ASCENDING: function(prop) {
			return function(a, b) {
				return prop.call(a)-prop.call(b);
			};
		},
		NUMBER_DESCENDING: function(prop) {
			return function(a, b) {
				return prop.call(b)-prop.call(a);
			};
		},
		STRING_ASCENDING: function(prop) {
			return function(a, b) {
				a = prop.call(a);
				b = prop.call(b);
				if(a<b) {
					return -1;
				}
				else if(a>b) {
					return 1;
				}
				else {
					return 0;
				};
			};
		},
		STRING_DESCENDING: function(prop) {
			return function(a, b) {
				a = prop.call(a);
				b = prop.call(b);
				if(b<a) {
					return -1;
				}
				else if(b>a) {
					return 1;
				}
				else {
					return 0;
				};
			};
		},
		SHUFFLE: function(prop) {
			return function() {
				return ROCK.MATH.random(-1, 1);
			};
		}
	};

})();
