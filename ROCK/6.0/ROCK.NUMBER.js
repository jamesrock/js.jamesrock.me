(function() {
	
	var NUMBER = ROCK.NUMBER = {};
	NUMBER.toCurrency = function(n) {

		var 
		isNagative = false,
		_return,
		toReplace = "",
		_RegExp;

		n = Number(n);

		if(n<0) {
			isNagative = true;
			n = (n*-1);
		};

		_return = n.toFixed(2);

		if(n>=10000) {
			toReplace = [_return[0], _return[1]].join("");
			_RegExp = new RegExp("^" + toReplace);
		}
		else if(n>=1000) {
			toReplace = [_return[0]].join("");
			_RegExp = new RegExp("^" + toReplace);
		};

		_return = _return.replace(_RegExp, (toReplace + ","));
		
		if(isNagative) {
			_return = ("-" + _return);
		};

		return _return;

	};
	
})();