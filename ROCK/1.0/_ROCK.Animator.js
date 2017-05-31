(function() {
	
	var Animator = ROCK.defineClass("PUBLIC", "DYNAMIC", "Animator", ROCK.createClass(Object, function Animator(frameCount, frameRate) {
		
		this.frameCount = frameCount;
		this.frameRate = frameRate;
		
	}));
	Animator.setProp("start", function() {
	
		var _this = this;
	
		this.timer = setInterval(function() {
			
			_this.frameChangeHandler(_this, _this.currentFrame);
			
			if(_this.currentFrame<(_this.frameCount-1)) {				
				_this.currentFrame ++;			
			}
			else {				
				_this.currentFrame = 0;				
			};
			
		}, this.frameRate);
	
	});
	Animator.setProp("stop", function() {
		
		clearInterval(this.timer);
	
	});
	Animator.setProp("setFrameChangeHandler", function(handler) {
	
		this.frameChangeHandler = handler;
		return this;
	
	});
	Animator.setProp("currentFrame", 0);
	
})();