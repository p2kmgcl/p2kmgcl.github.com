p2kmgcl.readyFunctions.push(function () {
	var search = document.getElementById('search'),
		articles = document.getElementById('articles'),
		notFound = document.getElementById('articleNotFound'),
		articlesTitles = [],
		lastSearchKey = "";

	if (!!search && !!articles) {
		articles = articles.childNodes;
		search.parentNode.className = 'search';
		
		for (var i = 0; i < articles.length; i++) {
			articlesTitles.push(
				articles[i].childNodes[0].innerHTML.toLowerCase());
		}

		search.onkeyup = search.onclick = search.onblur = search.onfocus =
		function () {
			var searchKey = search.value.toLowerCase();
			if (lastSearchKey != searchKey) {
				lastSearchKey = searchKey;

				var hiddenArticles = 0;
				for (var i = 0; i < articles.length; i++) {
					articles[i].className = '';
					
					if (articlesTitles[i].search(searchKey) == -1) {
						articles[i].className = 'hidden';
						hiddenArticles++;
					}
				}

				if (hiddenArticles == articles.length) {
					notFound.className = 'notFound';
				} else {
					notFound.className = 'notFound hidden';
				}
			}
		};
	}
});
