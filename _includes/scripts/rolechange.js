/* global p2kmgcl, Iterator */

p2kmgcl.fn.roleChange = function () {
    'use strict';

    //{% include gists/iterator.js %}

    var $roles = $('.role'),
        i = new Iterator(),
        roleChanger = function () {
            $roles = $('.role');
            i.end = $roles.size() - 1;

            if ($roles.size() >= 2) {
                $($roles[i.before()])
                    .removeClass('current');

                $($roles[i.current()])
                    .removeClass('next')
                    .addClass('current');

                $($roles[i.next()])
                    .addClass('next');

                i.go();

                clearTimeout(p2kmgcl.fn.roleChange.lastTimeout);
                p2kmgcl.fn.roleChange.lastTimeout = setTimeout(roleChanger, 3000);
            }
        };
    
    i.go();
    clearTimeout(p2kmgcl.fn.roleChange.lastTimeout);
    p2kmgcl.fn.roleChange.lastTimeout = setTimeout(roleChanger, 1000);
};

// Último timeout para poder cancelar
p2kmgcl.fn.roleChange.lastTimeout = null;
p2kmgcl.fn.roleChange.clear = function () {
    'use strict';
    clearTimeout(p2kmgcl.fn.roleChange.lastTimeout);
    p2kmgcl.fn.roleChange.lastTimeout = null;
};
