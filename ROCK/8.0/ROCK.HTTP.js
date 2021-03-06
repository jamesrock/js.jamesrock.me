(function() {

	ROCK.HTTP = {};

	HTTPRequest = ROCK.Object.extend({
		constructor: function HTTPRequest(url, callback) {
		
			this.url = url;
			this.request = new XMLHttpRequest();

			this.request.onreadystatechange = function() {
				if(this.readyState===4) {
					callback(JSON.parse(this.responseText));
				};
			};
			
		},
		paramsToJSON: function() {
			
			return JSON.stringify(this.params);

		},
		paramCheck: function() {
			
			for(var param in this.params) {
				return true;
			};
			return false;

		},
		setParam: function(key, value) {
			
			this.params[key] = value;
			return this;

		},
		getParam: function(key) {
			
			return this.params[key];

		},
		removeParam: function(key, value) {
			
			delete this.params[key];
			return this;

		},
		setHeader: function(key, value) {
			
			this.headers[key] = value;
			return this;

		},
		addHeaders: function() {
			
			for(var header in this.headers) {
				this.request.setRequestHeader(header, this.headers[header]);
			};
			return this;

		},
		abort: function() {
			
			this.request.abort();

		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			"Accept": "*/*"
		},
		params: {},
		dataType: "json"
	});
	
	ROCK.HTTP.GET = HTTPRequest.extend({
		send: function() {

			var
			url = this.url;

			if(this.paramCheck()) {
				url += ("?" + this.paramsToJSON());
			};
			
			this.request.open(this.type, url, true);
			this.addHeaders();
			this.request.send();
			
		},
		type: "GET"
	});
	
	ROCK.HTTP.POST = HTTPRequest.extend({
		send: function() {
			
			this.request.open(this.type, this.url, true);
			this.addHeaders();
			this.request.send(this.paramCheck()?this.paramsToJSON():null);
		
		},
		type: "POST"
	});

	ROCK.HTTP.makeURL = function(url, params) {

		

	};

})();
