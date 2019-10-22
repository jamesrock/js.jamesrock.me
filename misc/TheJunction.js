import easingAnimationFrames from 'easing-animation-frames';

console.log('TheJunction');

$.fn.header = function(options) {

  var
  settings = $.extend({
    collapse: 30
  }, options),
  $window = $(window);

  return this.each(function() {

    var
    $this = $(this).on('mouseenter', 'a[data-img]', function(e) {

      thumbnail.attr('data-show', 'true').attr('src', $(this).attr('data-img'));

    }).on('mouseleave', 'a[data-img]', function(e) {

      thumbnail.attr('data-show', 'false');

    }).on('contact', function() {

      contactIsOpen = !contactIsOpen;
      update();

    }),
    thumbnail = $(settings.thumbnail),
    searchIsOpen = false,
    contactIsOpen = false,
    navigationIsOpen = false,
    isCollapsed = false,
    searchHandler = $this.find(settings.searchHandle).on('click', function() {

      searchIsOpen = !searchIsOpen;
      update();

      return false;

    }),
    contactHandler = $this.find(settings.contactHandle).on('click', function() {

      contactIsOpen = !contactIsOpen;
      update();

      return false;

    }),
    navigationHandler = $this.find(settings.navigationHandle).on('click', function() {

      navigationIsOpen = !navigationIsOpen;
      update();

      roots.trigger('close');

      return false;

    }),
    roots = $this.find(settings.roots).each(function() {

      var
      isOpen = false,
      $this = $(this).on('click', function() {

        var
        _out = true;

        if(!isOpen&&$window.width()<768) {
          _out = false;
        };

        isOpen = !isOpen;
        update();

        return _out;

      }).on('close', function() {

        isOpen = false;
        update();

      }),
      update = function() {

        parent.attr('data-open', isOpen);

      },
      parent = $this.parent('li');

    }),
    update = function() {

      $this.attr('data-search-is-open', searchIsOpen);
      $this.attr('data-contact-is-open', contactIsOpen);
      $this.attr('data-navigation-is-open', navigationIsOpen);
      $this.attr('data-is-collapsed', isCollapsed);

    },
    preload = function() {

      var
      items = $this.find('a[data-img]').each(function() {

        var
        img = new Image();

        img.src = $(this).attr('data-img');

      });

      thumbnail.attr('data-show', 'false').attr('src', items.first().attr('data-img'));

    };

    update();
    preload();

    $window.on('scroll', function() {

      if($window.scrollTop()>settings.collapse) {
        isCollapsed = true;
      }
      else {
        isCollapsed = false;
      };

      update();

    });

  });

};

$.fn.popup = function() {

  return this.each(function() {

    var
    $this = $(this).on('open', function() {

      isopen = true;
      parent.attr('data-popup-open', isopen);

    }).on('close', function() {

      isopen = false;
      parent.attr('data-popup-open', isopen);

    }).on('click', function() {

      $this.trigger('open');
      return false;

    }),
    parent = $this.parent(),
    closer = parent.find('.closer').on('click', function() {

      $this.trigger('close');
      return false;

    }),
    isopen = false;

    $this.trigger('close');

  });

};

$.fn.truncate = function(options) {

  var
  settings = $.extend({

  }, options),
  $window = $(window),
  items = $(this);

  return this.each(function() {

    var
    $this = $(this).on('truncate', function() {

      var
      lineHeight = parseFloat($this.css('line-height')),
      height = parseFloat($this.css('height')),
      maxHeight = (lineHeight*settings.lines),
      toTruncate = (height>maxHeight);

      if(toTruncate) {

        var words = $this.data('text').split(' ');

        while(toTruncate) {
          words.pop();
          $this.html(words.join(' ') + '&hellip;');
          height = parseFloat($this.css('height'));
          toTruncate = height>maxHeight;
        };

      };

    });

    $this.data('text', $this.text());

  }).trigger('truncate');

  $window.on('resize', function() {

    items.trigger('truncate');

  });

};

