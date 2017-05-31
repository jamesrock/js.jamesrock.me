(function() {

	var 
	createClass = function(type, inherits, constructor) {
		
		var 
		pw = function() {},
		i = inherits,
		c = constructor,
		p;
		
		pw.prototype = i.prototype;
		
		p = c.prototype = new pw();
		p.prototype = p;
		c.constructor = p.constructor = c;
		c.inherits = p.inherits = i;
		c.prop = p.prop = prop;

		if(type==="STATIC") {
			c = new c();
		};

		return c;
		
	},
	prop = function(key, value) {
		
		this.prototype[key] = value;
		return value;
		
	};
	
	ROCK = createClass("STATIC", Object, function ROCK() {});
	ROCK.prop("createClass", createClass);

})();