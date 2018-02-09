(function() {

	ROCK.STRING = {
		replacer: function(string, replacers) {
			var out = string;
			for(var replacer in replacers) {
				out = out.replace('{' + replacer + '}', replacers[replacer]);
			};
			return out;
		}
	};

})();
