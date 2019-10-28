/*  Autumn Greeting Card -- js */

(function($){
	'use strict';

	// DECLARE ACTORS HERE
	var $backFallingLeaves = $('#brownLeaf, #orangeLeaf, #redLeaf'),
		$textLine1 = $('.text-line-1'),
		$textLine2 = $('.text-line-2'),
		$textGreeting = $('.text-greeting'),
		$treeLeaves = $('[id^=treeleaf]'),
		$floorLeaves = $('[id^=floorleaf]'),
		$bird = $('#Bird'),
		$birdHat = $bird.find('#BirdHat'),
		$birdEyes = $bird.find('#leftEye, #rightEye'),
		$nest = $('#NestAndLeaves'),
		$tree = $('#tree_trunk'),
		$cardContainer = $('.card.container'),
		$body = $('body')
	;

	// clear stage 
	function clearStage() {
		var clearTl = new TimelineMax();

		clearTl
			.set($backFallingLeaves, {autoAlpha:0})
			.set($textLine1, {autoAlpha:0})
			.set($textLine2, {autoAlpha:0})
			.set($textGreeting, {autoAlpha:0})
			.set($treeLeaves, {autoAlpha:0})
			.set($bird, {y:'+=65', autoAlpha:0})
			.set($nest, {autoAlpha:0})
			.set($tree, {autoAlpha:0})
			.set($floorLeaves, {y:'+=275', onComplete: showContainer})
		;

		function showContainer() {
			$cardContainer.css('display', 'block');
		}

		return clearTl;
	}

	// enter floor vegetation
	function enterFloorVegetation() {
		var fleavesTl = new TimelineMax();

		fleavesTl
			.staggerTo($floorLeaves, 1, {y:0, ease: Back.easeInOut}, 0.01)
			.add('floor-leaves')
			.fromTo($tree, 1.1, {autoAlpha:0, scaleY:0.2, transformOrigin: 'bottom center'}, {autoAlpha:1, scaleY:1, transformOrigin: 'bottom center', ease: Back.easeInOut})
			.fromTo($tree, 0.9, {autoAlpha:0, scaleX:0.2, transformOrigin: 'bottom center'}, {autoAlpha:1, scaleX:1, transformOrigin: 'bottom center', ease: Back.easeInOut}, "-=0.9")
		;

		return fleavesTl;
	}

	// enter tree stuff
	function enterTreeStuff() {
		var treeStuffTl = new TimelineMax();

		treeStuffTl
			.staggerFromTo($treeLeaves, 0.6, {scale:0.2, autoAlpha:0, transformOrigin: 'bottom center'}, {scale:1, autoAlpha:1, transformOrigin: 'bottom center'}, 0.02)
			.fromTo($nest, 1, {y:0, scale:0.2, autoAlpha:0, transformOrigin: 'bottom center'}, {y:'-=15', scale:1, autoAlpha:1, transformOrigin: 'bottom center', ease: Elastic.easeOut}, '-=0.1')
			.to($nest, 0.3, {y:'+=15', ease: Bounce.easeOut}, '-=0.1')
			.add('nest-pop-in')
			.set($birdHat, {rotation:12, x:'+=6'})
			.to($bird, 1.4, {y:'-=39', autoAlpha:1, ease: Power4.easeOut}, 'nest-pop-in+=0.1')
			.add('bird-peeking')
			.set($birdEyes, {autoAlpha:0})
			.set($birdEyes, {autoAlpha:1}, '+=0.2')
			.set($birdEyes, {autoAlpha:0}, '+=0.3')
			.set($birdEyes, {autoAlpha:1}, '+=0.2')
			.add('bird-blinks')

			.to($bird, 0.8, {y:'-=34', ease: Power4.easeInOut}, 'bird-blinks+=0.4')
			.to($bird, 0.3, {y: '+=8', ease: Back.easeOut})
			.to($birdHat, 0.4, {y:'-=12'},'-=0.6')
			.to($birdHat, 0.3, {y:0, rotation:0, x:0, onComplete: startBlinking}, '-=0.2')
			.add('bird-reveal')
		;

		function startBlinking() {
			var birdBlinksTl = new TimelineMax({repeat:-1, repeatDelay: 4});

			birdBlinksTl
				.set($birdEyes, {autoAlpha:0})
				.set($birdEyes, {autoAlpha:1}, '+=0.2')
				.set($birdEyes, {autoAlpha:0}, '+=1.2')
				.set($birdEyes, {autoAlpha:1}, '+=0.2');

		}

		return treeStuffTl;
	}

	// enter the greeting text
	function enterGreetings() {
		var greetingTl = new TimelineMax();

		greetingTl
			.fromTo($textLine1, 1, {y: "-=50", autoAlpha:0}, {y:0, autoAlpha:1, onComplete: startLoops})
			.fromTo($textLine2, 1, {y: "-=25", autoAlpha:0}, {y:0, autoAlpha:1}, '-=0.2')
			.staggerFromTo($textGreeting, 0.4, {scale:2, autoAlpha:0, transformOrigin: 'center center'}, {scale:1, autoAlpha:1, transformOrigin: 'center center'}, 0.1)
		;

		function startLoops() {
			// start background color changes
			var colors = ['#edcc93', '#f7e3ae', '#f3ebcc','#edcc93'];
			var bgTl = new TimelineMax({repeat:-1, repeatDelay:3, yoyo:true});

			bgTl
				.to($body, 3, {backgroundColor: colors[0]})
				.to($body, 3, {backgroundColor: colors[1]}, '+=3')
				.to($body, 3, {backgroundColor: colors[2]}, '+=3')
				.to($body, 3, {backgroundColor: colors[3]}, '+=3');


			// start falling leaves
			(function doFallingLeaves() {
				TweenMax.set($backFallingLeaves, {y: -100, autoAlpha: 0.2});
				TweenMax.to("#brownLeaf", 10 + Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone, onComplete: doneFalling, onCompleteParams: ["#brownLeaf"] });
				TweenMax.to("#redLeaf", 10 + Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone, onComplete: doneFalling, onCompleteParams: ["#redLeaf"] });
				TweenMax.to("#orangeLeaf", 10 + Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone,  onComplete: doneFalling, onCompleteParams: ["#orangeLeaf"] });

				function doneFalling(leafId) {
					var range = Math.random() * 800;
					range = range - 400;

					TweenMax.set(leafId, {y: -100, x: range, autoAlpha: 0.2, rotation: Math.random()*360});
					TweenMax.to(leafId, 10 + Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone, onComplete: doneFalling, onCompleteParams: [leafId] });
				}
				
			})();



		}

		return greetingTl;
	}
	
	// the GO function ...to kick things all off
	function go() {
		console.log('go ...');

		var masterTl = new TimelineMax();

		masterTl
			.add(clearStage(), 'scene-clear')
			.add(enterFloorVegetation(), 'scene-floor-vegetation')
			.add(enterTreeStuff(), 'scene-treestuff')
			.add(enterGreetings(), 'scene-greeting')
		;
	}

	go();

})(jQuery);


