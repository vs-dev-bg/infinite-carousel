/**
 *Created by Victor Simeonov on 15-4-6.
 */
(function () {
    "use strict";

    var menu = document.getElementsByClassName('menu')[0],
        tabs = document.querySelectorAll('#carousel > li'),
        cssClass = {
            none: '',
            next: 'next',
            prev: 'prev',
            active: 'active',
            trans: ' trans'
        },
        directions = {
            forward: 'next',
            back: 'previous'
        },
        active, backDirection;

    function prefixedEvent(element, type, callback) {
        var pfx = ["webkit", "moz", "MS", "o", ""];

        for (var p = 0; p < pfx.length; p++) {
            if (!pfx[p]) {
                type = type.toLowerCase();
            }
            element.addEventListener(pfx[p] + type, callback, false);
        }
    }

    function animEnd() {
        if (backDirection && tabs.length === 2) {
            active.className = cssClass.prev;
        }
        menu.addEventListener('click', actionHandler, false);
    }

    function animate(direction) {
        var next, prev, next2;
        backDirection = direction === directions.back;
        active = document.getElementsByClassName(cssClass.active)[0];

        menu.removeEventListener('click', actionHandler, false);
        prefixedEvent(document, "transitionend", animEnd);

        if (tabs.length == 2) {
            next = active.nextElementSibling || active.previousElementSibling;

            if (backDirection) {
                next.className = cssClass.active + cssClass.trans;
                active.className = cssClass.next;
            } else {
                next.className = cssClass.next;
                active.className = cssClass.prev + cssClass.trans;
                next.className = cssClass.active
            }
        } else {
            next = active.nextElementSibling || document.getElementsByClassName(cssClass.next)[0];
            prev = active.previousElementSibling || document.getElementsByClassName(cssClass.prev)[0];

            if (backDirection) {
                active.className = cssClass.next;
                prev.className = cssClass.active + cssClass.trans;
            } else {
                active.className = cssClass.prev + cssClass.trans;
                next.className = cssClass.active;
            }
            if (tabs.length > 3) {
                if (backDirection) {
                    next2 = prev.previousElementSibling || tabs[tabs.length - 1];
                    next2.className = cssClass.prev;
                    next.className = cssClass.none;
                } else {
                    next2 = next.nextElementSibling || tabs[0];
                    next2.className = cssClass.next;
                    prev.className = cssClass.none;
                }
            } else {
                if (backDirection) {
                    next.className = cssClass.prev
                } else {
                    prev.className = cssClass.next;
                }
            }
        }
    }

    function actionHandler(event) {
        if (event.target.id === directions.forward) {
            animate(directions.forward);
        } else if (event.target.id === directions.back) {
            animate(directions.back);
        }
    }

    menu.addEventListener('click', actionHandler, false);
})();