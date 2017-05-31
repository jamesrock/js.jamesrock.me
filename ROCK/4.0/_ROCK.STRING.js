(function() {
	
	var STRING = ROCK.proto("STRING", ROCK.createClass(Object, function STRING() {});
	STRING.setProp("unencode", function(value) {
			
		// create node and fetch it's HTML text
	
	});	
	STRING.setProp("SQLEscape", function(value) {
	
		return value.replace("'", "''", "g");
		
	});
	STRING.setProp("encode", function(string) {
		
		var 
		_return = 1,
		stringLength = string.length;
		
		while(stringLength--) {
			
			_return = (_return*string.charCodeAt(stringLength))
			
		};
		
		return _return;
		
	});
	
})();