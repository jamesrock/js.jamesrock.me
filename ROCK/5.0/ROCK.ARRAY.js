(function() {
	
	var ARRAY = ROCK.ARRAY = {};
	ARRAY.getItemByKeyValue = function(collection, key, value) {
		
		return this.filter(collection, function(item) {
			
			return item[key]===value;
			
		})[0];

	};
	ARRAY.getItemsByKeyValue = function(collection, key, value) {
		
		return this.filter(collection, function(item) {
			
			return item[key]===value;
			
		});

	};
	ARRAY.filter = function(collection, callback) {
		
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

	};
	ARRAY.each = function(collection, callback) {

		var 
		count = collection.length,
		loop = 0,
		value;
		
		while(loop<count) {
			value = callback(collection[loop], loop);
			if(value==="break") {
				break;
			};
			loop ++;
		};
		
		return collection;

	};
	ARRAY.random = function(collection, min, max) {

		max = (max||(collection.length-1));
		return collection[ROCK.MATH.random(min, collection.length-1)];

	};

})();