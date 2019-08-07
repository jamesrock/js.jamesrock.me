import math from './math.js';

var
second = 1000,
minute = (second*60),
hour = (minute*60),
day = (hour*24),
year = (day*365),
time = {
	getMilliseconds: function(time) {
		return time;
	},
	getSeconds: function(time) {
		return math.truncate(time/second);
	},
	getMinutes: function(time) {
		return math.truncate(time/minute);
	},
	getHours: function(time) {
		return math.truncate(time/hour);
	},
	getDays: function(time) {
		return math.truncate(time/day);
	},
	getYears: function(time) {
		return math.truncate(time/year);
	},
	getMillisecondsOf: function(time) {
		return (this.getMilliseconds(time%day%hour%minute%second));
	},
	getSecondsOf: function(time) {
		return (this.getSeconds(time%day%hour%minute));
	},
	getMinutesOf: function(time) {
		return (this.getMinutes(time%day%hour));
	},
	getHoursOf: function(time) {
		return (this.getHours(time%day));
	},
	getDaysInYear: function(time) {
		return (this.getDays(time%year));
	}
};

export default time;
