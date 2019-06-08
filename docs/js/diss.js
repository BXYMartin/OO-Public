/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	// taken from mo.js demos
	function isIOSSafari() {
		var userAgent;
		userAgent = window.navigator.userAgent;
		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	};

	// taken from mo.js demos
	function isTouch() {
		var isIETouch;
		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	};
	
	// taken from mo.js demos
	var isIOS = isIOSSafari(),
		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Animocon(el, options) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );

		this.checked = false;

		this.timeline = new mojs.Timeline();
		
		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
			this.timeline.add(this.options.tweens[i]);
		}

		var self = this;
		this.el.addEventListener(clickHandler, function() {
			if ( self.checked ) {
				return;
				//this.style.color='#c0c1c3';
			}
			else {
				this.style.color='#FF0000';
				var num = this.querySelector('div.count > div.number');
				self.timeline.add(
				new mojs.Tween({
					duration : 1000,
					onUpdate: function(progress) {
						var elasticOutProgress = mojs.easing.elastic.out(progress);
						num.style.WebkitTransform = num.style.transform = 'translate3d(' + -50*(1-elasticOutProgress) + '%,0,0)';
					}
				}));
				self.timeline.start();
				num.innerHTML = parseInt(num.innerHTML) + 1;
			}
			self.checked = !self.checked;
			callback();
		});
	}

	

	Animocon.prototype.options = {
		tweens : [
			new mojs.Burst({
				shape : 'circle',
				isRunLess: true
			})
		],
		onCheck : function() { return false; },
		onUnCheck : function() { return false; }
	};

	// grid items:
	var items = [].slice.call(document.querySelectorAll('li'));

	function init() {
		for (var i = 0; i < items.length; i++) {
			var el7 = items[i].querySelector('button.icobutton');
			var span = el7.querySelector('span');
			new Animocon(el7, {
				tweens : [
					// burst animation
					new mojs.Burst({
						parent: el7,
						duration: 1200,
						delay: 200,
						shape : 'circle',
						fill: '#FF0000',
						x: '50%',
						y: '50%',
						opacity: 0.6,
						childOptions: { radius: {'rand(20,5)':0} },
						radius: {90:150},
						count: 18,
						isSwirl: true,
						swirlSize: 15,
						isRunLess: true,
						easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
					}),
					// ring animation
					new mojs.Transit({
						parent: el7,
						duration: 1500,
						type: 'circle',
						radius: {30: 100},
						fill: 'transparent',
						stroke: '#FF3333',
						strokeWidth: {30:0},
						opacity: 0.6,
						x: '50%',     
						y: '50%',
						isRunLess: true,
						easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
					}),
					new mojs.Transit({
						parent: el7,
						duration: 1600,
						delay: 320,
						type: 'circle',
						radius: {30: 80},
						fill: 'transparent',
						stroke: '#FF3300',
						strokeWidth: {20:0},
						opacity: 0.3,
						x: '50%',     
						y: '50%',
						isRunLess: true,
						easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
					}),
					// icon scale animation
					new mojs.Burst({
						parent: el7,
						duration : 1000,
						fill: '#FF0033',
					})
				]
			});
						
		}
	}
	
	init();

})(window);