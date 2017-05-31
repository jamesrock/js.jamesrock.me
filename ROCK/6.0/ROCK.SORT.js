(function() {

	ROCK.SORT = {
		NUMBER: {
			ASCENDING: function(prop) {
				return function(a, b) {
					return prop.call(a)-prop.call(b);
				};
			},
			DESCENDING: function(prop) {
				return function(a, b) {
					return prop.call(b)-prop.call(a);
				};
			}
		},
		STRING: {
			ASCENDING: function(prop) {
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
			},
			DESCENDING: function(prop) {	
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
			}
		}
	};
	
})();