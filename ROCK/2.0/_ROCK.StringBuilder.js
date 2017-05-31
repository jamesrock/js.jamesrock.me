(function() {
	
	var StringBuilder = ROCK.defineClass("PUBLIC", "DYNAMIC", "StringBuilder", ROCK.createClass(ROCK.Collection, function StringBuilder() {}));
	StringBuilder.setProp("prependLine", function(value) {
			
		value = (value||"");
		this.prepend(value + (this.length?"\n":""));
		return this;
		
	});
	StringBuilder.setProp("appendLine", function(value) {
		
		value = (value||"");	
		this.append((this.length?"\n":"") + value);
		return this;
		
	});
	
})();