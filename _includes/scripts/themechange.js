(function () {
    'use strict';

    var $html = $('html'),
        $themes = $('.themeLink'),
        $themeLinkIndex = $('#cssthemeIndex'),
        $themeLinkPart = $('#cssthemePart'),
        $currentTheme = null,
        $me = null,
        themePath = null,

        /**
         * Cambia un tema por otro (si no es el actual)
         * @param  {Event.Click} event Evento asociado
         */
        changeTheme = function (event) {
            event.preventDefault();
            $me = $(this);
            
            if (!$me.hasClass('current')) {
                $currentTheme.removeClass('current');
                $me.addClass('current');
                $currentTheme = $me;
                themePath = '{{ site.baseurl }}/css/' + $me.attr('data-theme') + '_';

                $themeLinkPart.attr('data-theme', $me.attr('data-theme'));
                $themeLinkIndex.attr('href', themePath + 'index.css');
                $themeLinkPart.attr('href', themePath + $html.attr('data-pageid') + '.css');
            }
        };

    // Añade los eventos de cambio de tema
    $themes.on('click', changeTheme);

    // Guarda el tema actual
    $themes.each(function () {
        $me = $(this);
        if ($me.hasClass('current')) {
            $currentTheme = $me;
            return false;
        }
    });
}());
