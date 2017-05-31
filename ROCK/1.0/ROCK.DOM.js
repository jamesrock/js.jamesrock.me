(function() {

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

})();