(function() {

	var
	body = document.body,
	head = document.head;

	loader = function(modules, callback) {

		var
		modulesCount = (modules.length-1),
		moduleInc = 0,
		output = [],
		getModule = function(src) {

			var
			scriptNode = document.createElement("script");

			scriptNode.addEventListener("load", function() {

				if(moduleInc<modulesCount) {
					moduleInc ++;
					getModule(modules[moduleInc]);
				}
				else if(callback) {
					callback("cat " + output.join(" ") + " > all.js");
				};

			});

			scriptNode.src = src;
			body.appendChild(scriptNode);

			output.push(src);

		};

		getModule(modules[moduleInc]);

	};

})();
