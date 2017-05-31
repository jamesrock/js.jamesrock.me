(function() {

	var 
	GuidCharCollection = ROCK.createClass(ROCK.Collection, function() {

		this.push("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");		
		
	});
	
	var GUID = ROCK.proto.GUID = ROCK.createStatic(ROCK.createClass(Object, function GUID() {

		this.chars = new GuidCharCollection();

	}));
	GUID.proto.length = 10;
	GUID.proto.get = function() {
			
		var
		_return = this.chars.getRandom(0, 50),
		lengthOf = (this.length-1);
		
		while(lengthOf--) {
		
			_return += this.chars.getRandom();
		
		};
		
		return _return;
		
	};
	
})();