$.fn.countr = function(options) {

	var
	settings = $.extend({
		easing: 'quadOut',
		duration: 2500,
		comparison: ' /'
	}, options),
	$window = $(window),
	getXPercentOfY = function(x, y) {

		return (y*(x/100));

	},
	floorTo = function(number, to) {

		return (Math.floor(number*to)/to);

	},
	zeros = function(number, base) {

		var
		out = number;

		switch(base) {
			case 10:
				if(out<10) {
					out = ('0' + out);
				};
			break;
			case 100:
				if(out<10) {
					out = ('00' + out);
				}
				else if(out<100) {
					out = ('0' + out);
				};
			break;
			case 1000:
				if(out<10) {
					out = ('000' + out);
				}
				else if(out<100) {
					out = ('00' + out);
				}
				else if(out<1000) {
					out = ('0' + out);
				};
			break;
			case 10000:
				if(out<10) {
					out = ('0000' + out);
				}
				else if(out<100) {
					out = ('000' + out);
				}
				else if(out<1000) {
					out = ('00' + out);
				}
				else if(out<10000) {
					out = ('0' + out);
				};
			break;
			case 100000:
				if(out<10) {
					out = ('00000' + out);
				}
				else if(out<100) {
					out = ('0000' + out);
				}
				else if(out<1000) {
					out = ('000' + out);
				}
				else if(out<10000) {
					out = ('00' + out);
				}
				else if(out<100000) {
					out = ('0' + out);
				};
			break;
			case 1000000:
				if(out<10) {
					out = ('000000' + out);
				}
				else if(out<100) {
					out = ('00000' + out);
				}
				else if(out<1000) {
					out = ('0000' + out);
				}
				else if(out<10000) {
					out = ('000' + out);
				}
				else if(out<100000) {
					out = ('00' + out);
				}
				else if(out<1000000) {
					out = ('0' + out);
				};
			break;
			case 10000000:
				if(out<10) {
					out = ('0000000' + out);
				}
				else if(out<100) {
					out = ('000000' + out);
				}
				else if(out<1000) {
					out = ('00000' + out);
				}
				else if(out<10000) {
					out = ('0000' + out);
				}
				else if(out<100000) {
					out = ('000' + out);
				}
				else if(out<1000000) {
					out = ('00' + out);
				}
				else if(out<10000000) {
					out = ('0' + out);
				};
			break;
		};

		return out;

	},
	types = [
		{
			name: 'numeric - units',
			test: function(string) {
				return string.match(/^[0-9]*$/gm)&&string>0;
			}
		},
		{
			name: 'numeric - tens',
			test: function(string) {
				return string.match(/^[0-9]*$/gm)&&string>9;
			}
		},
		{
			name: 'numeric - hundreds',
			test: function(string) {
				return string.match(/^[0-9]*$/gm)&&string>99;
			}
		},
		{
			name: 'numeric - thousands',
			test: function(string) {
				return string.match(/^[0-9]*$/gm)&&string>999;
			}
		},
		{
			name: 'numeric - tens of thousands',
			test: function(string) {
				return string.match(/^[0-9]*$/gm)&&string>9999;
			}
		},
		{
			name: 'numeric - hundreds of thousands',
			test: function(string) {
				return string.match(/^[0-9]*$/gm)&&string>99999;
			}
		},
		{
			name: 'numeric - tens of millions',
			test: function(string) {
				return string.match(/^[0-9]*$/gm)&&string>999999;
			}
		},
		{
			name: 'numeric - hundreds of millions',
			test: function(string) {
				return string.match(/^[0-9]*$/gm)&&string>9999999;
			}
		},
		{
			name: 'pounds - tens',
			test: function(string) {
				return string.indexOf('£')>-1&&strippers['pounds'](string)<99;
			}
		},
		{
			name: 'pounds - hundreds',
			test: function(string) {
				return string.indexOf('£')>-1&&strippers['pounds'](string)<999;
			}
		},
		{
			name: 'pounds - thousands',
			test: function(string) {
				return string.indexOf('£')>-1&&string.indexOf('k')>-1;
			}
		},
		{
			name: 'pounds - tens of thousands',
			test: function(string) {
				return string.indexOf('£')>-1&&string.indexOf('k')>-1&&strippers['pounds - thousands'](string)>10;
			}
		},
		{
			name: 'pounds - hundreds of thousands',
			test: function(string) {
				return string.indexOf('£')>-1&&string.indexOf('k')>-1&&strippers['pounds - thousands'](string)>100;
			}
		},
		{
			name: 'pounds - millions',
			test: function(string) {
				return string.indexOf('£')>-1&&string.indexOf('m')>-1&&strippers['pounds - millions'](string)>0;
			}
		},
		{
			name: 'pounds - tens of millions',
			test: function(string) {
				return string.indexOf('£')>-1&&string.indexOf('m')>-1&&strippers['pounds - millions'](string)>9;
			}
		},
		{
			name: 'pounds - hundreds of millions',
			test: function(string) {
				return string.indexOf('£')>-1&&string.indexOf('m')>-1&&strippers['pounds - millions'](string)>99;
			}
		},
		{
			name: 'pounds - thousands of millions',
			test: function(string) {
				return string.indexOf('£')>-1&&string.indexOf('m')>-1&&strippers['pounds - millions'](string)>999;
			}
		},
		{
			name: 'feet - tens',
			test: function(string) {
				return string.indexOf('ft')>-1;
			}
		},
		{
			name: 'inches',
			test: function(string) {
				return string.indexOf('"')>-1;
			}
		},
		{
			name: 'comparison',
			test: function(string) {
				return string.indexOf('/')>-1;
			}
		}
	],
	map = {
		'numeric - units': 'standard',
		'numeric - tens': 'standard',
		'numeric - hundreds': 'standard',
		'numeric - thousands': 'standard',
		'numeric - tens of thousands': 'standard',
		'numeric - hundreds of thousands': 'standard',
		'numeric - millions': 'standard',
		'pounds - tens': 'standard',
		'pounds - hundreds': 'standard',
		'pounds - thousands': 'standard',
		'pounds - tens of thousands': 'standard',
		'pounds - hundreds of thousands': 'standard',
		'pounds - millions': 'standard',
		'pounds - tens of millions': 'standard',
		'pounds - hundreds of millions': 'standard',
		'pounds - thousands of millions': 'standard',
		'feet - tens': 'standard',
		'inches': 'standard',
		'comparison': 'comparison'
	},
	processors = {
		'numeric - units': function(number) {
			return zeros(number, 0);
		},
		'numeric - tens': function(number) {
			return zeros(number, 10);
		},
		'numeric - hundreds': function(number) {
			return zeros(number, 100);
		},
		'numeric - thousands': function(number) {
			return zeros(number, 1000);
		},
		'numeric - tens of thousands': function(number) {
			return zeros(number, 10000);
		},
		'numeric - hundreds of thousands': function(number) {
			return zeros(number, 100000);
		},
		'numeric - millions': function(number) {
			return zeros(number, 1000000);
		},
		'pounds - tens': function(number) {
			return ('£' + zeros(number, 10));
		},
		'pounds - hundreds': function(number) {
			return ('£' + zeros(number, 100));
		},
		'pounds - thousands': function(number) {
			return ('£' + zeros(number, 0) + 'k');
		},
		'pounds - tens of thousands': function(number) {
			return ('£' + zeros(number, 10) + 'k');
		},
		'pounds - hundreds of thousands': function(number) {
			return ('£' + zeros(number, 100) + 'k');
		},
		'pounds - millions': function(number) {
			return ('£' + zeros(number, 0) + 'm');
		},
		'pounds - tens of millions': function(number) {
			return ('£' + zeros(number, 10) + 'm');
		},
		'pounds - hundreds of millions': function(number) {
			return ('£' + zeros(number, 100) + 'm');
		},
		'pounds - thousands of millions': function(number) {
			return ('£' + zeros(number, 1000) + 'm');
		},
		'feet - tens': function(number) {
			return (zeros(number, 10) + 'ft');
		},
		'inches': function(number) {
			return (number + '"');
		},
		'comparison': function(number1, number2) {
			return [number1, number2].join(settings.comparison);
		}
	},
	strippers = {
		'numeric': function(string) {
			return string;
		},
		'pounds': function(string) {
			return string.replace('£', '');
		},
		'pounds - thousands': function(string) {
			return string.replace('£', '').replace('k', '');
		},
		'pounds - millions': function(string) {
			return string.replace('£', '').replace('m', '');
		},
		'feet': function(string) {
			return string.replace('ft', '');
		},
		'inches': function(string) {
			return string;
		},
		'comparison': function(string) {
			return string.split(settings.comparison);
		}
	},
	stripperMap = {
		'numeric - units': 'numeric',
		'numeric - tens': 'numeric',
		'numeric - hundreds': 'numeric',
		'numeric - thousands': 'numeric',
		'numeric - tens of thousands': 'numeric',
		'numeric - hundreds of thousands': 'numeric',
		'numeric - millions': 'numeric',
		'pounds - tens': 'pounds',
		'pounds - hundreds': 'pounds',
		'pounds - thousands': 'pounds - thousands',
		'pounds - tens of thousands': 'pounds - thousands',
		'pounds - hundreds of thousands': 'pounds - thousands',
		'pounds - millions': 'pounds - millions',
		'pounds - tens of millions': 'pounds - millions',
		'pounds - hundreds of millions': 'pounds - millions',
		'pounds - thousands of millions': 'pounds - millions',
		'feet - tens': 'feet',
		'inches': 'inches',
		'comparison': 'comparison'
	},
	handlers = {
		standard: function(text, type, $this) {

			var
			total = parseFloat(strippers[stripperMap[type]](text));

			easingAnimationFrames({
				duration: settings.duration,
				easingType: settings.easing,
				template: function({progress}) {

					$this.text(processors[type](floorTo(getXPercentOfY(progress, total*100), 1)));

				}
			});

		},
		comparison: function(text, type, $this) {

			var
			totals = strippers[stripperMap[type]](text),
			total1type = getType(totals[0]),
			total1 = parseFloat(strippers[stripperMap[total1type]](totals[0])),
			total2type = getType(totals[1]),
			total2 = parseFloat(strippers[stripperMap[total2type]](totals[1]));

			easingAnimationFrames({
				duration: settings.duration,
				easingType: settings.easing,
				template: function({progress}) {

					$this.text(processors['comparison'](processors[total1type](floorTo(getXPercentOfY(progress, total1*100), 1)), processors[total2type](floorTo(getXPercentOfY(progress, total2*100), 1))));

				}
			});

		}
	},
	clearers = {
		standard: function(text, type, $this) {

			var
			total = parseFloat(strippers[stripperMap[type]](text));

			$this.text(processors[type](0));

		},
		comparison: function(text, type, $this) {

			var
			totals = strippers[stripperMap[type]](text),
			total1type = getType(totals[0]),
			total1 = parseFloat(strippers[stripperMap[total1type]](totals[0])),
			total2type = getType(totals[1]),
			total2 = parseFloat(strippers[stripperMap[total2type]](totals[1]));

			$this.text(processors['comparison'](processors[total1type](0), processors[total2type](0)));

		}
	},
	getType = function(string) {

		var
		out = 'unknown';

		types.forEach(function(a) {

			if(a.test(string)) {
				out = a.name;
			};

		});

		return out;

	};

	return this.each(function() {

		var
		$this = $(this),
		text = $this.text(),
		delay = $this.attr('data-count-delay') || 0,
		timeout,
		type = getType(text),
		isInView = function() {

			var
			out = false,
			offset = 200,
			rect1 = {
				x: 0,
				y: $window.scrollTop() - offset,
				width: $window.width(),
				height: $window.height()
			},
			rect2 = {
				x: $this.offset().left,
				y: $this.offset().top,
				width: $this.width(),
				height: $this.height()
			};

			if(rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) {
				out = true;
			};

			return out;

		},
		ran = false,
		run = function() {

			timeout = setTimeout(function() {

				handlers[map[type]](text, type, $this);
				ran = true;

			}, delay);

		},
		clear = function() {

			clearers[map[type]](text, type, $this);

		};

		clear();

		$this.attr('title', type);

		$window.on('scroll', function() {

			if(!ran&&isInView()) {

				run();

			};

		});

	});

};

