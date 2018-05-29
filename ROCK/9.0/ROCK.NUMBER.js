(function() {
	
	ROCK.NUMBER = {
		format: function(n) {

			// amend to handle digits after decimal place

			n = n.toString();

			var
			length = n.length,
			_split = n.split("").reverse();

			while(length--) {

				if(length%3===0&&length>0) {
					_split.splice(length, 0, ",");
				};

			};

			return _split.reverse().join("");

		},
		expoToLong: function(n) {

			n = n.toString();
			
			var 
			_split = n.split("e+"),
			first = _split[0].replace(".", ""),
			second = _split[1],
			zeroes = Number(second);

			zeroes = (zeroes - (first.length-1));

			while(zeroes--) {
				first += "0";
			};

			return first;

		},
		toDouble: function(n) {

			n = n.toString();

			if(n<10) {
				n = ("0"+n);
			};

			return n;

		}
	};
	
})();
