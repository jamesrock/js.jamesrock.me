(function() {

	var
	second = 1000,
	minute = (second*60),
	hour = (minute*60),
	day = (hour*24),
	year = (day*365);

	ROCK.TIME = {
		getSecond: function() {
			return second;
		},
		getMinute: function() {
			return minute;
		},
		getHour: function() {
			return hour;
		},
		getDay: function() {
			return day;
		},
		getYear: function() {
			return year;
		},
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
			return (this.getMilliseconds(time)%day);
		},
		getMillisecondsInMinute: function(time) {
			return (this.getMilliseconds(time)%minute);
		},
		getSecondsInDay: function(time) {
			return (this.getSeconds(time)%day);
		},
		getSecondsInMinute: function(time) {
			return (this.getSeconds(time)%minute);
		},
		getMinutesInDay: function(time) {
			return (this.getMinutes(time)%day);
		},
		getHoursInDay: function(time) {
			return (this.getHours(time)%day);
		},
		getDaysInYear: function(time) {
			return (this.getDays(time)%year);
		}
	};

})();
