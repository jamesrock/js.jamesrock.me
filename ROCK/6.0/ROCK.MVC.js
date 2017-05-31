(function() {

	ROCK.Model = ROCK.EventDispatcher.extend({
		constructor: function Model() {

			this.setupEventDispatcher();

			attributes = (attributes||{});

			this.attributes = attributes;

			this.url = this.url();

			this.initialize();
			
		},
		initialize: function() {

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
			oldAttributes = model.previousAttributes,
			newAttributes = model.attributes,
			changed = false;

			for(var attribute in newAttributes) {
				if(newAttributes[attribute]!==oldAttributes[attribute]) {
					model.trigger("changed:" + attribute);
					changed = true;
				};
			};

			if(changed) {
				model.trigger("changed");
			};

		},
		url: function() {

			return null;

		},
		attributes: {},
		previousAttributes: {}
	});
	
	ROCK.View = ROCK.EventDispatcher.extend({
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

	ROCK.Controller = ROCK.EventDispatcher.extend({
		constructor: function Controller() {

		}
	});

	ROCK.Router = ROCK.EventDispatcher.extend({
		constructor: function Router() {

		},
		start: function() {
			
		}
	});

})();