(function() {
	
	var Collection = ROCK.prop("Collection", ROCK.createClass("DYNAMIC", Array, function Collection() {}));
	Collection.prop("getItemByKeyValue", function(key, value) {
			
		var
		target = this,
		loop = target.length,
		_return,
		item;
		
		while(loop--) {
		
			item = target[loop];
			
			if(item[key]===value) {
				
				_return = item;
				break;
				
			};
		
		};
		
		return _return;
		
	});
	Collection.prop("getItemsByKeyValue", function(key, value) {
	
		return this.filter(function(item) {
			
			return item[key]===value;
			
		});
		
	});
	Collection.prop("append", function(item) {
		
		this.push(item);
		return item;
		
	});
	Collection.prop("prepend", function(item) {
		
		this.unshift(item);
		return item;
		
	});
	Collection.prop("exists", function(value) {
	
		return (this.indexOf(value)>-1);
		
	});
	Collection.prop("filter", function(fn) {
		
		var 
		_return = new this.constructor(),
		value;
		
		this.each(function(item) {
			
			value = fn(item, _return);
			
			if(value===true) {
				
				_return.push(item);
				
			}
			else if(value==="break") {
				
				return "break";
			
			};
			
		});
		
		return _return;
		
	});
	Collection.prop("each", function(fn) {
	
		var 
		loop = this.length,
		inc = 0,
		value;
		
		while(inc<loop) {
			value = fn(this[inc], inc);
			if(value==="break") {
				break;
			};
			inc ++;
		};
		
		return this;
		
	});
	Collection.prop("getRandom", function(min, max) {
		
		max = (max||(this.length-1));
		return this[ROCK.NUMBER.getRandom(min, max)];
		
	});
	Collection.prop("remove", function(item) {
			
		return this.removeAt(this.getIndexOf(item));
		
	});
	Collection.prop("removeAt", function(index) {
		
		this.splice(index, 1);
		return this;
	
	});
	Collection.prop("addAt", function(item, index) {
			
		this.splice(index, 0, item);
		return item;
		
	});
	Collection.prop("first", function() {
			
		return this[0];
		
	});
	Collection.prop("last", function() {
			
		return this[this.length-1];
		
	});
	Collection.prop("swap", function(aIndex, bIndex) {
		
		var 
		aProp = this[aIndex],
		bProp = this[bIndex];
		
		this[aIndex] = bProp;
		this[bIndex] = aProp;
		
		return this;
		
	});

})();