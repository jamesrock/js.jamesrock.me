(function() {

	var 
	extend = function(props) {

		var Class = ROCK.createClass(this, props.constructor);

		for(var prop in props) {
			Class.prototype[prop] = props[prop];
		};

		return Class;

	},
	createClass = function(_extends, constructor) {
		
		var prototypeProxy = function() {};
		
		prototypeProxy.prototype = _extends.prototype;
		
		constructor.prototype = new prototypeProxy();
				
		constructor.constructor = constructor.prototype.constructor = constructor;
		constructor.extends = constructor.prototype.extends = _extends;
		constructor.extend = constructor.prototype.extend = extend;

		return constructor;
		
	};
	
	ROCK = {};
	ROCK.createClass = createClass;

})();(function() {
	
	var Collection = ROCK.Collection = ROCK.createClass(Array, function Collection() {});
	Collection.prototype.getItemByKeyValue = function(key, value) {

		return this.filter(function(item) {
			
			return item[key]===value;
			
		})[0];
		
	};
	Collection.prototype.getItemsByKeyValue = function(key, value) {
	
		return this.filter(function(item) {
			
			return item[key]===value;
			
		});
		
	};
	Collection.prototype.append = function(item) {
		
		this.push(item);
		return item;
		
	};
	Collection.prototype.prepend = function(item) {
		
		this.unshift(item);
		return item;
		
	};
	Collection.prototype.exists = function(value) {
	
		return (this.indexOf(value)>-1);
		
	};
	Collection.prototype.filter = function(callback) {
		
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
		
	};
	Collection.prototype.each = function(callback) {
	
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
		
	};
	Collection.prototype.random = function(min, max) {
		
		max = (max||(this.length-1));
		return this[ROCK.MATH.random(min, max)];
		
	};
	Collection.prototype.remove = function(item) {
			
		return this.removeAt(this.getIndexOf(item));
		
	};
	Collection.prototype.removeAt = function(index) {
		
		this.splice(index, 1);
		return this;
	
	};
	Collection.prototype.addAt = function(item, index) {
			
		this.splice(index, 0, item);
		return item;
		
	};
	Collection.prototype.first = function() {
			
		return this[0];
		
	};
	Collection.prototype.last = function() {
			
		return this[this.length-1];
		
	};
	Collection.prototype.swap = function(aIndex, bIndex) {
		
		var 
		aProp = this[aIndex],
		bProp = this[bIndex];
		
		this[aIndex] = bProp;
		this[bIndex] = aProp;
		
		return this;
		
	};

})();(function() {
	
	var ARRAY = ROCK.ARRAY = {};
	ARRAY.getItemByKeyValue = function(collection, key, value) {
		
		return this.filter(collection, function(item) {
			
			return item[key]===value;
			
		})[0];

	};
	ARRAY.getItemsByKeyValue = function(collection, key, value) {
		
		return this.filter(collection, function(item) {
			
			return item[key]===value;
			
		});

	};
	ARRAY.filter = function(collection, callback) {
		
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

	};
	ARRAY.each = function(collection, callback) {

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

	};
	ARRAY.random = function(collection, min, max) {

		max = (max||(collection.length-1));
		return collection[ROCK.MATH.random(min, collection.length-1)];

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
	
	var MATH = ROCK.MATH = {};
	MATH.random = function(min, max) {
		
		min = (min||0);
		max = (max||100);
		max = (max+1);
		
		return Math.floor(Math.random()*(max-min)+min);
	
	};
	MATH.toHundredth = function(number) {
		
		return this.roundTo(number, 100);
	
	};
	MATH.floorTo = function(number, to) {
		
		return (Math.floor(number*to)/to);
	
	};
	MATH.roundTo = function(number, to) {
		
		return (Math.round(number*to)/to);
	
	};
	MATH.ceilTo = function(number, to) {
		
		return (Math.ceil(number*to)/to);
	
	};
	MATH.toCurrency = function(number) {
		
		return number.toFixed(2);
	
	};
	MATH.getXPercentOfY = function(x, y) {
		
		return (y*(x/100));
	
	};
	MATH.getXAsPercentOfY = function(x, y) {
		
		return ((x/y)*100);
	
	};
	MATH.truncate = function(number) {
		
		return number<0?this.ceilTo(number, 1):this.floorTo(number, 1);

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

	var SORT = ROCK.SORT = {};
	SORT.NUMBER_ASCENDING = function(prop) {
		return function(a, b) {
			return prop.call(a)-prop.call(b);
		};
	};
	SORT.NUMBER_DESCENDING = function(prop) {
		return function(a, b) {
			return prop.call(b)-prop.call(a);
		};
	};
	SORT.STRING_ASCENDING = function(prop) {
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
	};
	SORT.STRING_DESCENDING = function(prop) {	
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
	};
	
})();(function() {

	var HTTP = ROCK.HTTP = {};
	HTTP.getScript = function(url, callback) {

		var 
		CALLBACK_NAME = ("callback" + ROCK.GUID.get()),
		url = (url + "&callback=ROCK.HTTP." + CALLBACK_NAME),
		loaderScript = ROCK.JQUERY.createNode("script").attr("src", url).attr("async", "true");

		ROCK.HTTP[CALLBACK_NAME] = function(json) {
		
			callback(json);
			loaderScript.remove();
			delete ROCK.HTTP[CALLBACK_NAME];
			
		};
		
		loaderScript.appendTo("body");

	};

	var HTTPRequest = ROCK.HTTPRequest = ROCK.createClass(Object, function(url) {
		
		this.url = url;
		this.params = new ROCK.Collection();
		this.request = new XMLHttpRequest();
		
	});
	HTTPRequest.prototype.getParams = function() {
		
		return this.params.join("&");
		
	};
	HTTPRequest.prototype.setParam = function(key, value) {
		
		this.params.append(key + "=" + value);
		return this;
		
	};
	HTTPRequest.prototype.contentTypeHeader = "application/x-www-form-urlencoded; charset=UTF-8";
	HTTPRequest.prototype.acceptHeader = "*/*";
	
	var HTTPGetRequest = HTTP.prototype.HTTPGetRequest = ROCK.createClass(HTTPRequest, function(url) {
		
		this.inherits(url);
		
	});
	HTTPGetRequest.prototype.type = "GET";
	HTTPGetRequest.prototype.send = function() {
	
		//console.log("HTTPGetRequest.send();", this.type);
		
		var
		_HTTPRequest = this,
		request = _HTTPRequest.request;
		
		request.onreadystatechange = function onreadystatechange() {
			
			if(this.readyState===4) {
				
				_HTTPRequest.onComplete(request.responseText);
			
			};
			
		};
		
		request.open(this.type, (this.url + "?" + this.getParams()), true);
		request.setRequestHeader("Content-Type", this.contentTypeHeader);
		request.setRequestHeader("Accept", this.acceptHeader);
		request.send();
		
	};
	
	var HTTPPostRequest = HTTP.prototype.HTTPPostRequest = ROCK.createClass(HTTPRequest, function(url) {
		
		this.inherits(url);
		
	});
	HTTPPostRequest.prototype.type = "POST";
	HTTPPostRequest.prototype.send = function() {
		
		var
		_HTTPRequest = this,
		request = _HTTPRequest.request;
		
		request.onreadystatechange = function onreadystatechange() {
			
			if(this.readyState===4) {
				
				_HTTPRequest.onComplete(request.responseText);
			
			};
			
		};
		
		request.open(this.type, this.url, true);
		request.setRequestHeader("Content-Type", this.contentTypeHeader);
		request.setRequestHeader("Accept", this.acceptHeader);
		request.send(this.getParams());
	
	};

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

	var DOMNode = ROCK.createClass(Object, function DOMNode() {});
	DOMNode.prototype.appendTo = function(a) {
		
		a.node.appendChild(this.node);
		return this;

	};
	DOMNode.prototype.prependTo = function(a) {
		
		a.node.appendChild(this.node);
		return this;

	};
	DOMNode.prototype.append = function(a) {
		
		this.node.appendChild(a.node);
		return this;

	};
	DOMNode.prototype.prepend = function(a) {
		
		this.node.appendChild(a.node);
		return this;

	};
	DOMNode.prototype.attr = function(a, b) {

		this.node.setAttribute(a, b);
		return this;

	};
	DOMNode.prototype.empty = function() {

		this.html("");
		return this;

	};
	DOMNode.prototype.html = function(a) {

		this.node.innerHTML = a;
		return this;

	};
	DOMNode.prototype.on = function(a, b) {

		this.node.addEventListener(a, b);
		this.events.append({name:a, handler: b});
		return this;

	};
	DOMNode.prototype.off = function(a, b) {

		
		return this;

	};
	DOMNode.prototype.trigger = function(a, b) {

		this.events.filter(function(e) {
			return e.name===a;
		}).each(function(e) {
			e.handler(b);
		});
		return this;

	};
	DOMNode.prototype.setValue = function(a) {

		this.node.value = a;
		return this;

	};
	DOMNode.prototype.getValue = function() {

		return this.node.value;

	};

	var StaticDOMNode = ROCK.createClass(DOMNode, function StaticDOMNode(node) {

		this.node = node;

	});
	
	var DynamicDOMNode = ROCK.createClass(DOMNode, function DynamicDOMNode() {});
	DynamicDOMNode.prototype.construct = function(a) {
		
		//this.events = new ROCK.Collection();
		this.node = document.createElement(this.nodeName);

	};
	
	var InputNode = DOM.InputNode = ROCK.createClass(DynamicDOMNode, function InputNode() {

		this.construct();

	});
	InputNode.prototype.nodeName = "input";

	var FileInputNode = DOM.FileInputNode = ROCK.createClass(InputNode, function FileInputNode() {

		this.construct();
		this.attr("type", "file");

	});

	var TextInputNode = DOM.TextInputNode = ROCK.createClass(InputNode, function TextInputNode() {

		this.construct();
		this.attr("type", "text");

	});

	var DivNode = DOM.DivNode = ROCK.createClass(DynamicDOMNode, function DivNode() {
			
		this.construct();

	});
	DivNode.prototype.nodeName = "div";

	var SpanNode = DOM.SpanNode = ROCK.createClass(DynamicDOMNode, function SpanNode() {
			
		this.construct();

	});
	SpanNode.prototype.nodeName = "span";

	var ImgNode = DOM.ImgNode = ROCK.createClass(DynamicDOMNode, function ImgNode() {

		this.construct();

	});
	ImgNode.prototype.nodeName = "img";

	var AnchorNode = DOM.AnchorNode = ROCK.createClass(DynamicDOMNode, function AnchorNode() {

		this.construct();

	});
	AnchorNode.prototype.nodeName = "a";

	var SelectNode = DOM.SelectNode = ROCK.createClass(DynamicDOMNode, function SelectNode() {

		this.construct();

	});
	SelectNode.prototype.setItem = function(label, value) {

		new OptionNode().attr("value", value).html(label).appendTo(this);

	};
	SelectNode.prototype.nodeName = "select";

	var OptionNode = DOM.OptionNode = ROCK.createClass(DynamicDOMNode, function OptionNode() {

		this.construct();

	});
	OptionNode.prototype.nodeName = "option";

	var TextAreaNode = DOM.TextAreaNode = ROCK.createClass(DynamicDOMNode, function TextAreaNode() {

		this.construct();

	});
	TextAreaNode.prototype.nodeName = "textarea";

	var BodyNode = DOM.BodyNode = ROCK.createClass(DynamicDOMNode, function BodyNode() {

		this.node = document.body;

	});
	
	var ButtonNode = DOM.ButtonNode = ROCK.createClass(DynamicDOMNode, function ButtonNode(label) {

		this.construct();
		this.html(label);

	});
	ButtonNode.prototype.nodeName = "button";

})();(function() {
	
	var JQUERY = ROCK.JQUERY = {};
	JQUERY.createNode = function(nodeName) {
		
		return $(document.createElement(nodeName));
	
	};
	JQUERY.getNode = function(id) {
		
		return $(document.getElementById(id));
		
	};
	
})();