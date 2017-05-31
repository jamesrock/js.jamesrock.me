(function() {
	
	var Collection = ROCK.Collection = ROCK.createClass(Array, function Collection() {});
	Collection.prototype.getItemByKeyValue = function(key, value) {

		return this.filter(function(item) {
			
			return item[key]===value;
			
		})[0];
		
	};
	Collection.prototype.getItemsByKeyValue = function(key, value) {
	
		return this.filter(function(item) {
			
			return item[key]===value;
			
		});
		
	};
	Collection.prototype.append = function(item) {
		
		this.push(item);
		return item;
		
	};
	Collection.prototype.prepend = function(item) {
		
		this.unshift(item);
		return item;
		
	};
	Collection.prototype.exists = function(value) {
	
		return (this.indexOf(value)>-1);
		
	};
	Collection.prototype.filter = function(callback) {
		
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
		
	};
	Collection.prototype.each = function(callback) {
	
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
		
	};
	Collection.prototype.random = function(min, max) {
		
		max = (max||(this.length-1));
		return this[ROCK.MATH.random(min, max)];
		
	};
	Collection.prototype.remove = function(item) {
			
		return this.removeAt(this.getIndexOf(item));
		
	};
	Collection.prototype.removeAt = function(index) {
		
		this.splice(index, 1);
		return this;
	
	};
	Collection.prototype.addAt = function(item, index) {
			
		this.splice(index, 0, item);
		return item;
		
	};
	Collection.prototype.first = function() {
			
		return this[0];
		
	};
	Collection.prototype.last = function() {
			
		return this[this.length-1];
		
	};
	Collection.prototype.swap = function(aIndex, bIndex) {
		
		var 
		aProp = this[aIndex],
		bProp = this[bIndex];
		
		this[aIndex] = bProp;
		this[bIndex] = aProp;
		
		return this;
		
	};

})();