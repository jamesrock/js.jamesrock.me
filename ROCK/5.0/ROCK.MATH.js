(function() {
	
	var MATH = ROCK.MATH = {};
	MATH.random = function(min, max) {
		
		min = (min||0);
		max = (max||100);
		max = (max+1);
		
		return Math.floor(Math.random()*(max-min)+min);
	
	};
	MATH.toHundredth = function(number) {
		
		return this.roundTo(number, 100);
	
	};
	MATH.floorTo = function(number, to) {
		
		return (Math.floor(number*to)/to);
	
	};
	MATH.roundTo = function(number, to) {
		
		return (Math.round(number*to)/to);
	
	};
	MATH.ceilTo = function(number, to) {
		
		return (Math.ceil(number*to)/to);
	
	};
	MATH.toCurrency = function(number) {
		
		return number.toFixed(2);
	
	};
	MATH.getXPercentOfY = function(x, y) {
		
		return (y*(x/100));
	
	};
	MATH.getXAsPercentOfY = function(x, y) {
		
		return ((x/y)*100);
	
	};
	MATH.truncate = function(number) {
		
		return number<0?this.ceilTo(number, 1):this.floorTo(number, 1);

	};
	
})();