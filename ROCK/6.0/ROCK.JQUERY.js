(function() {
	
	ROCK.JQUERY = {
		createNode: function(nodeName) {
			
			return $(document.createElement(nodeName));
		
		},
		getNode: function(id) {
			
			return $(document.getElementById(id));
			
		}
	};
	
})();