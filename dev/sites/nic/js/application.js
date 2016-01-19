var winWidth = window.screen.availWidth;

var screenCheck = function () {
	var size = $(window).innerWidth();
	if (size > 480) {
		$('.tabs').show();
	} else {
		$('.tabs').hide();
	};
}

$(document).ready(function(){

	var timer;
	var adjustFrame = function() {
		clearTimeout(timer);
		timer = setTimeout(screenCheck, 10);
	}

	$(window).on('resize', function(){
		adjustFrame();
	});

	$('button').click(function() {
		$('.tabs').slideToggle(400);
		$('button').addClass('clicked');
	});

	$('a[href^="http://"]').attr('target', '_blank');
	$('.contact-links a[href^="https://"]').attr('target', '_blank');


	$('.tabs a').click(function(){
		var size = $(window).innerWidth();
		// if (winWidth >= 480) {
			if (size <=480) {
				$('.tabs').slideUp(400);
				$('.button').removeClass('clicked');
				console.log('screenCheck run');
			}
		// }
		var $this = $(this);
		$('.panel').hide();
		$('.tabs a.active').removeClass('active');
		$this.addClass('active').blur();
		var panel = $this.attr('href');
		$(panel).fadeIn(250);

		return false;

	});

	$('.tabs li:first a').click();

});