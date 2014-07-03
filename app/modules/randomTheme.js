(function () {
	var themeLink = document.getElementById('theme'),
		randomButton = document.createElement('i'),

		// Lista de temas que se pueden cargar
		themes = [
			"blank",
			"loremipsum",
			"tiles",
			"bubbles"
		],
		themesPool = [],

		// Tema por defecto
		currentTheme = "bubbles";

	randomButton.className = "randomTheme fa fa-random";
	randomButton.title = "Press me!";

	randomButton.onclick = function () {
		var chosenTheme = currentTheme;

		while (chosenTheme === currentTheme) {
			if (themesPool.length === 0) {
				themesPool = _.shuffle(_.clone(themes));
			}
			chosenTheme = themesPool.pop();
		}

		currentTheme = chosenTheme;
		themeLink.href = "/themes/" + currentTheme + ".css";
		if (typeof changeScript === 'function') { changeScript(currentTheme); }
	};

	document.body.appendChild(randomButton);

	/**
	 * Esta parte está dedicada al renderizado de un canvas en caso de que el navegador lo soporte y el tema actual lo tenga implementado.
	 * En navegadores táctiles (móviles/tables) dejamos el canvas para no saturar demasiado el dispositivo.
	 */
	if (Modernizr.canvas) {
		// Los cambios en el tamaño de pantalla cambian el tamaño del canvas
		var $canvas = document.createElement('canvas'),
			$context = $canvas.getContext('2d'),
			canvasScript,
			onResize = function () {
				$canvas.width = window.innerWidth;
				$canvas.height = window.innerHeight;
				$context.clearRect(0, 0, $canvas.width, $canvas.height);
				if (typeof window.p2kmgcl.canvasMagicResize === 'function') {
					window.p2kmgcl.canvasMagicResize($canvas, $context);
				}
			},

			changeScript = function (currentTheme) {
				delete window.p2kmgcl.canvasMagic;
				if (canvasScript) {	document.body.removeChild(canvasScript); }
				$context.clearRect(0, 0, $canvas.width, $canvas.height);
				canvasScript = document.createElement('script');
				canvasScript.async = true;
				canvasScript.src = '/themes/' + currentTheme + '.js';
				canvasScript.onload = function () {
					onResize();
				};
				document.body.appendChild(canvasScript);
			},

			last = new Date(),
			render = function () {
				var now = new Date(),
					delta = 1 / (now.getTime() - last.getTime());
					delta = (delta <= 0) ? 1 / 60 : (delta >= 1) ? 1 : delta;
					last = now;

				if (typeof window.p2kmgcl.canvasMagic === 'function') {
					window.p2kmgcl.canvasMagic($canvas, $context, delta);
					window.requestAnimationFrame(render);
				} else {
					window.setTimeout(render, 500);
				}
			};

		// Añadimos el canvas al DOM preparado
		$canvas.id = 'c';
		window.onresize = onResize;
		document.body.appendChild($canvas);
		changeScript(currentTheme);
		render();
	}
}());
