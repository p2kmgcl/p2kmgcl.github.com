/* global p2kmgcl */

(function () {
    'use strict';

    var dictionary = {
            '↑↑↓↓←→←→BA': function () { console.log('konami'); },
            'LORENA': function () { console.log('lorena'); },
            'HARLEM SHAKE': p2kmgcl.fn.harlemShake
        },

        charCodes = {
            32: ' ',
            37: '←',
            38: '↑',
            39: '→',
            40: '↓',
            186: 'Ñ'
        },

        wordDOM = $(document.createElement('div'))
            .attr('id', 'keyCodeGetter')
            .hide()
            .css({
                'background-color': '#333',
                'border-color': 'solid #111 thin',
                'border-radius': '0.2em',
                'bottom': '1em',
                'color': '#f1f1f1',
                'font-family': 'Inconsolata, \'Inconsolata\', Consolas, monospace',
                'opacity': 0.9,
                'padding': '0.1em 0.3em',
                'position': 'fixed',
                'right': '1em',
                'white-space': 'pre'
            }),
        word = [],
        memory = null,
        memorySize = 1000;

    /**
     * Obtiene la letra asociada a un código de teclado
     * @param event Evento de teclado
     */
    function displayChar (event) {
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            charCode = (event.which) ? event.which : event.keyCode,
            letter = null;

        if (charCode >= 65 && charCode <= 90) {
            letter = alphabet.charAt(charCode - 65);
        } else if (typeof charCodes[charCode] === 'string') {
            letter = charCodes[charCode];
        } else {
            letter = charCode;
        }
        return letter;
    }

    function showWord () {
        wordDOM
            .html(word.join(''))
            .fadeIn({
                queue: false
            });
    }
            
    function checkWord () {
        var _word = word.join('');
        if (typeof dictionary[_word] === 'function') {
            dictionary[_word]();
        } else {
            _word = _word.substr(0, _word.length - 1);
            if (typeof dictionary[_word] === 'function') {
                dictionary[_word]();
            }
        }
    }
            
    function forgetWord () {
        word = [];
        wordDOM.fadeOut({
            queue: false,
            complete: function () {
                wordDOM.html('');
            }
        });
    }
            
    function addLetter (event) {
        var letter = displayChar(event),
            localMemory = memorySize;

        // Tecla de borrado
        if (letter === 8) {
            word.pop();
        
        // Intro
        } else if (letter === 13) {
            localMemory = 0;
        
        // Nueva letra
        } else if (typeof letter === 'string') {
            word.push(letter);
        }

        if (word.length > 0) {
            showWord();
            clearTimeout(memory);
            memory = setTimeout(function () {
                checkWord();
                forgetWord();
            }, localMemory);
        }
    }

    $('body').append(wordDOM);
    $(window).on('keydown', addLetter);
}());
