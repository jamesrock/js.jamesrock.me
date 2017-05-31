(function() {

	var HTTP = ROCK.prop("HTTP", ROCK.createClass("STATIC", Object, function() {}));
	HTTP.prop("getScript", function(url, callback) {

		var 
		CALLBACK_NAME = ("callback" + ROCK.GUID.get()),
		url = (url + "&callback=ROCK.HTTP." + CALLBACK_NAME),
		loaderScript = ROCK.JQUERY.createNode("script").attr("src", url).attr("async", "true");

		ROCK.HTTP[CALLBACK_NAME] = function(json) {
		
			callback(json);
			loaderScript.remove();
			delete ROCK.HTTP[CALLBACK_NAME];
			
		};
		
		loaderScript.appendTo("body");

	});

	var HTTPRequest = ROCK.prop("HTTPRequest", ROCK.createClass("DYNAMIC", Object, function(url) {
		
		this.url = url;
		this.params = new ROCK.Collection();
		this.request = new XMLHttpRequest();
		
	}));
	HTTPRequest.prop("getParams", function() {
		
		return this.params.join("&");
		
	});
	HTTPRequest.prop("setParam", function(key, value) {
		
		this.params.append(key + "=" + value);
		return this;
		
	});
	HTTPRequest.prop("contentTypeHeader", "application/x-www-form-urlencoded; charset=UTF-8");
	HTTPRequest.prop("acceptHeader", "*/*");
	
	var HTTPGetRequest = HTTP.prop("HTTPGetRequest", ROCK.createClass("DYNAMIC", HTTPRequest, function(url) {
		
		this.inherits(url);
		
	}));
	HTTPGetRequest.prop("type", "GET");
	HTTPGetRequest.prop("send", function() {
	
		//console.log("HTTPGetRequest.send();", this.type);
		
		var
		_HTTPRequest = this,
		request = _HTTPRequest.request;
		
		request.onreadystatechange = function onreadystatechange() {
			
			if(this.readyState===4) {
				
				_HTTPRequest.onComplete(request.responseText);
			
			};
			
		};
		
		request.open(this.type, (this.url + "?" + this.getParams()), true);
		request.setRequestHeader("Content-Type", this.contentTypeHeader);
		request.setRequestHeader("Accept", this.acceptHeader);
		request.send();
		
	});
	
	var HTTPPostRequest = HTTP.prop("HTTPPostRequest", ROCK.createClass("DYNAMIC", HTTPRequest, function(url) {
		
		this.inherits(url);
		
	}));
	HTTPPostRequest.prop("type", "POST");
	HTTPPostRequest.prop("send", function() {
		
		var
		_HTTPRequest = this,
		request = _HTTPRequest.request;
		
		request.onreadystatechange = function onreadystatechange() {
			
			if(this.readyState===4) {
				
				_HTTPRequest.onComplete(request.responseText);
			
			};
			
		};
		
		request.open(this.type, this.url, true);
		request.setRequestHeader("Content-Type", this.contentTypeHeader);
		request.setRequestHeader("Accept", this.acceptHeader);
		request.send(this.getParams());
	
	});

})();