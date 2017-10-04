(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('timezone', timezone);

    function timezone() {
        return timezone;

        ////////////////

        function timezone(Params) {
            Params = moment().tz(Params).format('z');
            return Params;
        }
    }
})();