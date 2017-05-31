(function() {

	// Model-ViewController

	ROCK.MVC = {};

	ROCK.MVC.Model = ROCK.EventDispatcher.extend({
		constructor: function Model(attributes) {

			this.setupEventDispatcher();

			attributes = (attributes||{});

			this.attributes = attributes;

			this.url = this.url();

			this.initialize();
			
		},
		initialize: function() {

			// stub

		},
		fetch: function() {

			var
			model = this;

			$.ajax({
				url: model.url,
				dataType: "json",
				method: "GET",
				success: function(modelJson) {

					model.previousAttributes = model.attributes;
					model.attributes = model.parse(modelJson);
					model.triggerChangedEvents();

				}
			});

		},
		save: function() {

			var
			model = this;

			$.ajax({
				url: model.url,
				dataType: "json",
				method: "POST",
				data: model.attributes,
				success: function(modelJson) {

					// model.attributes = modelJson;
					console.log("model saved!");

				}
			});

		},
		get: function(key) {

			return this.attributes[key];

		},
		set: function(key, value) {

			this.attributes[key] = value;
			return this;

		},
		parse: function(data) {

			return data;

		},
		triggerChangedEvents: function() {

			var
			model = this,
			attributes = model.attributes,
			changed = false;

			for(var attribute in attributes) {
				if(model.hasChanged(attribute)) {
					model.trigger("changed:" + attribute);
					changed = true;
				};
			};

			if(changed) {
				model.trigger("changed");
			};

		},
		hasChanged: function(attribute) {

			var
			model = this,
			_return = false;
			
			if(JSON.stringify(model.newAttributes[attribute])!==JSON.stringify(model.oldAttributes[attribute])) {
				_return = true;
			};

			return _return;

		},
		previous: function(attribute) {

			return this.previousAttributes[attribute];

		},
		url: function() {

			return null;

		},
		attributes: {},
		previousAttributes: {}
	});
	
	ROCK.MVC.View = ROCK.EventDispatcher.extend({
		constructor: function View() {

			this.setupEventDispatcher();

			this.el = this.el();
			this.$el = $(this.el);

			this.initialize();

		},
		initialize: function() {

		},
		render: function() {
			
		},
		el: function() {

			return document.createElement("div");

		}
	});

	ROCK.MVC.Controller = ROCK.EventDispatcher.extend({
		constructor: function Controller() {

		}
	});

	ROCK.MVC.Router = ROCK.EventDispatcher.extend({
		constructor: function Router() {

		},
		start: function() {

			var
			_this = this;

			window.addEventListener("hashchange", function() {
				
				_this.hashChangeHandler();

			});

			_this.hashChangeHandler();
			
		},
		hashChangeHandler: function() {

			var
			router = this,
			hash = location.hash,
			params,
			method;

			hash = hash.substring(1);
			params = hash.split("/");

			method = this.routes[hash];

			if(!method) {
				method = router.getMatch(params);
			};

			params.splice(0, 1);

			if(!router[method]) {
				console.warn(hash + " is not routed");
				return;
			};

			router[method].apply(router, params);

		},
		getMatch: function(params) {

			var
			_return = null,
			routeSplit;

			for(var route in this.routes) {

				routeSplit = route.split("/:");

				if(routeSplit[0]===params[0]&&routeSplit.length===params.length) {
					_return = this.routes[route];
					break;
				};

			};

			return _return;

		}
	});

	ROCK.MVC.Collection = ROCK.EventDispatcher.extend({
		constructor: function Collection() {

		}
	});

})();
