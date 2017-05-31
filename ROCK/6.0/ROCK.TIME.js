(function() {

	// new Date("2015-11-22T00:00:00.000Z").getTime();
	
	ROCK.TIME = {
		toDays: function(time) {
			return ((time/(1000*60*60*24)));
		},
		toHours: function(time) {
			return ((time/(1000*60*60))%24);
		},
		toMinutes: function(time) {
			return ((time/(1000*60))%60);
		},
		toMinutes2: function(time) {
			return (time/(1000*60));
		},
		toSeconds: function(time) {
			return ((time/1000)%60);
		},
		toMilliseconds: function(time) {
			return ((time)%1000);
		}
	};

	ROCK.TIME.SECOND = 1000;
	ROCK.TIME.MINUTE = (ROCK.TIME.SECOND*60);
	ROCK.TIME.HOUR = (ROCK.TIME.MINUTE*60);
	ROCK.TIME.DAY = (ROCK.TIME.HOUR*24);

})();