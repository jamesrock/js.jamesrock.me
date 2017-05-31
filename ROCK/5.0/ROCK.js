(function() {

	var 
	extend = function(props) {

		var Class = ROCK.createClass(this, props.constructor);

		for(var prop in props) {
			Class.prototype[prop] = props[prop];
		};

		return Class;

	},
	createClass = function(_extends, constructor) {
		
		var prototypeProxy = function() {};
		
		prototypeProxy.prototype = _extends.prototype;
		
		constructor.prototype = new prototypeProxy();
				
		constructor.constructor = constructor.prototype.constructor = constructor;
		constructor.extends = constructor.prototype.extends = _extends;
		constructor.extend = constructor.prototype.extend = extend;

		return constructor;
		
	};
	
	ROCK = {};
	ROCK.createClass = createClass;

})();