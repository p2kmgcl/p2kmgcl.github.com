/*global $, window, history */

(function () {
	'use strict';
	
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

		titleBase = ' | Pablo Molina | Piensa, inventa, comparte',
		href,
		realHref,
		section;

	/**
	 * Navega a la URL almacenada en realHref
	 */
	function navigateTo (doPushState) {
		$html
			.addClass(loadingClassName)
			.addClass(sectionClassNamePrefix + section);
				
		if (href.charAt(href.length - 1) === '/') {
			href += 'index.html';
		} else if (href.charAt(href.length - 1) === '') {
			href = '/index.html';
			section = 'index';
		}

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

				if (section === 'index') {
					$html
						.removeClass(sectionClassNamePrefix + 'noindex')
						.addClass(sectionClassNamePrefix + 'index');
				} else {
					$html
						.removeClass(sectionClassNamePrefix + 'index')
						.addClass(sectionClassNamePrefix + 'noindex');
				}

				setTimeout(function () {
					if (doPushState) {
						history.pushState({}, '', realHref);
					}

					$html.removeClass(loadingClassName);
					$wrapper.attr('id', wrapperId);
				}, 100);
				p2kmgcl.toggleReady();
			});
	}

	if (!!(window.history && history.pushState)) {
		$body.on('click', 'a', function (event) {
			href = this.href.split('/');
			href = href.slice(3, href.length).join('/');
			section = href.split('.html').join('').split('/')[0];
			realHref = this.href;

			// Comprobamos si el enlace carga lo que
			// esperamos...
			if (validUrls.test(href)) {
				event.preventDefault();
				navigateTo(true);
			}
		});
	
		// Soporte para el botón atrás
		window.onpopstate = function (event) {
			realHref = window.location.href;
			href = window.location.href;
			href = href.split('/');
			href = href.slice(3, href.length).join('/');
			section = href.split('.html').join('').split('/')[0];
			if (validUrls.test(href)) {
				event.preventDefault();
				navigateTo();
			}
		};
	}
}());
