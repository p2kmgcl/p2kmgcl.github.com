(function () {
	var konamiTotal = [38, 38, 40, 40, 37, 39, 37, 39, 98, 97],
		konamiCurrent = 0;

	$(window).on('keypress', function (event) {
		var key = event.keyCode || event.which;
		if (konamiTotal[konamiCurrent] === key) {
			konamiCurrent++;
		} else {
			konamiCurrent = 0;
		}

		if (konamiCurrent === konamiTotal.length) {
			konamiCurrent = 0;
			if (typeof window.p2kmgcl.onKonamiCode === 'function') {
				window.p2kmgcl.onKonamiCode();
			}
		}
	});
	
}());
