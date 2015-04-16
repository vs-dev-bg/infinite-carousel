/**
 *Created by Victor Simeonov on 15-4-6.
 */
(function () {
    "use strict";

    var menu = document.getElementsByClassName('menu')[0],
        form = document.getElementsByTagName('form')[0],
        carousel = document.getElementById('carousel'),
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
        tabs, active, backDirection;

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
        tabs = document.querySelectorAll('#carousel > li');

        if (backDirection && tabs.length === 2) {
            active.className = cssClass.prev;
        }
        menu.addEventListener('click', animationHandler, false);
    }

    function animate(direction) {
        var next, prev, next2;
        backDirection = direction === directions.back;
        active = document.getElementsByClassName(cssClass.active)[0];
        tabs = document.querySelectorAll('#carousel > li');

        menu.removeEventListener('click', animationHandler, false);
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

    function rearrangeList(len) {
        var i, li;
        tabs = document.querySelectorAll('#carousel > li');

        if (tabs.length > len) {
            for (i = 0; i < (tabs.length - len); i++) {
                carousel.removeChild(tabs[tabs.length - (i+1)]);
            }
        } else if (tabs.length < len) {
            for (i = 0; i < (len - tabs.length); i++) {
                li = document.createElement("li");
                if (i === 0 && tabs.length <= 2) {
                   li.className = 'next';
                }
                carousel.appendChild(li);
            }
        }
    }

    function animationHandler(event) {
        var radios = document.getElementsByName('list');
        for (var i = 0; i< radios.length;  i++){
            if (!radios[i].checked) {
                radios[i].disabled = true;
            }
        }

        if (event.target.id === directions.forward) {
            animate(directions.forward);
        } else if (event.target.id === directions.back) {
            animate(directions.back);
        }
    }
    function radioHandler(e) {
        var value = parseInt(e.target.value);

        if (value) {
            switch (value) {
                case 2:
                    rearrangeList(value);
                    break;
                case 3:
                    rearrangeList(value);
                    break;
                case 4:
                    rearrangeList(value);
                    break;
                case 5:
                    rearrangeList(value);
                    break;
                case 6:
                    rearrangeList(value);
                    break;
            }
        }
    }

    menu.addEventListener('click', animationHandler, false);
    form.addEventListener('click', radioHandler, false);
})();