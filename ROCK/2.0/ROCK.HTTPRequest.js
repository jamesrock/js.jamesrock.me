(function() {
	
	var HTTPParamCollection = ROCK.createClass("DYNAMIC", ROCK.Collection, function HTTPParamCollection() {});
	HTTPParamCollection.prop("toParamString", function() {
		
		return this.join("&");
		
	});
	HTTPParamCollection.prop("setParam", function(key, value) {
		
		this.append(key + "=" + value);
		return this;
		
	});

	var HTTPRequest = ROCK.prop("HTTPRequest", ROCK.createClass("DYNAMIC", Object, function HTTPRequest(type, url) {
		
		this.url = url;
		this.type = type;
		this.params = new HTTPParamCollection();
		this.request = new XMLHttpRequest();
		
	}));
	HTTPRequest.prop("send", function() {
		
		var
		_this = this,
		request = _this.request,
		url = _this.url,
		data = null;
		
		request.onreadystatechange = function onreadystatechange() {
			if(this.readyState===4) {
				_this.onComplete(request.responseText);
			};
		};
		
		if(this.type==="GET"&&this.params.length) {
			url = (this.url + "?" + this.params.toParamString());
		};

		if(this.type==="POST") {
			data = this.params.toParamString();
		};

		request.open(this.type, url, true);
		request.setRequestHeader("Content-Type", this.contentTypeHeader);
		request.setRequestHeader("Accept", this.acceptHeader);
		request.send(data);
	
	});
	HTTPRequest.prop("abort", function() {
		
		this.request.abort();
	
	});
	HTTPRequest.prop("contentTypeHeader", "application/x-www-form-urlencoded; charset=UTF-8");
	HTTPRequest.prop("acceptHeader", "*/*");

})();