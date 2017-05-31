(function() {

	var 
	createClass = function(inherits, constructor) {
		
		var prototypeProxy = function() {};
		
		prototypeProxy.prototype = inherits.prototype;
		
		constructor.prototype = new prototypeProxy();
		
		constructor.constructor = constructor.prototype.constructor = constructor;
		constructor.inherits = constructor.prototype.inherits = inherits;
		constructor.proto = constructor.prototype.proto = proto;
		constructor.prototype.prototype = constructor.prototype;

		return constructor;
		
	},
	proto = function(key, value) {
		
		this.prototype[key] = value;
		return value;
		
	},
	createStatic = function(constructor) {

		return new constructor();

	};
	
	ROCK = createStatic(createClass(Object, function ROCK() {}));
	ROCK.proto("createClass", createClass);
	ROCK.proto("createStatic", createStatic);

})();