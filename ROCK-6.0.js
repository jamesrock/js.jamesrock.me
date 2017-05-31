(function() {

	var 
	extend = function(proto) {

		var Class = createClass(this, proto.constructor);

		for(var prop in proto) {
			Class.prototype[prop] = proto[prop];
		};

		return Class;

	},
	createClass = function(extendsClass, constructor) {
		
		var prototypeProxy = function() {};
		
		prototypeProxy.prototype = extendsClass.prototype;
		
		constructor.prototype = new prototypeProxy();

		constructor.extends = constructor.prototype.extends = extendsClass;
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

})();(function() {
	
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
			
		}
	});

})();(function() {
	
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
			count = collection.length,
			loop = 0,
			value;
			
			while(loop<count) {
				value = callback(collection[loop], loop);
				if(value==="break") {
					break;
				};
				loop ++;
			};
			
			return collection;

		},
		random: function(collection, min, max) {

			max = (max||(collection.length-1));
			return collection[ROCK.MATH.random(min, collection.length-1)];

		}
	};

})();(function() {
	
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

})();(function() {
	
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
	
})();(function() {
	
	var NUMBER = ROCK.NUMBER = {};
	NUMBER.toCurrency = function(n) {

		var 
		isNagative = false,
		_return,
		toReplace = "",
		_RegExp;

		n = Number(n);

		if(n<0) {
			isNagative = true;
			n = (n*-1);
		};

		_return = n.toFixed(2);

		if(n>=10000) {
			toReplace = [_return[0], _return[1]].join("");
			_RegExp = new RegExp("^" + toReplace);
		}
		else if(n>=1000) {
			toReplace = [_return[0]].join("");
			_RegExp = new RegExp("^" + toReplace);
		};

		_return = _return.replace(_RegExp, (toReplace + ","));
		
		if(isNagative) {
			_return = ("-" + _return);
		};

		return _return;

	};
	
})();(function() {

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
	
})();(function() {

	// new Date("2015-11-22T00:00:00.000Z").getTime();
	
	ROCK.TIME = {
		toDays: function(time) {
			return ((time/(1000*60*60*24)));
		},
		toHours: function(time) {
			return ((time/(1000*60*60))%24);
		},
		toMinutes: function(time) {
			return ((time/(1000*60))%60);
		},
		toMinutes2: function(time) {
			return (time/(1000*60));
		},
		toSeconds: function(time) {
			return ((time/1000)%60);
		},
		toMilliseconds: function(time) {
			return ((time)%1000);
		}
	};

	ROCK.TIME.SECOND = 1000;
	ROCK.TIME.MINUTE = (ROCK.TIME.SECOND*60);
	ROCK.TIME.HOUR = (ROCK.TIME.MINUTE*60);
	ROCK.TIME.DAY = (ROCK.TIME.HOUR*24);

})();(function() {

	ROCK.HTTP = {};

	HTTPRequest = ROCK.Object.extend({
		constructor: function HTTPRequest(url, callback) {
		
			this.url = url;
			this.request = new XMLHttpRequest();

			this.request.onreadystatechange = function() {
				if(this.readyState===4) {
					callback(this.responseText);
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
		params: {}
	});
	
	ROCK.HTTP.GET = HTTPRequest.extend({
		constructor: function(url, callback) {

			this.extends.apply(this, arguments);
			
		},
		send: function() {
		
			//console.log("ROCK.HTTP.GET.send();");

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
		constructor: function(url, callback) {
		
			this.extends.apply(this, arguments);
			
		},
		send: function() {

			//console.log("ROCK.HTTP.POST.send();");
			
			this.request.open(this.type, this.url, true);
			this.addHeaders();
			this.request.send(this.paramCheck()?this.paramsToJSON():null);
		
		},
		type: "POST"
	});

})();(function() {

	var 
	chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	
	var GUID = ROCK.GUID = {};
	GUID.get = function() {
			
		var
		_return = ROCK.ARRAY.random(chars, 0, 50),
		lengthOf = (this.length-1);
		
		while(lengthOf--) {
			_return += ROCK.ARRAY.random(chars);
		};
		
		return _return;
		
	};
	GUID.length = 10;
	
})();(function() {

	var DOM = ROCK.DOM = {};
	DOM.getNode = function(id) {

		return new StaticDOMNode(document.getElementById(id));

	};

	var DOMNode = ROCK.Object.extend({
		constructor: function DOMNode() {

		},
		appendTo: function(a) {
		
			a.node.appendChild(this.node);
			return this;

		},
		prependTo: function(a) {
			
			a.node.appendChild(this.node);
			return this;

		},
		append: function(a) {
		
			this.node.appendChild(a.node);
			return this;

		},
		prepend: function(a) {
		
			this.node.appendChild(a.node);
			return this;

		},
		attr: function(a, b) {

			this.node.setAttribute(a, b);
			return this;

		},
		empty: function() {

			this.html("");
			return this;

		},
		html: function(a) {

			this.node.innerHTML = a;
			return this;

		},
		on: function(a, b) {

			this.node.addEventListener(a, b);
			this.events.append({name:a, handler: b});
			return this;

		},
		off: function(a, b) {

			return this;

		},
		trigger: function(a, b) {

			this.events.filter(function(e) {
				return e.name===a;
			}).each(function(e) {
				e.handler(b);
			});
			return this;

		},
		setValue: function(a) {

			this.node.value = a;
			return this;

		},
		getValue: function() {

			return this.node.value;

		}
	});

	var StaticDOMNode = DOMNode.extend({
		constructor: function StaticDOMNode(node) {

			this.node = node;

		}
	});
	
	var DynamicDOMNode = DOMNode.extend({
		constructor: function DynamicDOMNode() {

		},
		construct: function(a) {
		
			//this.events = new ROCK.Collection();
			this.node = document.createElement(this.nodeName);

		}
	});
	
	var InputNode = DynamicDOMNode.extend({
		constructor: function InputNode() {

			this.construct();

		},
		nodeName: "input"
	});

	var FileInputNode = DOM.FileInputNode = InputNode.extend({
		constructor: function FileInputNode() {

			this.construct();
			this.attr("type", "file");

		}
	});

	var TextInputNode = DOM.TextInputNode = InputNode.extend({
		constructor: function TextInputNode() {

			this.construct();
			this.attr("type", "text");

		}
	});

	var DivNode = DOM.DivNode = DynamicDOMNode.extend({
		constructor: function DivNode() {
			
			this.construct();

		},
		nodeName: "div"
	});

	var SpanNode = DOM.SpanNode = DynamicDOMNode.extend({
		constructor: function SpanNode() {
			
			this.construct();

		},
		nodeName: "span"
	});

	var ImgNode = DOM.ImgNode = DynamicDOMNode.extend({
		constructor: function ImgNode() {

			this.construct();

		},
		nodeName: "img"
	});

	var AnchorNode = DOM.AnchorNode = DynamicDOMNode.extend({
		constructor: function AnchorNode() {

			this.construct();

		},
		nodeName: "a"
	});

	var SelectNode = DOM.SelectNode = DynamicDOMNode.extend({
		constructor: function SelectNode() {

			this.construct();

		},
		setItem: function(label, value) {

			new OptionNode().attr("value", value).html(label).appendTo(this);

		},
		nodeName: "select"
	});

	var OptionNode = DOM.OptionNode = DynamicDOMNode.extend({
		constructor: function OptionNode() {

			this.construct();

		},
		nodeName: "option"
	});

	var TextAreaNode = DOM.TextAreaNode = DynamicDOMNode.extend({
		constructor: function TextAreaNode() {

			this.construct();

		},
		nodeName: "textarea"
	});

	var BodyNode = DOM.BodyNode = DynamicDOMNode.extend({
		constructor: function BodyNode() {

			this.node = document.body;

		}
	});
	
	var ButtonNode = DOM.ButtonNode = DynamicDOMNode.extend({
		constructor: function ButtonNode(label) {

			this.construct();
			this.html(label);

		},
		nodeName: "button"
	});

})();(function() {
	
	ROCK.JQUERY = {
		createNode: function(nodeName) {
			
			return $(document.createElement(nodeName));
		
		},
		getNode: function(id) {
			
			return $(document.getElementById(id));
			
		}
	};
	
})();