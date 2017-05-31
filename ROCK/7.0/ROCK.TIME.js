(function() {

	var 
	second = 1000,
	minute = (second * 60),
	hour = (minute * 60),
	day = (hour * 24),
	year = (day * 365);
	
	ROCK.TIME = {
		getMilliseconds: function(time) {
			return time;
		},
		getSeconds: function(time) {
			return ROCK.MATH.truncate(time/second);
		},
		getMinutes: function(time) {
			return ROCK.MATH.truncate(time/minute);
		},
		getHours: function(time) {
			return ROCK.MATH.truncate(time/hour);
		},
		getDays: function(time) {
			return ROCK.MATH.truncate(time/day);
		},
		getYears: function() {
			return ROCK.MATH.truncate(time/year);
		},
		getMillisecondsInDay: function(time) {
			// return (this.getMilliseconds(time)%1000);
		},
		getMillisecondsInMinute: function(time) {
			return (this.getMilliseconds(time)%1000);
		},
		getSecondsInDay: function(time) {
			// return (this.getSeconds(time)%60);
		},
		getSecondsInMinute: function(time) {
			return (this.getSeconds(time)%60);
		},
		getMinutesInDay: function(time) {
			return (this.getMinutes(time)%60);
		},
		getHoursInDay: function(time) {
			return (this.getHours(time)%24);
		}
	};

})();
