(function() {
	
	ROCK.EventDispatcher = ROCK.Object.extend({
		constructor: function EventDispatcher() {

			console.log("new EventDispatcher");

		},
		setupEventDispatcher: function() {

			this.events = new ROCK.Collection();

		},
		bind: function(name, handler, context) {

			this.events.push({
				name: name,
				handler: handler,
				context: context,
				active: true
			});

			return this;

		},
		unbind: function(name, handler, context) {

			this.events.filter(function(e) {
				return (e.name===name||e.handler===handler)&&e.active;
			}).each(function(e) {
				e.active = false;
			});

			return this;

		},
		trigger: function(name) {

			this.events.filter(function(e) {
				return e.name===name&&e.active;
			}).each(function(e) {
				e.handler.call(e.context);
			});

			return this;

		}
	});

})();