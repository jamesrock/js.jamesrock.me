(function() {
	
	var JQUERY = ROCK.defineClass("PUBLIC", "STATIC", "JQUERY", ROCK.createClass(Object, function JQUERY() {}));
	JQUERY.setProp("createNode", function(nodeName) {
		
		return $(document.createElement(nodeName));
	
	});
	JQUERY.setProp("getNode", function(id) {
		
		return $(document.getElementById(id));
		
	});

})();