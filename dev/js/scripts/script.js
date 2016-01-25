/*jslint browser: true*/
/*global $*/

$(document).ready(function() {
'use strict';
	
	$('.no-js-header').remove();

	// // set height of main panels
	// function screenTest() {
	// 	var screenHeight = window.innerHeight;
	// 	$('.panel').each(function() {
	// 		var $this = $(this);
	// 		if ($this.height() < screenHeight) {
	// 			$this.css('height', screenHeight);
	// 		} else {
	// 			$this.css('height', 'min-content');
	// 		}
	// 	});
	// }

	// screenTest();

	// $(window).on('resize', function() {
	// 	screenTest();
	// });


	// modernizr background checks
	var $bgPanel = $('div[class*="panel__background"]');
	if($('html').hasClass('backgroundblendmode')) {
		$bgPanel.css({'background-blend-mode': 'soft-light'});
	} else if ($('html').hasClass('no-backgroundblendmode') && $('html').hasClass('multiplebgs')) {
		$bgPanel.each(function() {
			var bgImage = $(this).css('background-image');
			$(this).css({
				'background': 'linear-gradient(rgba(11,13,20,.6), rgba(11,13,20,.6)), ' +
											bgImage,
				'background-size': 'cover'
			});
		});
	}



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
			$navBtn = $('.menu'),
			$links = $('.side-nav__links');

	$navBtn.click(function() {
		$(this).animate({
			'opacity' : 0
		},300);
		if($sideNav.hasClass('is-closed') /*&& $('html').hasClass('csstransitions')*/) {
			$sideNav.removeClass('is-closed').addClass('is-open');
			$links.animate({
				'left': 0
			}, 600);
		} else {
			$sideNav.removeClass('is-open').addClass('is-closed');
		}
	});

	function navClose() {
		$links.animate({
			'left': 500
		}, 600);
		$sideNav.removeClass('is-open').addClass('is-closed');
		$navBtn.animate({
			'opacity' : 1
		},300);
	}

	$('.close').click(function() {
		navClose();
	});

	$('.nav-link').on('click', function(event) {
		event.preventDefault();
		var time;
		if($(this).parents().hasClass('side-nav')) {
			time = 0;
		} else {
			time = 600;
		}
		var href = $(this).attr('href'),
				$location = $(href);
		navClose();
		$('html body').animate({
			scrollTop: $location.offset().top - 40
		},time);
	});

	// parallax nav menu
	$(window).on('scroll', function() {  
		var navbarColor = '11,13,20',
				smallLogoHeight = $('.navbar__logo').height(),
				bigLogoHeight = $('.head-block').height(),
				navbarHeight = $('.navbar').height(),
				smallSpeed = (smallLogoHeight / bigLogoHeight),
			  ySmall = ($(window).scrollTop() * smallSpeed),
				smallPadding = (navbarHeight - ySmall),
				smallLogoEndPos = 10;

	  if (smallPadding > navbarHeight) {
	  	smallPadding = navbarHeight;
	  }
	  if (smallPadding < smallLogoEndPos) {
	  	smallPadding = smallLogoEndPos; 
	  }
	  if (smallPadding < 0) {
	  	smallPadding = 0;
	  }
	  
	  $('.navbar__logo').css({ 'padding-top': smallPadding + 'px'});
	  
	  var navOpacity = (ySmall / smallLogoHeight); 
	  if  (navOpacity > 1) {
	  	navOpacity = 1;
	  }
	  if (navOpacity < 0) {
	  	navOpacity = 0;
	  }
	  var navBackColor = 'rgba(' + navbarColor + ', ' + navOpacity + ')';
	  $('.navbar').css({'background-color': navBackColor});
	});

	
	// Contact button controls
	$('.contact-menu').addClass('closed');
	$('.contact').on('click', function() {
		if($('.contact-menu').hasClass('closed')) {
			$('body').addClass('stop-scrolling').bind('touchmove', function(e){e.preventDefault();});
			$('.navbar').css('background-color', 'rgba(11,13,20,1)');
			$('.arrow').removeClass('is-rotating-open').addClass('is-rotating-closed');
			$('#contact').slideDown(600);
			$('.contact-menu').removeClass('closed').addClass('open');
			$('.contact .text').text("Close");

		} else {
			$('body').removeClass('stop-scrolling').unbind('touchmove');
			$('.arrow').removeClass('is-rotating-closed').addClass('is-rotating-open');
			$('.contact-menu').removeClass('open').addClass('closed');
			$('.contact .text').text("Contact Me");
			$('#contact').slideUp(600);
			$('#contact .details:not(.is-hidden)').each(function() {
				$(this).addClass('is-hidden').css('display', 'none');
			});
			$('.contact span').css('color', '#f9f9f9');
		}
		
	});

	// reveal contact 
	$("#contact a").on('click', function() {
		$('#contact .details:not(.is-hidden)').each(function() {
			$(this).addClass('is-hidden').css('display', 'none');
		});
		var details = $(this).find('.details');
		
		details.removeClass('is-hidden').css('display', 'block');
	});

	$("#contact a").on('mouseenter', function() {
		$('#contact .details:not(.is-hidden)').each(function() {
			$(this).addClass('is-hidden').css('display', 'none');
		});
		var details = $(this).find('.details');
		
		details.removeClass('is-hidden').css('display', 'block');
	});




	// change height of git logo to same as other portfolio imgs

	function adjustLogoHeight() {
		var height = $('.screenshot').load().height();
		$('.gitLogo').css({
			'height': height,
			'width': 'auto'
		});
	}

	adjustLogoHeight();

	var timeout;
	$(window).resize(function() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			adjustLogoHeight();
		},10);
	});

	$(window).resize();


	// ajax for portfolio
	var $link = $('.site-link'),
			$holder = $('#ajax-container'),
			$spinner = $('.spinner');
	$link.on('click', function(event) {
		$('.main-wrapper').addClass('stop-scrolling').bind('touchmove', function(e){e.preventDefault();});
		event.preventDefault();
		$holder.empty();
		$spinner.fadeIn(100);
		var content = $(this).attr('href');
		$('#overlay, #overlay__background').show();
		$holder.load(content, function(response, status, xhr) {
			$spinner.fadeOut(100);
			if(status == 'error') {
				var msg = 'Sorry there was an error loading the requested content: ';
				$holder.html(msg + xhr.status + ' ' + xhr.statusText);
			}
			var height = $('#ajax-container').height();
			var screenHeight = window.innerHeight;
			if(height < screenHeight && window.innerWidth >= 1100) {
				$('#ajax-container div[class*="grid__col"').css('height', '100vh'); 
			} else if(height > screenHeight && window.innerWidth >= 1100){
				$('#ajax-container div[class*="grid__col"').css('height', height); 
			}
		});

	});

	$('#overlay button').on('click', function() {
		$('.main-wrapper').removeClass('stop-scrolling').unbind('touchmove');
		$('html body').animate({
			scrollTop: $('#portfolio').offset().top - 40
		},0);
		$('#overlay, #overlay__background').hide();
		
	});

	// open new page window for links off site
	$('.external-link').attr('target', '_blank');

	$(document).ajaxComplete(function() {
		$('.external-link').attr('target', '_blank');
	});






}); //end document.ready
