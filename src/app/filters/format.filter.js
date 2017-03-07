(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('format', formatFilter);

    function formatFilter() {
        // использование из js $filter('format')(obj,'{0} to {1}')
        // использование из шаблона {{ obj | value:'part3[0].name' }}

        return function (input) {
            var args = arguments;
            return input.replace(/\{(\d+)\}/g, function (match, capture) {
                return args[1 * capture + 1];
            });
        };
    }
})();