(function() {

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

})();