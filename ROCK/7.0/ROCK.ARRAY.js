(function() {
	
	ROCK.ARRAY = {
		getItemByKeyValue: function(collection, key, value) {
		
			return this.filter(collection, function(item) {
				
				return item[key]===value;
				
			})[0];

		},
		getItemsByKeyValue: function(collection, key, value) {
		
			return this.filter(collection, function(item) {
				
				return item[key]===value;
				
			});

		},
		filter: function(collection, callback) {
		
			var 
			_return = new collection.constructor(),
			value;
			
			this.each(collection, function(item) {
				
				value = callback(item, _return);
				
				if(value===true) {
					_return.push(item);
				};

				return value;
				
			});
			
			return _return;

		},
		each: function(collection, callback) {

			var 
			value;

			for(var i=0;i<collection.length;i++) {
				value = callback(collection[i], i);
				if(value==="break") {
					break;
				};
			};
			
			return collection;

		},
		random: function(collection, min, max) {

			max = (max||(collection.length-1));
			return collection[ROCK.MATH.random(min, collection.length-1)];

		},
		pushift: function(collection) {

			collection.push(collection.shift());
			return collection;

		},
		first: function(collection) {
			
			return collection[0];
			
		},
		last: function(collection) {
			
			return collection[collection.length-1];
			
		}
	};

})();
