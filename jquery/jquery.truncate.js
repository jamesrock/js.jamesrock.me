$.fn.truncate = function(options) {

  var
  settings = $.extend({
    lines: 4
  }, options);

  return this.each(function() {

    var
    $this = $(this),
    lineHeight = parseFloat($this.css('line-height')),
    height = parseFloat($this.css('height')),
    maxHeight = (lineHeight*settings.lines),
    toTruncate = height>maxHeight;

    if(toTruncate) {

      var words = $this.text().split(' ');

      while(toTruncate) {
        words.pop();
        $this.html(words.join(' ') + '&hellip;');
        height = parseFloat($this.css('height'));
        toTruncate = height>maxHeight;
      };

    };

  });

};

$('[max-lines="2"]').truncate({
  lines: 2
});

$('[max-lines="3"]').truncate({
  lines: 3
});
