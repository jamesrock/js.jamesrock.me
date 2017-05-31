(function() {

	ROCK.DOM = {
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
