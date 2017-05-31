(function() {

	var DOM = ROCK.proto.DOM = ROCK.createStatic(ROCK.createClass(Object, function DOM() {}));
	DOM.proto.getNode = function(id) {

		return new StaticDOMNode(document.getElementById(id));

	};

	var DOMNode = ROCK.createClass(Object, function DOMNode() {});
	DOMNode.proto.appendTo = function(a) {
		
		a.node.appendChild(this.node);
		return this;

	};
	DOMNode.proto.prependTo = function(a) {
		
		a.node.appendChild(this.node);
		return this;

	};
	DOMNode.proto.append = function(a) {
		
		this.node.appendChild(a.node);
		return this;

	};
	DOMNode.proto.prepend = function(a) {
		
		this.node.appendChild(a.node);
		return this;

	};
	DOMNode.proto.attr = function(a, b) {

		this.node.setAttribute(a, b);
		return this;

	};
	DOMNode.proto.empty = function() {

		this.html("");
		return this;

	};
	DOMNode.proto.html = function(a) {

		this.node.innerHTML = a;
		return this;

	};
	DOMNode.proto.on = function(a, b) {

		this.node.addEventListener(a, b);
		this.events.append({name:a, handler: b});
		return this;

	};
	DOMNode.proto.off = function(a, b) {

		
		return this;

	};
	DOMNode.proto.trigger = function(a, b) {

		this.events.filter(function(e) {
			return e.name===a;
		}).each(function(e) {
			e.handler(b);
		});
		return this;

	};
	DOMNode.proto.setValue = function(a) {

		this.node.value = a;
		return this;

	};
	DOMNode.proto.getValue = function() {

		return this.node.value;

	};

	var StaticDOMNode = ROCK.createClass(DOMNode, function StaticDOMNode(node) {

		this.node = node;

	});
	
	var DynamicDOMNode = ROCK.createClass(DOMNode, function DynamicDOMNode() {});
	DynamicDOMNode.proto.construct = function(a) {
		
		//this.events = new ROCK.Collection();
		this.node = document.createElement(this.nodeName);

	};
	
	var InputNode = DOM.proto.InputNode = ROCK.createClass(DynamicDOMNode, function InputNode() {

		this.construct();

	});
	InputNode.proto.nodeName = "input";

	var FileInputNode = DOM.proto.FileInputNode = ROCK.createClass(InputNode, function FileInputNode() {

		this.construct();
		this.attr("type", "file");

	});

	var TextInputNode = DOM.proto.TextInputNode = ROCK.createClass(InputNode, function TextInputNode() {

		this.construct();
		this.attr("type", "text");

	});

	var DivNode = DOM.proto.DivNode = ROCK.createClass(DynamicDOMNode, function DivNode() {
			
		this.construct();

	});
	DivNode.proto.nodeName = "div";

	var SpanNode = DOM.proto.SpanNode = ROCK.createClass(DynamicDOMNode, function SpanNode() {
			
		this.construct();

	});
	SpanNode.proto.nodeName = "span";

	var ImgNode = DOM.proto.ImgNode = ROCK.createClass(DynamicDOMNode, function ImgNode() {

		this.construct();

	});
	ImgNode.proto.nodeName = "img";

	var AnchorNode = DOM.proto.AnchorNode = ROCK.createClass(DynamicDOMNode, function AnchorNode() {

		this.construct();

	});
	AnchorNode.proto.nodeName = "a";

	var SelectNode = DOM.proto.SelectNode = ROCK.createClass(DynamicDOMNode, function SelectNode() {

		this.construct();

	});
	SelectNode.proto.setItem = function(label, value) {

		new OptionNode().attr("value", value).html(label).appendTo(this);

	};
	SelectNode.proto.nodeName = "select";

	var OptionNode = DOM.proto.OptionNode = ROCK.createClass(DynamicDOMNode, function OptionNode() {

		this.construct();

	});
	OptionNode.proto.nodeName = "option";

	var TextAreaNode = DOM.proto.TextAreaNode = ROCK.createClass(DynamicDOMNode, function TextAreaNode() {

		this.construct();

	});
	TextAreaNode.proto.nodeName = "textarea";

	var BodyNode = DOM.proto.BodyNode = ROCK.createClass(DynamicDOMNode, function BodyNode() {

		this.node = document.body;

	});
	
	var ButtonNode = DOM.proto.ButtonNode = ROCK.createClass(DynamicDOMNode, function ButtonNode(label) {

		this.construct();
		this.html(label);

	});
	ButtonNode.proto.nodeName = "button";

})();