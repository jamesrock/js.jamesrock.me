(function() {
	
	ROCK.MATH = {
		random: function(min, max) {

			return (Math.floor(Math.random()*((max-min)+1))+min);
		
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
		getXPercentOfY: function(x, y) {
			
			return (y*(x/100));
		
		},
		getXAsPercentOfY: function(x, y) {
			
			return ((x/y)*100);
		
		},
		truncate: function(number) {
			
			return number<0?this.ceilTo(number, 1):this.floorTo(number, 1);

		},
		factorial: function(i) {

			var 
			o = i;

			while(i>1&&i--) {
				o = (o*i);
			};

			return o;

		},
		oddsToMultiplier: function(a, b) {
		
			var
			c = (a+b),
			d = (c/b);
			
			return d;
			
		}
	};
	
})();
