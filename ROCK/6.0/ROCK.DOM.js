(function() {

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

})();