(function() {

	var 
	createClass = function(inherits, constructor) {
		
		var 
		pw = function() {},
		i = inherits,
		c = constructor,
		p;
		
		pw.prototype = i.prototype;
		
		p = c.prototype = new pw();
		c.prototype.constructor = c;
		c.prototype.prototype = p;
		c.inherits = p.inherits = i;
		c.defineClass = p.defineClass = defineClass;
		c.setProp = p.setProp = setProp;

		return c;
		
	},
	defineClass = function(exposure, type, name, _class) {
		
		var 
		_return = _class;
		
		if(type==="STATIC") {
			_return = new _return();
		};
		
		if(exposure==="PUBLIC") {
			this.setProp(name, _return);
		};
		
		return _return;
		
	},
	setProp = function(key, value) {
		
		this.prototype[key] = value;
		return this;
		
	};
	
	ROCK = createClass2("STATIC", Object, function ROCK() {});
	ROCK.setProp("createClass", createClass);

})();(function() {
	
	var Collection = ROCK.defineClass("PUBLIC", "DYNAMIC", "Collection", ROCK.createClass(Array, function Collection() {}));
	Collection.setProp("getItemByKeyValue", function(key, value) {
			
		var
		target = this,
		loop = target.length,
		_return,
		item;
		
		while(loop--) {
		
			item = target[loop];
			
			if(item[key]===value) {
				
				_return = item;
				break;
				
			};
		
		};
		
		return _return;
		
	});
	Collection.setProp("getItemsByKeyValue", function(key, value) {
	
		return this.filter(function(item) {
			
			return item[key]===value;
			
		});
		
	});
	Collection.setProp("append", function(item) {
		
		this.push(item);
		return item;
		
	});
	Collection.setProp("prepend", function(item) {
		
		this.unshift(item);
		return item;
		
	});
	Collection.setProp("exists", function(value) {
	
		return (this.indexOf(value)>-1);
		
	});
	Collection.setProp("filter", function(fn) {
		
		var 
		_return = new this.constructor(),
		value;
		
		this.each(function(item) {
			
			value = fn(item, _return);
			
			if(value===true) {
				
				_return.push(item);
				
			}
			else if(value==="break") {
				
				return "break";
			
			};
			
		});
		
		return _return;
		
	});
	Collection.setProp("each", function(fn) {
	
		var 
		loop = this.length,
		inc = 0,
		value;
		
		while(inc<loop) {
			value = fn(this[inc], inc);
			if(value==="break") {
				break;
			};
			inc ++;
		};
		
		return this;
		
	});
	Collection.setProp("getRandom", function(min, max) {
		
		max = (max||(this.length-1));
		return this[ROCK.NUMBER.getRandom(min, max)];
		
	});
	Collection.setProp("remove", function(item) {
			
		return this.removeAt(this.getIndexOf(item));
		
	});
	Collection.setProp("removeAt", function(index) {
		
		this.splice(index, 1);
		return this;
	
	});
	Collection.setProp("addAt", function(item, index) {
			
		this.splice(index, 0, item);
		return item;
		
	});
	Collection.setProp("first", function() {
			
		return this[0];
		
	});
	Collection.setProp("last", function() {
			
		return this[this.length-1];
		
	});
	Collection.setProp("swap", function(aIndex, bIndex) {
		
		var 
		aProp = this[aIndex],
		bProp = this[bIndex];
		
		this[aIndex] = bProp;
		this[bIndex] = aProp;
		
		return this;
		
	});

})();(function() {

	var DOM = ROCK.defineClass("PUBLIC", "STATIC", "DOM", ROCK.createClass(Object, function() {}));
	DOM.setProp("getNode", function(id) {

		return new StaticDOMNode(document.getElementById(id));

	});

	var StaticDOMNode = ROCK.createClass(Object, function(node) {

		this.node = node;

	});
	StaticDOMNode.setProp("appendTo", function(a) {
		
		//console.log("appendTo", a, this);
		a.node.appendChild(this.node);
		return this;

	});
	StaticDOMNode.setProp("prependTo", function(a) {
		
		a.node.appendChild(this.node);
		return this;

	});
	StaticDOMNode.setProp("append", function(a) {
		
		this.node.appendChild(a.node);
		return this;

	});
	StaticDOMNode.setProp("prepend", function(a) {
		
		this.node.appendChild(a.node);
		return this;

	});
	StaticDOMNode.setProp("attr", function(a, b) {

		this.node.setAttribute(a, b);
		return this;

	});
	StaticDOMNode.setProp("empty", function() {

		this.html("");
		return this;

	});
	StaticDOMNode.setProp("html", function(a) {

		this.node.innerHTML = a;
		return this;

	});
	StaticDOMNode.setProp("on", function(a, b) {

		//console.log("on", arguments);
		this.node.addEventListener(a, b);
		this.events.append({name:a, handler: b});
		return this;

	});
	StaticDOMNode.setProp("off", function(a, b) {

		
		return this;

	});
	StaticDOMNode.setProp("trigger", function(a, b) {

		this.events.filter(function(e) {
			return e.name===a;
		}).each(function(e) {
			e.handler(b);
		});
		return this;

	});
	StaticDOMNode.setProp("setValue", function(a) {

		this.node.value = a;
		return this;

	});
	StaticDOMNode.setProp("getValue", function() {

		return this.node.value;

	});

	var DynamicDOMNode = ROCK.createClass(StaticDOMNode, function() {});
	DynamicDOMNode.setProp("construct", function(a) {
		
		//this.events = new ROCK.Collection();
		this.node = document.createElement(this.nodeName);

	});
	
	var Input = DOM.defineClass("PUBLIC", "DYNAMIC", "Input", ROCK.createClass(DynamicDOMNode, function Input() {

		this.construct();

	}));
	Input.setProp("nodeName", "input");

	var FileInput = DOM.defineClass("PUBLIC", "DYNAMIC", "FileInput", ROCK.createClass(Input, function FileInput() {

		this.construct();
		this.attr("type", "file");

	}));

	var TextInput = DOM.defineClass("PUBLIC", "DYNAMIC", "TextInput", ROCK.createClass(Input, function TextInput() {

		this.construct();
		this.attr("type", "text");

	}));

	var Div = DOM.defineClass("PUBLIC", "DYNAMIC", "Div", ROCK.createClass(DynamicDOMNode, function Div() {

		this.construct();

	}));
	Div.setProp("nodeName", "div");

	var Img = DOM.defineClass("PUBLIC", "DYNAMIC", "Img", ROCK.createClass(DynamicDOMNode, function Img() {

		this.construct();

	}));
	Img.setProp("nodeName", "img");

	var Anchor = DOM.defineClass("PUBLIC", "DYNAMIC", "Anchor", ROCK.createClass(DynamicDOMNode, function Anchor() {

		this.construct();

	}));
	Anchor.setProp("nodeName", "a");

	var Select = DOM.defineClass("PUBLIC", "DYNAMIC", "Select", ROCK.createClass(DynamicDOMNode, function Select() {

		this.construct();

	}));
	Select.setProp("setItem", function(label, value) {

		new OptionNode().attr("value", value).html(label).appendTo(this);

	});
	Select.setProp("nodeName", "select");

	var OptionNode = DOM.defineClass("PUBLIC", "DYNAMIC", "OptionNode", ROCK.createClass(DynamicDOMNode, function OptionNode() {

		this.construct();

	}));
	OptionNode.setProp("nodeName", "option");

	var TextArea = DOM.defineClass("PUBLIC", "DYNAMIC", "TextArea", ROCK.createClass(DynamicDOMNode, function TextArea() {

		this.construct();

	}));
	TextArea.setProp("nodeName", "textarea");

	var Body = DOM.defineClass("PUBLIC", "DYNAMIC", "Body", ROCK.createClass(DynamicDOMNode, function Body() {

		this.node = document.body;

	}));

	var TextField = DOM.defineClass("PUBLIC", "DYNAMIC", "TextField", ROCK.createClass(Div, function TextField(label) {

		this.construct();
		this.attr("data-role", "input");
		this.input = new TextInput().attr("placeholder", label).attr("title", label).appendTo(this);

	}));

	var InputWrap = DOM.defineClass("PUBLIC", "DYNAMIC", "InputWrap", ROCK.createClass(Div, function InputWrap() {

		this.construct();
		this.attr("data-role", "input");

	}));

	var FormField = DOM.defineClass("PUBLIC", "DYNAMIC", "FormField", ROCK.createClass(Div, function FormField() {

		this.construct();
		this.attr("data-role", "form-field");

	}));

	var Panel = DOM.defineClass("PUBLIC", "DYNAMIC", "Panel", ROCK.createClass(Div, function Panel(theme) {

		this.construct();
		this.attr("data-role", "panel").attr("data-theme", theme);

	}));

	var Pane = DOM.defineClass("PUBLIC", "DYNAMIC", "Pane", ROCK.createClass(Div, function Pane(theme) {

		this.construct();
		this.attr("data-role", "pane").attr("data-theme", theme);

	}));

	var Button = DOM.defineClass("PUBLIC", "DYNAMIC", "Button", ROCK.createClass(DynamicDOMNode, function Button(label) {

		this.construct();
		this.html(label);

	}));
	Button.setProp("nodeName", "button");

})();(function() {

	var 
	chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	chars = chars.reverse(),
	charsCount = chars.length;
	
	var GuidCharCollection = ROCK.defineClass("PRIVATE", "STATIC", "GuidCharCollection", ROCK.createClass(ROCK.Collection, function GuidCharCollection() {
		
		while(charsCount--) {
			this.append(chars[charsCount]);
		};
		
	}));
	
	var GUID = ROCK.defineClass("PUBLIC", "STATIC", "GUID", ROCK.createClass(Object, function GUID() {}));
	GUID.setProp("length", 10);
	GUID.setProp("chars", GuidCharCollection);
	GUID.setProp("get", function() {
			
		var
		_return = this.chars.getRandom(0, 50),
		lengthOf = (this.length-1);
		
		while(lengthOf--) {
		
			_return += this.chars.getRandom();
		
		};
		
		return _return;
		
	});
	
})();(function() {

	var HTTP = ROCK.defineClass("PUBLIC", "STATIC", "HTTP", ROCK.createClass(Object, function() {}));
	HTTP.setProp("getScript", function(url, callback) {

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

	});

	var HTTPRequest = ROCK.defineClass("PRIVATE", "DYNAMIC", "HTTPRequest", ROCK.createClass(Object, function(url) {
		
		this.url = url;
		this.params = new ROCK.Collection();
		this.request = new XMLHttpRequest();
		
	}));
	HTTPRequest.setProp("getParams", function() {
		
		return this.params.join("&");
		
	});
	HTTPRequest.setProp("setParam", function(key, value) {
		
		this.params.append(key + "=" + value);
		return this;
		
	});
	HTTPRequest.setProp("contentTypeHeader", "application/x-www-form-urlencoded; charset=UTF-8");
	HTTPRequest.setProp("acceptHeader", "*/*");
	
	var HTTPGetRequest = HTTP.defineClass("PUBLIC", "DYNAMIC", "HTTPGetRequest", ROCK.createClass(HTTPRequest, function(url) {
		
		this.inherits(url);
		
	}));
	HTTPGetRequest.setProp("type", "GET");
	HTTPGetRequest.setProp("send", function() {
	
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
		
	});
	
	var HTTPPostRequest = HTTP.defineClass("PUBLIC", "DYNAMIC", "HTTPPostRequest", ROCK.createClass(HTTPRequest, function(url) {
		
		this.inherits(url);
		
	}));
	HTTPPostRequest.setProp("type", "POST");
	HTTPPostRequest.setProp("send", function() {
		
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
	
	});

})();(function() {
	
	var JQUERY = ROCK.defineClass("PUBLIC", "STATIC", "JQUERY", ROCK.createClass(Object, function JQUERY() {}));
	JQUERY.setProp("createNode", function(nodeName) {
		
		return $(document.createElement(nodeName));
	
	});
	JQUERY.setProp("getNode", function(id) {
		
		return $(document.getElementById(id));
		
	});

})();(function() {
	
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
	
})();(function() {

	var SORT = ROCK.defineClass("PUBLIC", "STATIC", "SORT", ROCK.createClass(Object, function SORT() {}));
	SORT.setProp("NUMBER_ASCENDING", function(prop) {
		return function(a, b) {
			return a[prop]-b[prop];	
		};
	});
	SORT.setProp("NUMBER_DESCENDING", function(prop) {
		return function(a, b) {
			return b[prop]-a[prop];
		};
	});
	SORT.setProp("STRING_ASCENDING", function(prop) {
		return function(a, b) {
			if(a[prop]<b[prop]) {
				return -1;
			}
			else if(a[prop]>b[prop]) {
				return 1;
			}
			else {
				return 0;
			};
		};
	});
	SORT.setProp("STRING_DESCENDING", function(prop) {	
		return function(a, b) {
			if(b[prop]<a[prop]) {
				return -1;
			}
			else if(b[prop]>a[prop]) {
				return 1;
			}
			else {
				return 0;
			};
		};
	});
	
})();