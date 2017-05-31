(function() {

	var 
	createClass = function(type, inherits, constructor) {
		
		var 
		pw = function() {},
		i = inherits,
		c = constructor,
		p;
		
		pw.prototype = i.prototype;
		
		p = c.prototype = new pw();
		p.prototype = p;
		c.constructor = p.constructor = c;
		c.inherits = p.inherits = i;
		c.prop = p.prop = prop;

		if(type==="STATIC") {
			c = new c();
		};

		return c;
		
	},
	prop = function(key, value) {
		
		this.prototype[key] = value;
		return value;
		
	};
	
	ROCK = createClass("STATIC", Object, function ROCK() {});
	ROCK.prop("createClass", createClass);

})();(function() {
	
	var Collection = ROCK.prop("Collection", ROCK.createClass("DYNAMIC", Array, function Collection() {}));
	Collection.prop("getItemByKeyValue", function(key, value) {
			
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
	Collection.prop("getItemsByKeyValue", function(key, value) {
	
		return this.filter(function(item) {
			
			return item[key]===value;
			
		});
		
	});
	Collection.prop("append", function(item) {
		
		this.push(item);
		return item;
		
	});
	Collection.prop("prepend", function(item) {
		
		this.unshift(item);
		return item;
		
	});
	Collection.prop("exists", function(value) {
	
		return (this.indexOf(value)>-1);
		
	});
	Collection.prop("filter", function(fn) {
		
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
	Collection.prop("each", function(fn) {
	
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
	Collection.prop("getRandom", function(min, max) {
		
		max = (max||(this.length-1));
		return this[ROCK.NUMBER.getRandom(min, max)];
		
	});
	Collection.prop("remove", function(item) {
			
		return this.removeAt(this.getIndexOf(item));
		
	});
	Collection.prop("removeAt", function(index) {
		
		this.splice(index, 1);
		return this;
	
	});
	Collection.prop("addAt", function(item, index) {
			
		this.splice(index, 0, item);
		return item;
		
	});
	Collection.prop("first", function() {
			
		return this[0];
		
	});
	Collection.prop("last", function() {
			
		return this[this.length-1];
		
	});
	Collection.prop("swap", function(aIndex, bIndex) {
		
		var 
		aProp = this[aIndex],
		bProp = this[bIndex];
		
		this[aIndex] = bProp;
		this[bIndex] = aProp;
		
		return this;
		
	});

})();(function() {
	
	var NUMBER = ROCK.prop("NUMBER", ROCK.createClass("STATIC", Object, function NUMBER() {}));
	NUMBER.prop("getRandom", function(min, max) {
		
		min = (min||0);
		max = (max||100);
		max = (max+1);
		
		return Math.floor(Math.random()*(max-min)+min);
	
	});
	NUMBER.prop("toHundredth", function(number) {
		
		return this.roundTo(number, 100);
	
	});
	NUMBER.prop("floorTo", function(number, to) {
		
		return (Math.floor(number*to)/to);
	
	});
	NUMBER.prop("roundTo", function(number, to) {
		
		return (Math.round(number*to)/to);
	
	});
	NUMBER.prop("ceilTo", function(number, to) {
		
		return (Math.ceil(number*to)/to);
	
	});
	NUMBER.prop("toCurrency", function(number) {
		
		return number.toFixed(2);
	
	});
	NUMBER.prop("getXPercentOfY", function(x, y) {
		
		return (y*(x/100));
	
	});
	NUMBER.prop("getXAsPercentOfY", function(x, y) {
		
		return ((x/y)*100);
	
	});
	
})();(function() {

	var SORT = ROCK.prop("SORT", ROCK.createClass("STATIC", Object, function SORT() {}));
	SORT.prop("NUMBER_ASCENDING", function(prop) {
		return function(a, b) {
			return a[prop]-b[prop];	
		};
	});
	SORT.prop("NUMBER_DESCENDING", function(prop) {
		return function(a, b) {
			return b[prop]-a[prop];
		};
	});
	SORT.prop("STRING_ASCENDING", function(prop) {
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
	SORT.prop("STRING_DESCENDING", function(prop) {	
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
	
})();(function() {

	var HTTP = ROCK.prop("HTTP", ROCK.createClass("STATIC", Object, function() {}));
	HTTP.prop("getScript", function(url, callback) {

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

	var HTTPRequest = ROCK.prop("HTTPRequest", ROCK.createClass("DYNAMIC", Object, function(url) {
		
		this.url = url;
		this.params = new ROCK.Collection();
		this.request = new XMLHttpRequest();
		
	}));
	HTTPRequest.prop("getParams", function() {
		
		return this.params.join("&");
		
	});
	HTTPRequest.prop("setParam", function(key, value) {
		
		this.params.append(key + "=" + value);
		return this;
		
	});
	HTTPRequest.prop("contentTypeHeader", "application/x-www-form-urlencoded; charset=UTF-8");
	HTTPRequest.prop("acceptHeader", "*/*");
	
	var HTTPGetRequest = HTTP.prop("HTTPGetRequest", ROCK.createClass("DYNAMIC", HTTPRequest, function(url) {
		
		this.inherits(url);
		
	}));
	HTTPGetRequest.prop("type", "GET");
	HTTPGetRequest.prop("send", function() {
	
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
	
	var HTTPPostRequest = HTTP.prop("HTTPPostRequest", ROCK.createClass("DYNAMIC", HTTPRequest, function(url) {
		
		this.inherits(url);
		
	}));
	HTTPPostRequest.prop("type", "POST");
	HTTPPostRequest.prop("send", function() {
		
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

	var 
	chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	chars = chars.reverse(),
	charsCount = chars.length;
	
	var GuidCharCollection = ROCK.createClass("STATIC", ROCK.Collection, function GuidCharCollection() {

		while(charsCount--) {
			this.append(chars[charsCount]);
		};
		
	});
	
	var GUID = ROCK.prop("GUID", ROCK.createClass("STATIC", Object, function GUID() {}));
	GUID.prop("length", 10);
	GUID.prop("get", function() {
			
		var
		_return = GuidCharCollection.getRandom(0, 50),
		lengthOf = (this.length-1);
		
		while(lengthOf--) {
		
			_return += GuidCharCollection.getRandom();
		
		};
		
		return _return;
		
	});
	
})();(function() {

	var DOM = ROCK.prop("DOM", ROCK.createClass("STATIC", Object, function DOM() {}));
	DOM.prop("getNode", function(id) {

		return new StaticDOMNode(document.getElementById(id));

	});

	var DOMNode = ROCK.createClass("DYNAMIC", Object, function DOMNode() {});
	DOMNode.prop("appendTo", function(a) {
		
		a.node.appendChild(this.node);
		return this;

	});
	DOMNode.prop("prependTo", function(a) {
		
		a.node.appendChild(this.node);
		return this;

	});
	DOMNode.prop("append", function(a) {
		
		this.node.appendChild(a.node);
		return this;

	});
	DOMNode.prop("prepend", function(a) {
		
		this.node.appendChild(a.node);
		return this;

	});
	DOMNode.prop("attr", function(a, b) {

		this.node.setAttribute(a, b);
		return this;

	});
	DOMNode.prop("empty", function() {

		this.html("");
		return this;

	});
	DOMNode.prop("html", function(a) {

		this.node.innerHTML = a;
		return this;

	});
	DOMNode.prop("on", function(a, b) {

		this.node.addEventListener(a, b);
		this.events.append({name:a, handler: b});
		return this;

	});
	DOMNode.prop("off", function(a, b) {

		
		return this;

	});
	DOMNode.prop("trigger", function(a, b) {

		this.events.filter(function(e) {
			return e.name===a;
		}).each(function(e) {
			e.handler(b);
		});
		return this;

	});
	DOMNode.prop("setValue", function(a) {

		this.node.value = a;
		return this;

	});
	DOMNode.prop("getValue", function() {

		return this.node.value;

	});

	var StaticDOMNode = ROCK.createClass("DYNAMIC", DOMNode, function StaticDOMNode(node) {

		this.node = node;

	});
	
	var DynamicDOMNode = ROCK.createClass("DYNAMIC", DOMNode, function DynamicDOMNode() {});
	DynamicDOMNode.prop("construct", function(a) {
		
		//this.events = new ROCK.Collection();
		this.node = document.createElement(this.nodeName);

	});
	
	var InputNode = DOM.prop("InputNode", ROCK.createClass("DYNAMIC", DynamicDOMNode, function InputNode() {

		this.construct();

	}));
	InputNode.prop("nodeName", "input");

	var FileInputNode = DOM.prop("FileInputNode", ROCK.createClass("DYNAMIC", InputNode, function FileInputNode() {

		this.construct();
		this.attr("type", "file");

	}));

	var TextInputNode = DOM.prop("TextInputNode", ROCK.createClass("DYNAMIC", InputNode, function TextInputNode() {

		this.construct();
		this.attr("type", "text");

	}));

	var DivNode = DOM.prop("DivNode", ROCK.createClass("DYNAMIC", DynamicDOMNode, function DivNode() {

		this.construct();

	}));
	DivNode.prop("nodeName", "div");

	var ImgNode = DOM.prop("ImgNode", ROCK.createClass("DYNAMIC", DynamicDOMNode, function ImgNode() {

		this.construct();

	}));
	ImgNode.prop("nodeName", "img");

	var AnchorNode = DOM.prop("AnchorNode", ROCK.createClass("DYNAMIC", DynamicDOMNode, function AnchorNode() {

		this.construct();

	}));
	AnchorNode.prop("nodeName", "a");

	var SelectNode = DOM.prop("SelectNode", ROCK.createClass("DYNAMIC", DynamicDOMNode, function SelectNode() {

		this.construct();

	}));
	SelectNode.prop("setItem", function(label, value) {

		new OptionNode().attr("value", value).html(label).appendTo(this);

	});
	SelectNode.prop("nodeName", "select");

	var OptionNode = DOM.prop("OptionNode", ROCK.createClass("DYNAMIC", DynamicDOMNode, function OptionNode() {

		this.construct();

	}));
	OptionNode.prop("nodeName", "option");

	var TextAreaNode = DOM.prop("TextAreaNode", ROCK.createClass("DYNAMIC", DynamicDOMNode, function TextAreaNode() {

		this.construct();

	}));
	TextAreaNode.prop("nodeName", "textarea");

	var BodyNode = DOM.prop("BodyNode", ROCK.createClass("DYNAMIC", DynamicDOMNode, function BodyNode() {

		this.node = document.body;

	}));
	
	var ButtonNode = DOM.prop("ButtonNode", ROCK.createClass("DYNAMIC", DynamicDOMNode, function ButtonNode(label) {

		this.construct();
		this.html(label);

	}));
	ButtonNode.prop("nodeName", "button");

})();(function() {
	
	var JQUERY = ROCK.prop("JQUERY", ROCK.createClass("STATIC", Object, function() {}));
	JQUERY.prop("createNode", function(nodeName) {
		
		return $(document.createElement(nodeName));
	
	});
	JQUERY.prop("getNode", function(id) {
		
		return $(document.getElementById(id));
		
	});

})();