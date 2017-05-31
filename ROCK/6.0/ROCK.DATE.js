(function() {
	
	var 
	DATE = ROCK.DATE = {},
	second = 1000,
	minute = (second*60),
	hour = (minute*60),
	day = (hour*24),
	toDouble = function(n) {
		
		if(n<10) {
			n = ("0" + n);
		};
		return n;

	},
	toNewDate = function(date) {

		var
		_date = new Date();

		_date.setTime(date.getTime());

		return _date;

	};

	DATE.toNumber = function(dateString) {
		
		return Number(dateString.split("/").reverse().join(""));

	};
	DATE.get = function() {

		var
		date = new Date();

		return date;

	};
	DATE.getFirstOfDateMonth = function(date) {

		var
		_date = toNewDate(date);

		_date.setDate(1);

		return _date;

	};
	DATE.toString = function(date, format) {
		
		var
		day = date.getDate(),
		month = (date.getMonth()+1),
		year = date.getFullYear();

		day = toDouble(day);
		month = toDouble(month);

		return [day, format[month], year].join(format["joiner"]);

	};
	DATE.parseDateString = function(dateString) {

		return new Date(dateString.split("/").reverse().join("/"));

	};
	DATE.addXDaysToDate = function(x, date) {

		var
		_date = toNewDate(date),
		time = _date.getTime();

		time = (time + (day*x));

		_date.setTime(time);

		return _date;

	};
	DATE.FORMAT = {
		SHORT: {
			"01": "Jan",
			"02": "Feb",
			"03": "Mar",
			"04": "Apr",
			"05": "May",
			"06": "Jun",
			"07": "Jul",
			"08": "Aug",
			"09": "Sep",
			"10": "Oct",
			"11": "Nov",
			"12": "Dec",
			"joiner": " "
		},
		LONG: {
			"01": "January",
			"02": "February",
			"03": "March",
			"04": "April",
			"05": "May",
			"06": "June",
			"07": "July",
			"08": "August",
			"09": "September",
			"10": "October",
			"11": "November",
			"12": "December",
			"joiner": " "
		},
		NUMERIC: {
			"01": "01",
			"02": "02",
			"03": "03",
			"04": "04",
			"05": "05",
			"06": "06",
			"07": "07",
			"08": "08",
			"09": "09",
			"10": "10",
			"11": "11",
			"12": "12",
			"joiner": "/"
		}
	};

})();