(function() {
	
	var JQUERY = ROCK.JQUERY = {};
	JQUERY.createNode = function(nodeName) {
		
		return $(document.createElement(nodeName));
	
	};
	JQUERY.getNode = function(id) {
		
		return $(document.getElementById(id));
		
	};
	
})();