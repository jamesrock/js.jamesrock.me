import time from './time.js';

var
toDouble = function(number) {

  var
  out = number;

  if(number<10) {
    out = ('0' + number);
  };

  return out;

};

export default function countdown() {

  return this.each(function() {

    var
    $this = $(this),
    countdownTo = $this.attr('data-to'),
    then = new Date(countdownTo),
    render = function() {

      var
      now = new Date(),
      then = new Date(countdownTo),
      diff = (then-now),
      days = time.getDays(diff),
      hours = time.getHoursOf(diff),
      minutes = time.getMinutesOf(diff),
      seconds = time.getSecondsOf(diff);

      $this.html([toDouble(days), toDouble(hours), toDouble(minutes), toDouble(seconds)].join(':'));

      requestAnimationFrame(render);

    };

    requestAnimationFrame(render);

  });

};