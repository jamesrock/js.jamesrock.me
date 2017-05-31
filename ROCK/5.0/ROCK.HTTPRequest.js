(function() {
	
	var HTTPParamCollection = ROCK.createClass(ROCK.Collection, function HTTPParamCollection() {});
	HTTPParamCollection.prototype.toParamString = function() {
		
		return this.join("&");
		
	};
	HTTPParamCollection.prototype.setParam = function(key, value) {
		
		this.append(key + "=" + value);
		return this;
		
	};

	var HTTPRequest = ROCK.HTTPRequest = ROCK.createClass(Object, function HTTPRequest(type, url) {
		
		this.url = url;
		this.type = type;
		this.params = new HTTPParamCollection();
		this.request = new XMLHttpRequest();
		
	});
	HTTPRequest.prototype.send = function() {
		
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
	
	};
	HTTPRequest.prototype.abort = function() {
		
		this.request.abort();
	
	};
	HTTPRequest.prototype.contentTypeHeader = "application/x-www-form-urlencoded; charset=UTF-8";
	HTTPRequest.prototype.acceptHeader = "*/*";

})();