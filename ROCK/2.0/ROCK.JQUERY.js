(function() {
	
	var JQUERY = ROCK.prop("JQUERY", ROCK.createClass("STATIC", Object, function() {}));
	JQUERY.prop("createNode", function(nodeName) {
		
		return $(document.createElement(nodeName));
	
	});
	JQUERY.prop("getNode", function(id) {
		
		return $(document.getElementById(id));
		
	});

})();