p2kmgcl.readyFunctions.push(function () {
	var $menu = $('.menu'),
		$menuTitle = $menu.children('h2').first();

	$menuTitle.on('click', function () {
		$menu.toggleClass('menuActive');
	});
});
