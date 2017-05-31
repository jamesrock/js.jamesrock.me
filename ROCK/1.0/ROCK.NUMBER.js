(function() {
	
	var NUMBER = ROCK.defineClass("PUBLIC", "STATIC", "NUMBER", ROCK.createClass(Object, function NUMBER() {}));
	NUMBER.setProp("getRandom", function(min, max) {
		
		var 
		min = (min||0),
		max = (max||100);
		max = (max+1);
		
		return Math.floor(Math.random()*(max-min)+min);
	
	});
	NUMBER.setProp("toHundredth", function(number) {
		
		return this.roundTo(number, 100);
	
	});
	NUMBER.setProp("floorTo", function(number, to) {
		
		return (Math.floor(number*to)/to);
	
	});
	NUMBER.setProp("roundTo", function(number, to) {
		
		return (Math.round(number*to)/to);
	
	});
	NUMBER.setProp("ceilTo", function(number, to) {
		
		return (Math.ceil(number*to)/to);
	
	});
	NUMBER.setProp("toCurrency", function(number) {
		
		return number.toFixed(2);
	
	});
	NUMBER.setProp("getXPercentOfY", function(x, y) {
		
		return (y*(x/100));
	
	});
	NUMBER.setProp("getXAsPercentOfY", function(x, y) {
		
		return ((x/y)*100);
	
	});
	
})();