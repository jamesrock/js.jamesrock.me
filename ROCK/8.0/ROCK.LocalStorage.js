(function() {

	ROCK.LocalStorage = ROCK.Object.extend({
		constructor: function LocalStorage(namespace) {

			this.namespace = namespace;

		},
		get: function(key) {

			var
			existing = this.fetch();

			return existing[key];

		},
		set: function(key, value) {

			var
			existing = this.fetch();

			existing[key] = value;

			this.commit(existing);

			return this;

		},
		remove: function(key) {

			var
			existing = this.fetch();

			delete existing[key];

			this.commit(existing);

			return this;

		},
		fetch: function() {

			return JSON.parse(localStorage.getItem(this.namespace)||"{}");

		},
		clear: function() {

			this.commit({});

		},
		commit: function(obj) {

			localStorage.setItem(this.namespace, JSON.stringify(obj));

		}
	});
	
})();
