/* global p2kmgcl */

/* Comprobación sencillita de modernizr. Solo activamos estos cambios si el bicho en cuestión lo soporta (holi viejo internet explorer 7 que todo el mundo usa). */
(function () {
    'use strict';
    if (!!(window.history && history.pushState)) {
    
        /*
         * Usado un tutorial de csstricks:
         * http://css-tricks.com/rethinking-dynamic-page-replacing-content/
         */

        // Flag para evitar las cargas múltiples
        var loading = false;

            // Cosas por cambiar
        var $mainMenu = $('.mainMenu'),
            $pagesMenu = $('.mainMenuSectionPages'),
            $wrapper = $('#wrapper'),
            $headtitle = $('#headtitle'),
            $body = $('html, body'),
            $themePart = $('#cssthemePart'),

            // Datos a usar
            href,
            current = 'current',
            titleBase = $headtitle.data('title'),
            hideVelocity = 300,
            showVelocity = 300,
            internalSelector = 'a[href^="{{ site.baseurl}}"]',

            // Elementos creados
            $me,
            $clickLink,
            $wrapperNext,

            // Variables de carga
            newContentLoaded = false,
            oldContentHidden = false,

            /**
             * Muestra el contenido que se ha cargado.
             */
            showNewContent = function () {
                // Marca la nueva entrada en el menu
                $pagesMenu
                    .find('.' + current).removeClass(current)
                    .end().find('a[href^="' + href + '"]').addClass(current);

                // Añade el nuevo título
                $headtitle.html($wrapperNext.find('.sectionTitle').html() + titleBase);

                // Añade el nuevo contenido y quita el original
                $wrapper.after($wrapperNext);
                $wrapper.remove();

                // Se prepara para próximos cambios
                $wrapper = $wrapperNext;
                $wrapper
                    .attr('id', 'wrapper')
                    .on('click', internalSelector, changeHistory)
                    .addClass('showing')
                    .removeClass('hidding');

                setTimeout(function () {
                    $wrapper.removeClass('showing');

                    // Ejecuta los módulos asociados
                    if ($clickLink.attr('data-pageid') === 'home') {
                        p2kmgcl.fn.roleChange();
                    } else {
                        p2kmgcl.fn.roleChange.clear();
                    }

                    // Fin de la carga
                    loading = false;
                    $body.removeClass('loading');

                }, showVelocity);

                // Inicializa las variables de estado
                newContentLoaded =
                oldContentHidden = false;
            },

            /**
             * Carga nuevo contenido.
             * @param {String} url Dirección de la página.
             */
            loadContent = function () {
                // Esconde el contenido actual
                $wrapper.addClass('hidding');
                // Tras un retraso para hacer
                // la animacion muestra el contenido.
                setTimeout(function () {
                    oldContentHidden = true;

                    // Quita la clase que indica
                    // la página del body
                    $body
                        .removeClass('page-' + $body.attr('data-pageid'))
                        .addClass('page-' + $clickLink.attr('data-pageid'))
                        .attr('data-pageid', $clickLink.attr('data-pageid'));

                    // Cambia la hoja de estilos
                    $themePart
                        .attr('href', '{{ site.baseurl }}/css/' + $themePart.attr('data-theme') + '_' + $body.attr('data-pageid') + '.css');

                    if (newContentLoaded) {
                        showNewContent();
                    }
                }, hideVelocity);

                // Mientras tanto preparamos el nuevo elemento
                $wrapperNext = $('<section></section>')
                    .addClass('hidding')
                    .attr('id', 'wrapperNext')
                    .load(href + ' #wrapper', function () {
                        newContentLoaded = true;
                        $wrapperNext = $wrapperNext.find('#wrapper');

                        // Solo muestra el contenido
                        // tras ocultar el anterior
                        if (oldContentHidden) {
                            showNewContent();
                        }
                    });
            },

            /**
             * Se encarga de soportar los clicks en enlaces internos.
             * @param {Event.Click} event Evento
             */
            changeHistory = function (event) {
                if (!loading) {
                    $me = $clickLink = $(this);
                    event.preventDefault();

                    if (!$me.hasClass(current)) {
                        loading = true;
                        $body.addClass('loading');
                        $mainMenu.removeClass('mainMenuOpenned');

                        // Guarda el destino del enlace
                        href = $me.attr('href');

                        // Añadimos la nueva página al historial
                        // y cargamos el contenido.
                        history.pushState(null, null, href);
                        loadContent();
                    }
                }
            };

        // Asigna los eventos
        $pagesMenu.on('click', internalSelector, changeHistory);
        $wrapper.on('click', internalSelector, changeHistory);
    }
}());
