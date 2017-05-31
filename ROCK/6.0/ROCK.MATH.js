(function() {
	
	ROCK.MATH = {
		random: function(min, max) {
		
			min = (min||0);
			max = (max||100);
			max = (max+1);
			
			return Math.floor(Math.random()*(max-min)+min);
		
		},
		floorTo: function(number, to) {
		
			return (Math.floor(number*to)/to);
		
		},
		roundTo: function(number, to) {
			
			return (Math.round(number*to)/to);
		
		},
		ceilTo: function(number, to) {
			
			return (Math.ceil(number*to)/to);
		
		},
		toCurrency: function(number) {
			
			return number.toFixed(2);
		
		},
		getXPercentOfY: function(x, y) {
			
			return (y*(x/100));
		
		},
		getXAsPercentOfY: function(x, y) {
			
			return ((x/y)*100);
		
		},
		truncate: function(number) {
			
			return number<0?this.ceilTo(number, 1):this.floorTo(number, 1);

		}
	};
	
})();