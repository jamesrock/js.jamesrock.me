(function() {

	ROCK.GUID = {
		chars: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
		get: function() {
			
			var
			_return = ROCK.ARRAY.random(this.chars, 0, 50),
			lengthOf = (this.length-1);
			
			while(lengthOf--) {
				_return += ROCK.ARRAY.random(this.chars);
			};
			
			return _return;
			
		},
		length: 10
	};
	
})();
