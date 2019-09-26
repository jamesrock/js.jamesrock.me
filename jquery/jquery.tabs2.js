$.fn.tabs2 = function(options) {

	var
	settings = $.extend({
		handler: 'a.tab-handler',
		attr: 'href'
	}, options);

	return this.each(function() {

		var
		$this = $(this),
		handlers = $this.find(settings.handler).each(function() {

			var
			open = false,
			handler = $(this).on('click', function() {

				handlers.trigger('close');
				handler.trigger('open');
				return false;

			}).on('open', function() {

				open = true;
				panel.attr('data-open', open);
				handler.attr('data-open', open);

			}).on('close', function() {

				open = false;
				panel.attr('data-open', open);
				handler.attr('data-open', open);

			}),
			selector = handler.attr(settings.attr),
			panel = $(selector);

		});

		handlers.trigger('close').first().trigger('open');

	});

};
