(function () {
	$('.menu').children('h2').first().on('click', function () {
		$(this).parent().toggleClass('menuActive');
	});
}());
