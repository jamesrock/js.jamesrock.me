(function() {

	var 
	createClass = function(inherits, constructor) {
		
		var 
		pw = function() {},
		i = inherits,
		c = constructor,
		p;
		
		pw.prototype = i.prototype;
		
		p = c.prototype = new pw();
		c.prototype.constructor = c;
		c.prototype.prototype = p;
		c.inherits = p.inherits = i;
		c.defineClass = p.defineClass = defineClass;
		c.setProp = p.setProp = setProp;

		return c;
		
	},
	defineClass = function(exposure, type, name, _class) {
		
		var 
		_return = _class;
		
		if(type==="STATIC") {
			_return = new _return();
		};
		
		if(exposure==="PUBLIC") {
			this.setProp(name, _return);
		};
		
		return _return;
		
	},
	setProp = function(key, value) {
		
		this.prototype[key] = value;
		return this;
		
	};
	
	ROCK = createClass2("STATIC", Object, function ROCK() {});
	ROCK.setProp("createClass", createClass);

})();