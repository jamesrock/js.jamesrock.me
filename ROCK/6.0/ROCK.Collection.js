(function() {
	
	ROCK.Collection = ROCK.Array.extend({
		constructor: function Collection() {
			
		},
		getItemByKeyValue: function(key, value) {

			return this.filter(function(item) {
				
				return item[key]===value;
				
			})[0];
			
		},
		getItemsByKeyValue: function(key, value) {
	
			return this.filter(function(item) {
				
				return item[key]===value;
				
			});
			
		},
		append: function(item) {
		
			this.push(item);
			return item;
			
		},
		prepend: function(item) {
		
			this.unshift(item);
			return item;
			
		},
		exists: function(value) {
	
			return (this.indexOf(value)>-1);
			
		},
		filter: function(callback) {
		
			var 
			_return = new this.constructor(),
			value;
			
			this.each(function(item) {
				
				value = callback(item, _return);
				
				if(value===true) {
					_return.push(item);
				};

				return value;
				
			});
			
			return _return;
			
		},
		each: function(callback) {
		
			var 
			count = this.length,
			loop = 0,
			value;
			
			while(loop<count) {
				value = callback(this[loop], loop);
				if(value==="break") {
					break;
				};
				loop ++;
			};
			
			return this;
			
		},
		random: function(min, max) {
		
			max = (max||(this.length-1));
			return this[ROCK.MATH.random(min, max)];
			
		},
		remove: function(item) {
			
			return this.removeAt(this.getIndexOf(item));
			
		},
		removeAt: function(index) {
		
			this.splice(index, 1);
			return this;
		
		},
		addAt: function(item, index) {
			
			this.splice(index, 0, item);
			return item;
			
		},
		first: function() {
			
			return this[0];
			
		},
		last: function() {
			
			return this[this.length-1];
			
		},
		swap: function(aIndex, bIndex) {
		
			var 
			aProp = this[aIndex],
			bProp = this[bIndex];
			
			this[aIndex] = bProp;
			this[bIndex] = aProp;
			
			return this;
			
		}
	});

})();