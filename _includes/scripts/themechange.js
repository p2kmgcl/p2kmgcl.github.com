(function () {
    var $themeWrapper = $('#themes > ul:first'),
        $themes = $themeWrapper.find('> li > a'),
        $themeLink = $('#csstheme'),
        $currentTheme = null,
        $me = null,

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

                $themeLink.attr('href',
                    '{{ site.baseurl }}/css/' +
                    $me.data('theme') + '.css');
            }
        };

    // Añade los eventos de cambio de tema
    $themeWrapper.on('click', 'a', changeTheme);

    // Guarda el tema actual
    $themes.each(function () {
        $me = $(this);
        if ($me.hasClass('current')) {
            $currentTheme = $me;
            return false;
        }
    });
}());
