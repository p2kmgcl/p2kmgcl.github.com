(function () {

    var $mainMenu = $('.mainMenu');

    $('.mainMenuOpenWrapper').on('click', function () {
        $mainMenu.addClass('mainMenuOpenned');
    });

    $('.mainMenuCloseWrapper').on('click', function () {
        $mainMenu.removeClass('mainMenuOpenned');
    });

}());