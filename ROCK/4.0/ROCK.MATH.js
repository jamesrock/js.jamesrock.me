(function() {
	
	var MATH = ROCK.proto.MATH = ROCK.createStatic(ROCK.createClass(Object, function MATH() {}));
	MATH.proto.getRandom = function(min, max) {
		
		min = (min||0);
		max = (max||100);
		max = (max+1);
		
		return Math.floor(Math.random()*(max-min)+min);
	
	};
	MATH.proto.toHundredth = function(number) {
		
		return this.roundTo(number, 100);
	
	};
	MATH.proto.floorTo = function(number, to) {
		
		return (Math.floor(number*to)/to);
	
	};
	MATH.proto.roundTo = function(number, to) {
		
		return (Math.round(number*to)/to);
	
	};
	MATH.proto.ceilTo = function(number, to) {
		
		return (Math.ceil(number*to)/to);
	
	};
	MATH.proto.toCurrency = function(number) {
		
		return number.toFixed(2);
	
	};
	MATH.proto.getXPercentOfY = function(x, y) {
		
		return (y*(x/100));
	
	};
	MATH.proto.getXAsPercentOfY = function(x, y) {
		
		return ((x/y)*100);
	
	};
	MATH.proto.truncate = function(number) {
		
		return this.floorTo(number, 1);

	};
	
})();