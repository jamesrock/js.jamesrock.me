(function() {
	
	var NUMBER = ROCK.prop("NUMBER", ROCK.createClass("STATIC", Object, function NUMBER() {}));
	NUMBER.prop("getRandom", function(min, max) {
		
		min = (min||0);
		max = (max||100);
		max = (max+1);
		
		return Math.floor(Math.random()*(max-min)+min);
	
	});
	NUMBER.prop("toHundredth", function(number) {
		
		return this.roundTo(number, 100);
	
	});
	NUMBER.prop("floorTo", function(number, to) {
		
		return (Math.floor(number*to)/to);
	
	});
	NUMBER.prop("roundTo", function(number, to) {
		
		return (Math.round(number*to)/to);
	
	});
	NUMBER.prop("ceilTo", function(number, to) {
		
		return (Math.ceil(number*to)/to);
	
	});
	NUMBER.prop("toCurrency", function(number) {
		
		return number.toFixed(2);
	
	});
	NUMBER.prop("getXPercentOfY", function(x, y) {
		
		return (y*(x/100));
	
	});
	NUMBER.prop("getXAsPercentOfY", function(x, y) {
		
		return ((x/y)*100);
	
	});
	
})();