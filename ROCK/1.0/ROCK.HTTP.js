(function() {

	var HTTP = ROCK.defineClass("PUBLIC", "STATIC", "HTTP", ROCK.createClass(Object, function() {}));
	HTTP.setProp("getScript", function(url, callback) {

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

	var HTTPRequest = ROCK.defineClass("PRIVATE", "DYNAMIC", "HTTPRequest", ROCK.createClass(Object, function(url) {
		
		this.url = url;
		this.params = new ROCK.Collection();
		this.request = new XMLHttpRequest();
		
	}));
	HTTPRequest.setProp("getParams", function() {
		
		return this.params.join("&");
		
	});
	HTTPRequest.setProp("setParam", function(key, value) {
		
		this.params.append(key + "=" + value);
		return this;
		
	});
	HTTPRequest.setProp("contentTypeHeader", "application/x-www-form-urlencoded; charset=UTF-8");
	HTTPRequest.setProp("acceptHeader", "*/*");
	
	var HTTPGetRequest = HTTP.defineClass("PUBLIC", "DYNAMIC", "HTTPGetRequest", ROCK.createClass(HTTPRequest, function(url) {
		
		this.inherits(url);
		
	}));
	HTTPGetRequest.setProp("type", "GET");
	HTTPGetRequest.setProp("send", function() {
	
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
	
	var HTTPPostRequest = HTTP.defineClass("PUBLIC", "DYNAMIC", "HTTPPostRequest", ROCK.createClass(HTTPRequest, function(url) {
		
		this.inherits(url);
		
	}));
	HTTPPostRequest.setProp("type", "POST");
	HTTPPostRequest.setProp("send", function() {
		
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