/* global p2kmgcl */

p2kmgcl.fn.konamiCode = function () {
    'use strict';

    var childNodes = $('body *:not(:has(*))'),
        count = childNodes.size();

    childNodes.each(function () {
        var $this = $(this),
            text = $this.html(),
            portion1,
            portion2,

            hide1,
            hide2,
            hide3;

        if (text !== '') {
            portion1 = parseInt(text.length * 1/3, 10);
            portion2 = portion1 * 2;

            $this.html(
                '<span class="konamiDisapear' + parseInt(Math.random() * 3, 10) + '">' +
                    text.substr(0, portion1) +
                '</span>' +
                '<span class="konamiDisapear' + parseInt(Math.random() * 3, 10) + '">' +
                    text.substr(portion1, portion1) +
                '</span>' +
                '<span class="konamiDisapear' + parseInt(Math.random() * 3, 10) + '">' +
                    text.substr(portion2, text.length) +
                '</span>'
            );
        }

        // Último nodo :D
        if (--count === 0) {
            $('.konamiDisapear0').animate({
                opacity: 0
            },
            {
                duration: 1000,
                queue: false,
                complete: function () {
                    if (!hide1) {
                        hide1 = true;
                        $('.konamiDisapear1').animate({
                            opacity: 0
                        },
                        {
                            duration: 1000,
                            queue: false,
                            complete: function () {
                                if (!hide2) {
                                    hide2 = true;
                                    $('.konamiDisapear2').animate({
                                        opacity: 0
                                    },
                                    {
                                        duration: 1000,
                                        queue: false,
                                        complete: function () {
                                            if (!hide3) {
                                                hide3 = true;

                                                $('<div/>').css({
                                                    'position': 'fixed',
                                                    'font-size': '25px',
                                                    'font-weight': 'bolder',
                                                    'top': 20,
                                                    'left': 20,
                                                    'text-shadow': '0 0 5px white',
                                                    'z-index': -1
                                                })
                                                .html('Konami was here')
                                                .prependTo('html');

                                                $('body').animate({
                                                    opacity: 0
                                                },
                                                {
                                                    duration: 1000,
                                                    queue: false
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    });

};
