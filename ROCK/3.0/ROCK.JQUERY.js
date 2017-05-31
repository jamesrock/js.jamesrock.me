(function() {
	
	var JQUERY = ROCK.createClass(Object, function JQUERY() {});
	JQUERY.proto("createNode", function(nodeName) {
		
		return $(document.createElement(nodeName));
	
	});
	JQUERY.proto("getNode", function(id) {
		
		return $(document.getElementById(id));
		
	});

	ROCK.proto("JQUERY", new JQUERY());

})();