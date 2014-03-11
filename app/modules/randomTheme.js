(function () {
	var themeLink = document.getElementById('theme'),
		randomButton = document.createElement('i'),
		themes = [
			"blank",
			"loremipsum"
		],
		themesPool = [],
		currentTheme = "blank";

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
	};

	document.body.appendChild(randomButton);
}());
