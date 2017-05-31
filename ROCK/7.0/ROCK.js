(function() {

	var 
	extend = function(proto) {

		var 
		context = this,
		constructor = proto.constructor,
		_class;

		if(!proto.hasOwnProperty("constructor")) {
			constructor = function() {
				return context.apply(this, arguments);
			};
		};

		_class = createClass(this, constructor);

		for(var prop in proto) {
			_class.prototype[prop] = proto[prop];
		};

		return _class;

	},
	createClass = function(_extends, constructor) {
		
		var proxy = function() {};
		
		proxy.prototype = _extends.prototype;
		
		constructor.prototype = new proxy();

		constructor.constructor = constructor.prototype.constructor = constructor;
		constructor.extends = constructor.prototype.extends = _extends;
		constructor.extend = constructor.prototype.extend = extend;
		
		return constructor;
		
	};
	
	ROCK = {
		"Object": createClass(Object, function() {

			throw("An instance of ROCK.Object cannot be created. Use ROCK.Object.extend();");

		}),
		"Array": createClass(Array, function() {

			throw("An instance of ROCK.Array cannot be created. Use ROCK.Array.extend();");

		})
	};

})();
