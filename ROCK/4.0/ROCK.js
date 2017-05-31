(function() {

	var 
	createClass = function(inherits, constructor) {
		
		var prototypeProxy = function() {};
		
		prototypeProxy.prototype = inherits.prototype;
		
		constructor.prototype = new prototypeProxy();
		
		constructor.proto = constructor.prototype.proto = constructor.prototype;
		constructor.constructor = constructor.proto.constructor = constructor;
		constructor.inherits = constructor.proto.inherits = inherits;		

		return constructor;
		
	},
	createStatic = function(constructor) {

		return new constructor();

	};
	
	ROCK = createStatic(createClass(Object, function ROCK() {}));
	ROCK.proto.createClass = createClass;
	ROCK.proto.createStatic = createStatic;

})();