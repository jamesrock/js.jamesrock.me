(function() {

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

})();