$.fn.contact = function() {

  return this.each(function() {

    var
    target = $('.c-header'),
    $this = $(this).on('click', function() {

      target.trigger('contact');
      return false;

    });

  });

};

$.fn.highlight = function() {

  return this.each(function() {

    var
    $this = $(this),
    textToHighlight = $this.attr('data-highlight'),
    colorToHighlight = $this.attr('data-highlight-color'),
    markup = $this.html();

    markup = markup.replace(new RegExp(textToHighlight, 'ig'), `<span class="color-${colorToHighlight}">${textToHighlight}</span>`);

    $this.html(markup);

  });

};

$('[data-highlight]').highlight();

$('[max-lines="2"]').truncate({
  lines: 2
});

$('[max-lines="3"]').truncate({
  lines: 3
});

$('[max-lines="4"]').truncate({
  lines: 4
});

$('.c-carousel[data-type="normal"]').on('init', function(event, slick) {

  var
  slider = $(this).on('update', function() {

    out.find('a').attr('data-active', 'false');
    out.find(`a[data-index="${slick.currentSlide}"]`).attr('data-active', 'true');

  }),
  out = $('<ul class="slick-nav"/>').on('click', 'a', function() {

    var
    link = $(this);

    slider.slick('slickGoTo', link.attr('data-index'));

    return false;

  });

  slick.$slides.each(function(inc, item) {

    var
    title = $(item).find('.c-carousel-item').attr('title'),
    active = inc === 0;

    out.append(`<li><a href="#" data-index="${inc}" data-active="${active}">${title} <span>at The Junction</span></a></li>`);

  });

  slick.$slider.append(out);

}).on('afterChange', function(event, slick) {

  $(this).trigger('update');

});

$('.c-carousel').slick({
  autoplay: true,
  autoplaySpeed: 5*1000,
  speed: 850
});

$('.c-header').header({
  searchHandle: '.search-toggle',
  contactHandle: '.contact-toggle',
  navigationHandle: '.nav-toggle',
  roots: '.c-navigation > li > a',
  thumbnail: '.entry-thumbnail'
});

$('[data-bubbles="people"] .c-listing-item-inner').popup();

$('.count').countr();

$('a[href$="/contact"]').contact();
