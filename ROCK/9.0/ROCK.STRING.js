(function() {

	ROCK.STRING = {
		replacer: function(string, replacers) {
			var out = string;
			for(var replacer in replacers) {
				out = out.replace(new RegExp('{' + replacer + '}', 'g'), replacers[replacer], 'g');
			};
			return out;
		}
	};

})();
