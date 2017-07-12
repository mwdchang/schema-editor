/**
 * See: https://github.com/moszeed/es6-promise-debounce/blob/master/src/es6-promise-debounce.js
 */
function debounce(func, wait, immediate) {

    var timeout;
    return function() {

        var context = this, args = arguments;

        return new Promise(function(resolve) {
            var later = function() {
                timeout = null;
                if (!immediate) resolve(func.apply(context, args));
            };

            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);

            if (callNow) resolve(func.apply(context, args));
        });
    };
};
