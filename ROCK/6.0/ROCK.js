(function() {

	var 
	extend = function(proto) {

		var Class = createClass(this, proto.constructor);

		for(var prop in proto) {
			Class.prototype[prop] = proto[prop];
		};

		return Class;

	},
	createClass = function(extendsClass, constructor) {
		
		var prototypeProxy = function() {};
		
		prototypeProxy.prototype = extendsClass.prototype;
		
		constructor.prototype = new prototypeProxy();

		constructor.extends = constructor.prototype.extends = extendsClass;
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