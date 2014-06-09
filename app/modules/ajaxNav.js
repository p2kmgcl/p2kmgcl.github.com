/*global $, window, history */

(function () {
	'use strict';
	
	if (!!(window.history && history.pushState)) {
		var validUrls = /^index\.html|^contact\.html|^articles|^projects/,
			
			wrapperId = 'wrapper',
			wrapperNextId = 'wrapperNext',
			currentClassName = 'current',
			loadingClassName = 'loading',
			sectionClassNamePrefix = 'section_',
			
			
			$title = $('head > title:first'),
			$html = $('html'),
			$body = $('body'),
			$menu = $('body > nav.menu:first'),
			$wrapper = $('#' + wrapperId),
			$wrapperNext,
			$this,

			titleBase = ' | Pablo Molina | Piensa, inventa, comparte',
			href,
			realHref,
			section;

		$body.on('click', 'a', function (event) {
			$this = $(this);
			href = this.href.split('/');
			href = href.slice(3, href.length).join('/');
			section = href.split('.html').join('').split('/')[0];
	
			// Comprobamos si el enlace carga lo que
			// esperamos...
			if (validUrls.test(href)) {
				event.preventDefault();

				$html
					.addClass(loadingClassName)
					.addClass(sectionClassNamePrefix + section);
					
				if (href.charAt(href.length - 1) === '/') {
					href += 'index.html';
				}

                realHref = this.href;
				$wrapperNext = $('<div id="#' + wrapperNextId + '"></div>')
					.load(realHref, function () {
						$title.text($wrapperNext.find('title:first').attr('data-title') + titleBase);
							
						$wrapperNext = $wrapperNext.find('#' + wrapperId).attr('id', wrapperNextId);
						$wrapper.after($wrapperNext);
						$wrapper.remove();
						$wrapper = $wrapperNext;

						$menu.find('.' + currentClassName).removeClass(currentClassName);
						$menu.find('.' + section).addClass(currentClassName);
							
						$html
							.removeClass(sectionClassNamePrefix + $html.attr('data-section'))
							.addClass(sectionClassNamePrefix + section)
							.attr('data-section', section);
							
						setTimeout(function () {
				            history.pushState(null, null, realHref);
							$html.removeClass(loadingClassName);
							$wrapper.attr('id', wrapperId);
						}, 100);
						p2kmgcl.toggleReady();
					});
				return false;
			}
		});
	}
}());
