(function() {
	
	var EventDispatcher = ROCK.defineClass("PUBLIC", "DYNAMIC", "EventDispatcher", ROCK.createClass(Object, function EventDispatcher() {
		
		this.events = new ROCK.Collection();
		
	}));
	EventDispatcher.setProp("addEventListener", function(event, handler) {
		
		this.events.append({name: event.name, handler: handler});
		
		return this;
		
	});
	EventDispatcher.setProp("removeEventListener", function(event, handler) {	
		
		this.events.remove(this.events.filter(function(evt) {
			
			return evt.handler===handler;
			
		}).first());
		
		return this;
		
	});
	EventDispatcher.setProp("dispatchEvent", function(evt) {	
		
		this.events.filter(function(event) {
			
			return event.name===evt.name;
			
		}).each(function(event) {
			
			event.handler();
			
		});
		
		return this;
		
	});
	
})();