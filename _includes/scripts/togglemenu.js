(function () {

    var $mainMenu = $('.mainMenu');

    $('.mainMenuOpen').on('click', function () {
        $mainMenu.addClass('mainMenuOpenned');
    });

    $('.mainMenuClose').on('click', function () {
        $mainMenu.removeClass('mainMenuOpenned');
    });

}());