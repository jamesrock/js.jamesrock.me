(function() {

	var 
	extend = function(proto) {

		var 
		context = this,
		constructor = proto.constructor,
		_class;

		if(!proto.hasOwnProperty("constructor")) {
			constructor = function() {
				return context.apply(this, arguments);
			};
		};

		_class = createClass(this, constructor);

		for(var prop in proto) {
			_class.prototype[prop] = proto[prop];
		};

		return _class;

	},
	createClass = function(_extends, constructor) {
		
		var proxy = function() {};
		
		proxy.prototype = _extends.prototype;
		
		constructor.prototype = new proxy();

		constructor.constructor = constructor.prototype.constructor = constructor;
		constructor.extends = constructor.prototype.extends = _extends;
		constructor.extend = constructor.prototype.extend = extend;
		
		return constructor;
		
	};
	
	ROCK = {
		"Object": createClass(Object, function() {

			throw("An instance of ROCK.Object cannot be created. Use ROCK.Object.extend();");

		}),
		"Array": createClass(Array, function() {

			throw("An instance of ROCK.Array cannot be created. Use ROCK.Array.extend();");

		})
	};

})();
(function() {
	
	ROCK.Collection = ROCK.Array.extend({
		constructor: function Collection() {
			
		},
		getItemByKeyValue: function(key, value) {

			return this.filter(function(item) {
				
				return item[key]===value;
				
			})[0];
			
		},
		getItemsByKeyValue: function(key, value) {
	
			return this.filter(function(item) {
				
				return item[key]===value;
				
			});
			
		},
		append: function(item) {
		
			this.push(item);
			return item;
			
		},
		prepend: function(item) {
		
			this.unshift(item);
			return item;
			
		},
		exists: function(value) {
	
			return (this.indexOf(value)>-1);
			
		},
		filter: function(callback) {
		
			var 
			_return = new this.constructor(),
			value;
			
			this.each(function(item) {
				
				value = callback(item, _return);
				
				if(value===true) {
					_return.push(item);
				};

				return value;
				
			});
			
			return _return;
			
		},
		each: function(callback) {
		
			var 
			count = this.length,
			loop = 0,
			value;
			
			while(loop<count) {
				value = callback(this[loop], loop);
				if(value==="break") {
					break;
				};
				loop ++;
			};
			
			return this;
			
		},
		random: function(min, max) {
		
			max = (max||(this.length-1));
			return this[ROCK.MATH.random(min, max)];
			
		},
		remove: function(item) {
			
			return this.removeAt(this.getIndexOf(item));
			
		},
		removeAt: function(index) {
		
			this.splice(index, 1);
			return this;
		
		},
		addAt: function(item, index) {
			
			this.splice(index, 0, item);
			return item;
			
		},
		first: function() {
			
			return this[0];
			
		},
		last: function() {
			
			return this[this.length-1];
			
		},
		swap: function(aIndex, bIndex) {
		
			var 
			aProp = this[aIndex],
			bProp = this[bIndex];
			
			this[aIndex] = bProp;
			this[bIndex] = aProp;
			
			return this;
			
		},
		pushift: function() {

			this.push(this.shift());
			return this;

		}
	});

})();
(function() {
	
	ROCK.ARRAY = {
		getItemByKeyValue: function(collection, key, value) {
		
			return this.filter(collection, function(item) {
				
				return item[key]===value;
				
			})[0];

		},
		getItemsByKeyValue: function(collection, key, value) {
		
			return this.filter(collection, function(item) {
				
				return item[key]===value;
				
			});

		},
		filter: function(collection, callback) {
		
			var 
			_return = new collection.constructor(),
			value;
			
			this.each(collection, function(item) {
				
				value = callback(item, _return);
				
				if(value===true) {
					_return.push(item);
				};

				return value;
				
			});
			
			return _return;

		},
		each: function(collection, callback) {

			var 
			value;

			for(var i=0;i<collection.length;i++) {
				value = callback(collection[i], i);
				if(value==="break") {
					break;
				};
			};
			
			return collection;

		},
		random: function(collection, min, max) {

			max = (max||(collection.length-1));
			return collection[ROCK.MATH.random(min, collection.length-1)];

		},
		pushift: function(collection) {

			collection.push(collection.shift());
			return collection;

		},
		first: function(collection) {
			
			return collection[0];
			
		},
		last: function(collection) {
			
			return collection[collection.length-1];
			
		}
	};

})();
(function() {
	
	var 
	DATE = ROCK.DATE = {},
	second = 1000,
	minute = (second*60),
	hour = (minute*60),
	day = (hour*24),
	toNewDate = function(date) {

		var
		_date = new Date();

		_date.setTime(date.getTime());

		return _date;

	};

	ROCK.DATE = {
		create: function(year, month, date, hours, minutes, seconds, milliseconds) {

			return new Date(year, (month-1), date, hours, minutes, seconds, milliseconds);

		},
		get: function() {

			return new Date();

		},
		check: function(date, min, max) {

			var
			dateTime = date.getTime(),
			minTime = min.getTime(),
			maxTime = max.getTime();

			return (dateTime>=minTime&&dateTime<=maxTime);

		},
		expired: function(max) {

			var
			dateTime = this.getTime(),
			maxTime = max.getTime();

			return (dateTime>maxTime);

		},
		reverse: function(dateString) {
			
			return dateString.split("/").reverse().join("");

		},
		getFirstOfDateMonth: function(date) {

			var
			_date = toNewDate(date);

			_date.setDate(1);

			return _date;

		},
		toString: function(date, format) {
		
			var
			day = date.getDate(),
			month = (date.getMonth()+1),
			year = date.getFullYear();

			day = ROCK.NUMBER.toDouble(day);
			month = ROCK.NUMBER.toDouble(month);

			return [day, format[month], year].join(format["joiner"]);

		},
		parseDateString: function(dateString) {

			return new Date(dateString.split("/").reverse().join("/"));

		},
		addXDaysToDate: function(x, date) {

			var
			_date = toNewDate(date),
			time = _date.getTime();

			time = (time + (day*x));

			_date.setTime(time);

			return _date;

		},
		FORMAT: {
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
		}
	};

})();
(function() {

	var DOM = ROCK.DOM = {
		createNode: function(type) {

			return document.createElement(type);

		},
		getNode: function(id) {

			return document.getElementById(id);

		},
		addClass: function(node, className) {

			node.classList.add(className);
			return node;

		},
		removeClass: function(node, className) {

			node.classList.remove(className);
			return node;

		},
		toggleClass: function(node, className) {

			node.classList.toggle(className);
			return node;

		},
		setAttribute: function(node, key, value) {

			node.setAttribute(key, value);
			return node;

		},
		append: function(child, parent) {

			parent.appendChild(child);

		},
		html: function(node, html) {

			node.innerHTML = html;
			return node;

		}
	};

})();
(function() {

	ROCK.GUID = {
		chars: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
		get: function() {
			
			var
			_return = ROCK.ARRAY.random(this.chars, 0, 50),
			lengthOf = (this.length-1);
			
			while(lengthOf--) {
				_return += ROCK.ARRAY.random(this.chars);
			};
			
			return _return;
			
		},
		length: 10
	};
	
})();
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
(function() {
	
	ROCK.NUMBER = {
		format: function(n) {

			// amend to handle digits after decimal place

			n = n.toString();

			var
			length = n.length,
			_split = n.split("").reverse();

			while(length--) {

				if(length%3===0&&length>0) {
					_split.splice(length, 0, ",");
				};

			};

			return _split.reverse().join("");

		},
		expoToLong: function(n) {

			n = n.toString();
			
			var 
			_split = n.split("e+"),
			first = _split[0].replace(".", ""),
			second = _split[1],
			zeroes = Number(second);

			zeroes = (zeroes - (first.length-1));

			while(zeroes--) {
				first += "0";
			};

			return first;

		},
		toDouble: function(n) {

			n = n.toString();

			if(n<10) {
				n = ("0"+n);
			};

			return n;

		}
	};
	
})();
(function() {

	ROCK.SORT = {
		NUMBER: {
			ASCENDING: function(prop) {
				return function(a, b) {
					return prop.call(a)-prop.call(b);
				};
			},
			DESCENDING: function(prop) {
				return function(a, b) {
					return prop.call(b)-prop.call(a);
				};
			}
		},
		STRING: {
			ASCENDING: function(prop) {
				return function(a, b) {
					if(prop.call(a)<prop.call(b)) {
						return -1;
					}
					else if(prop.call(a)>prop.call(b)) {
						return 1;
					}
					else {
						return 0;
					};
				};
			},
			DESCENDING: function(prop) {	
				return function(a, b) {
					if(prop.call(b)<prop.call(a)) {
						return -1;
					}
					else if(prop.call(b)>prop.call(a)) {
						return 1;
					}
					else {
						return 0;
					};
				};
			}
		}
	};
	
})();
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
(function() {

	ROCK.HTTP = {};

	HTTPRequest = ROCK.Object.extend({
		constructor: function HTTPRequest(url, callback) {
		
			this.url = url;
			this.request = new XMLHttpRequest();

			this.request.onreadystatechange = function() {
				if(this.readyState===4) {
					callback(JSON.parse(this.responseText));
				};
			};
			
		},
		paramsToJSON: function() {
			
			return JSON.stringify(this.params);

		},
		paramCheck: function() {
			
			for(var param in this.params) {
				return true;
			};
			return false;

		},
		setParam: function(key, value) {
			
			this.params[key] = value;
			return this;

		},
		getParam: function(key) {
			
			return this.params[key];

		},
		removeParam: function(key, value) {
			
			delete this.params[key];
			return this;

		},
		setHeader: function(key, value) {
			
			this.headers[key] = value;
			return this;

		},
		addHeaders: function() {
			
			for(var header in this.headers) {
				this.request.setRequestHeader(header, this.headers[header]);
			};
			return this;

		},
		abort: function() {
			
			this.request.abort();

		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			"Accept": "*/*"
		},
		params: {},
		dataType: "json"
	});
	
	ROCK.HTTP.GET = HTTPRequest.extend({
		send: function() {

			var
			url = this.url;

			if(this.paramCheck()) {
				url += ("?" + this.paramsToJSON());
			};
			
			this.request.open(this.type, url, true);
			this.addHeaders();
			this.request.send();
			
		},
		type: "GET"
	});
	
	ROCK.HTTP.POST = HTTPRequest.extend({
		send: function() {
			
			this.request.open(this.type, this.url, true);
			this.addHeaders();
			this.request.send(this.paramCheck()?this.paramsToJSON():null);
		
		},
		type: "POST"
	});

})();
(function() {
	
	ROCK.JQUERY = {
		createNode: function(nodeName) {
			
			return $(document.createElement(nodeName));
		
		},
		getNode: function(id) {
			
			return $(document.getElementById(id));
			
		}
	};
	
})();
