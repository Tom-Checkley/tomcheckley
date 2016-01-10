/*jslint browser: true*/
/*global $*/
$(document).ready(function() {
'use strict';
	

	// set height of main panels
	function screenTest() {
		var screenHeight = window.innerHeight;
		$('.panel').each(function() {
			var $this = $(this);
			if ($this.height() < screenHeight) {
				$this.css('height', screenHeight);
			} else {
				$this.css('height', 'min-content');
			}
		});
	}

	screenTest();

	$(window).on('resize', function() {
		screenTest();
	});

	// background change on home screen

	var backgrounds = $('.panel__background div[class^="panel__background--"]'),
			count = backgrounds.length,
			i = 0;

	backgrounds.not(':first').hide();

	function slideShow() {
		var slide = backgrounds.eq(i);
		backgrounds.fadeOut(400);
		slide.delay(400).fadeIn(400);
	}

	function startSlides() {
		setInterval(function() {
			i++;
			if(i >= count) {
				i = 0;
			}
			slideShow();
		}, 5000);
	}

	startSlides();

	// side nav operations
	var $sideNav = $('.side-nav'),
			$navBtn = $('.side-nav__button'),
			$navArrow = $('.side-nav__button--arrow');

	$navArrow.hide();
	$navBtn.click(function() {
		if($sideNav.hasClass('is-closed') && $('html').hasClass('csstransitions')) {
			$sideNav.removeClass('is-closed').addClass('is-open');
			if($('html').hasClass('csstransforms')) {
				$navArrow.fadeIn(300).removeClass('is-rotating-closed').addClass('is-rotating-open');
			}
			$navBtn.animate({
				'right' : '-60px'
			}, 300);
		} else {
			$sideNav.removeClass('is-open').addClass('is-closed');
			if($('html').hasClass('csstransforms')) {
				$navArrow.removeClass('is-rotating-open').addClass('is-rotating-closed').fadeOut(300);
			}
			$navBtn.animate({
				'right' : '-150px'
			}, 300);
		}

	});


}); //end document.ready
