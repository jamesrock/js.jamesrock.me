(function() {
	
	var Collection = ROCK.defineClass("PUBLIC", "DYNAMIC", "Collection", ROCK.createClass(Array, function Collection() {}));
	Collection.setProp("getItemByKeyValue", function(key, value) {
			
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
	Collection.setProp("getItemsByKeyValue", function(key, value) {
	
		return this.filter(function(item) {
			
			return item[key]===value;
			
		});
		
	});
	Collection.setProp("append", function(item) {
		
		this.push(item);
		return item;
		
	});
	Collection.setProp("prepend", function(item) {
		
		this.unshift(item);
		return item;
		
	});
	Collection.setProp("exists", function(value) {
	
		return (this.indexOf(value)>-1);
		
	});
	Collection.setProp("filter", function(fn) {
		
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
	Collection.setProp("each", function(fn) {
	
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
	Collection.setProp("getRandom", function(min, max) {
		
		max = (max||(this.length-1));
		return this[ROCK.NUMBER.getRandom(min, max)];
		
	});
	Collection.setProp("remove", function(item) {
			
		return this.removeAt(this.getIndexOf(item));
		
	});
	Collection.setProp("removeAt", function(index) {
		
		this.splice(index, 1);
		return this;
	
	});
	Collection.setProp("addAt", function(item, index) {
			
		this.splice(index, 0, item);
		return item;
		
	});
	Collection.setProp("first", function() {
			
		return this[0];
		
	});
	Collection.setProp("last", function() {
			
		return this[this.length-1];
		
	});
	Collection.setProp("swap", function(aIndex, bIndex) {
		
		var 
		aProp = this[aIndex],
		bProp = this[bIndex];
		
		this[aIndex] = bProp;
		this[bIndex] = aProp;
		
		return this;
		
	});

})();